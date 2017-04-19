const fs = require('fs')
const { getDirectories, getCleanID, cleanFileIDs, handleErr } = require('./utils')
const { mapFilesToHeroes } = require('./filesToHeroMapper')
const { eachLimit } = require('async')
const { exec } = require('child_process')

var TYPES = {
  Icon: 'icons',
  Spray: 'sprays'
}

const checkDirs = () => {
  fs.stat(`./!toBeConverted`, err => {
    if (err) {
      fs.mkdirSync(`./!toBeConverted`)
      fs.mkdirSync(`./!toBeConverted/Icon`)
      fs.mkdirSync(`./!toBeConverted/Spray`)
    }
  })
  fs.stat('./images', err => {
    if (err) fs.mkdirSync(`./images`)
  })
}

const findImages = hero => {
  return new Promise(resolve => {
    const base = hero.length ? 'Heroes/' : 'General'
    const heroID = getCleanID(hero)
    getDirectories(`./${base}${hero}`).then(types => {
      if (!types.includes('Icon') && !types.includes('Spray')) return resolve()
      Promise.all(types.map(type => {
        return new Promise(res => {
          if (type !== 'Icon' & type !== 'Spray') return res()
          moveImages(hero, type, heroID).then(res)
        })
      })).then(resolve)
    })
  })
}

// General images structure is different to heroes so it has it's own function
const moveGeneralImages = type => {
  return new Promise((resolve, reject) => {
    getDirectories(`./General/${type}`).then(files => {
      console.log("[General] Got", files.length, type, "files")
      files = cleanFileIDs(files)
      files.forEach(file => {
        fs.createReadStream(`./General/${type}/${file.name}`).pipe(fs.createWriteStream(`./!toBeConverted/${type}/${file.cleanName}.dds`));
      })
      setTimeout(() => {
        resolve()
      }, 1000)
    }).catch(reject)
  })
}

const moveImages = (heroDir, type, heroID) => {
  return new Promise((resolve, reject) => {
    if (!heroDir) {
      return moveGeneralImages(type).then(resolve, reject)
    }
    return getDirectories(`./Heroes/${heroDir}/${type}`).then(events => {
      var totalFiles = 0
      Promise.all(events.map(event => {
        return new Promise(res => {
          getDirectories(`./Heroes/${heroDir}/${type}/${event}`).then(files => {
            files = cleanFileIDs(files, heroID)
            files.forEach(file => {
              totalFiles++
              fs.createReadStream(`./Heroes/${heroDir}/${type}/${event}/${file.name}`).pipe(fs.createWriteStream(`./!toBeConverted/${type}/${file.cleanName}.dds`));
            })
            setTimeout(() => {
              res()
            }, 1000)
          })
        })
      })).then(() => {
        console.log(`[Hero] ${heroID} - Got ${totalFiles} ${type} files`)
        resolve()
      })
    }).catch(reject)
  })
}

const convertFiles = () => {
  return new Promise((resolve, reject) => {
    console.log("Preparing to convert files")
    getDirectories('./!toBeConverted').then(types => {
      eachLimit(types, 1, (type, cb) => {
        console.log(`Starting to convert ${TYPES[type]}`)
        console.log(`-- Converting images to png`)
         // timeout prevents the first icon from being converted incorrectly for some reason
        setTimeout(() => {
          exec(`mogrify -path ./images -format png ./!toBeConverted/${type}/*.dds`, err => {
            if (err) return reject(`Error while mogrify'ing images! \n ${err}`)
            console.log("-- Optimising images with pngquant")
            exec(`pngquant ./images/*.png --ext=.png --speed 1 --force --strip`, err2 => {
              if (err2) return reject(`Error while pngquant'ing images! \n ${err2}`)
              // Need to set a timeout as this command seems to exit well before it is actually finished
              setTimeout(() => {
                console.log("-- Moving files to their hero dirs")
                mapFilesToHeroes([TYPES[type], './images/']).then(() => {
                  console.log("-- Finished moving files")
                  cb()
                })
              }, 4500)
            })
          })
        }, 1500)
      }, () => {
        console.log("Finished converting all images")
      })
    })
  })
}

const extractImages = (skipExtract) => {
  if (!process.cwd().match(/OverwatchAssets$/)) {
    console.error("Needs to be run in OverwatchAssets")
    process.exit()
  }

  skipExtract = (skipExtract[0] || '') == 'skip'

  console.log("Preparing to move all sprays and icons")
  checkDirs()
  if (skipExtract) {
    console.log("Skipping extraction, converting files")
    convertFiles().catch(handleErr)
    return
  }
  getDirectories('./Heroes').then(heroDirs => {
    Promise.all([ ...heroDirs, ''].map(hero => {
      return new Promise(resolve => findImages(hero).then(resolve))
    })).then(() => {
      console.log("Finished moving sprays and icons, starting conversion")
      convertFiles().catch(handleErr)
    })
  }).catch(console.error)
}

module.exports = { extractImages }