const fs = require('fs')
const { getDirectories, getCleanID, cleanFileIDs } = require('./utils')

const moveSpraysOrIcons = what => {
  if (!process.cwd().match(/OverwatchAssets$/)) {
    console.error("Needs to be run in OverwatchAssets")
    process.exit()
  }
  
  const type = what == 'sprays' ? 'Spray' : what == 'icons' ? 'Icon' : undefined
  console.log(`Preparing to move ${type ? what : 'sprays and icons'}`)
  
  getDirectories('./Heroes').then(heroDirs => {
    console.log("Moving hero items")
    Promise.all(heroDirs.map(hero => {
      return new Promise(resolve => setupThings(hero, type, what).then(resolve))
    })).then(() => {
      console.log("Moving general items")
      return new Promise(resolve => setupThings(undefined, type, what).then(resolve))
    }).then(() => {
      console.log("Done?")
    })
  }).catch(console.error)

  fs.stat(`./!toBeConverted`, err => {
    if (err) {
      fs.mkdirSync(`./!toBeConverted`)
      fs.mkdirSync(`./!toBeConverted/Icon`)
      fs.mkdirSync(`./!toBeConverted/Spray`)
    }
  })
}

const setupThings = (hero = '', type, what) => {
  return new Promise(resolve => {
    const base = hero.length ? 'Heroes/' : 'General'
    const heroID = getCleanID(hero)
    if (what == 'both') {
      getDirectories(`./${base}${hero}`).then(types => {
        if (!types.includes('Icon') && !types.includes('Spray')) return resolve()
        Promise.all(types.map(t => {
          return new Promise(res => {
            if (t !== 'Icon' & t !== 'Spray') return res()
            moveThings(hero, t, heroID).then(res)
          })
        })).then(resolve)
      })
    } else {
      moveThings(hero, type, heroID).then(resolve)
    }
  })
}

const moveGeneralThings = type => {
  return new Promise(resolve => {
    getDirectories(`./General/${type}`).then(files => {
      console.log("[General] Got", files.length, type, "files")
      files = cleanFileIDs(files)
      files.forEach(file => {
        fs.createReadStream(`./General/${type}/${file.name}`).pipe(fs.createWriteStream(`./!toBeConverted/${type}/${file.cleanName}.dds`));
      })
      resolve()
    })
  })
}

const moveThings = (heroDir, type, heroID) => {
  return new Promise(resolve => {
    if (!heroDir) {
      return moveGeneralThings(type).then(resolve)
    }
    return getDirectories(`./Heroes/${heroDir}/${type}`).then(events => {
      Promise.all(events.map(event => {
        return new Promise(res => {
          getDirectories(`./Heroes/${heroDir}/${type}/${event}`).then(files => {
            files = cleanFileIDs(files, heroID)
            files.forEach(file => {
              fs.createReadStream(`./Heroes/${heroDir}/${type}/${event}/${file.name}`).pipe(fs.createWriteStream(`./!toBeConverted/${type}/${file.cleanName}.dds`));
            })
            res()
          })
        })
      })).then(resolve)
    }).catch(console.warn)
  })
}

module.exports = { moveSpraysOrIcons }