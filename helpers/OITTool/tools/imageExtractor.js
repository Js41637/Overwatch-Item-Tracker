const fs = require('fs')
const { getDirectories, getCleanID, cleanFileIDs, handleErr } = require('./utils')
const { mapFilesToHeroes } = require('./filesToHeroMapper')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

var TYPES = {
  Portrait: 'icons',
  Icon: 'icons',
  Spray: 'sprays'
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
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

async function findImages(hero) {
  const base = hero.length ? 'Heroes/' : 'General'
  const heroID = getCleanID(hero)

  const types = await getDirectories(`./${base}${hero}`)
  if (!types.includes('Spray') && !types.includes('Icon')) {
    return
  }

  for (const type of types) {
    if (type !== 'Spray' && type !== 'Icon') {
      continue
    }

    await moveImages(hero, type, heroID)
  }
}

const _moveImages = (files, heroId, type, where) => {
  return new Promise(res => {
    files = cleanFileIDs(files, heroId)
    let total = 0
    files.forEach(file => {
      if (fs.statSync(`${where}/${file.name}`).isDirectory()) {
        return
      }

      total++
      fs.createReadStream(`${where}/${file.name}`).pipe(fs.createWriteStream(`./!toBeConverted/${type}/${file.cleanName}.TIF`))
    })
    setTimeout(() => {
      res(total)
    }, 1000)
  })
}

const moveImages = (heroDir, type, heroID) => {
  return new Promise((resolve, reject) => {
    const base = heroDir ? `Heroes/${heroDir}` : 'General'
    const isGeneral = base === 'General'

    return getDirectories(`./${base}/${type}`).then(events => {
      var totalFiles = 0
      return Promise.all(events.map(event => {
        return getDirectories(`./${base}/${type}/${event}`).then(typesOrFiles => {
          if (isGeneral) {
            return _moveImages(typesOrFiles, heroID,  type, `./${base}/${type}/${event}`).then(total => {
              totalFiles += total
            })
          }

          return Promise.all(typesOrFiles.map(otherType => {
            return getDirectories(`./${base}/${type}/${event}/${otherType}`).then(files => {
              return _moveImages(files, heroID,  type, `./${base}/${type}/${event}/${otherType}`).then(total => {
                totalFiles += total
              })
            })
          }))
        })
      })).then(() => {
        console.log(`[Hero] ${heroID || 'General'} - Got ${totalFiles} ${type} files`)
        resolve()
      })
    }).catch(reject)
  })
}

const convertFiles = async () => {
  console.log("Preparing to convert files")
  const types = await getDirectories('./!toBeConverted')

  for (const type of types) {
    console.log(`Starting to convert ${TYPES[type]}`)
    console.log(`-- Converting images to png`)


    await convertImages(type)
    console.log("-- Optimising images with pngquant")
    await optimiseImages()


    console.log("-- Moving files to their hero dirs")
    await mapFilesToHeroes([TYPES[type], './images/'])
    console.log("-- Finished moving files")
  }

  console.log("Finished converting all images")
}

async function convertImages(type) {
  const { stderr } = await exec(`mogrify -path ./images -format png ./!toBeConverted/${type}/*.TIF`)
  if (stderr) {
    throw new Error(`Error while mogrify'ing images! \n ${stderr}`)
  }

  await delay(1200)
}


async function optimiseImages() {
  const { stderr } = await exec(`pngquant ./images/*.png --ext=.png --speed 1 --force --strip`)
  if (stderr) {
    throw new Error(`Error while pngquant'ing images! \n ${stderr}`)
  }

  await delay(4000)
}

async function extractImages(skipExtract) {
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

  const heroDirs = await getDirectories('./Heroes')
  await Promise.all([ ...heroDirs, ''].map(async hero => {
    await findImages(hero)
  }))

  await delay(500)
  console.log("Finished moving sprays and icons, starting conversion")
  await convertFiles()
}

module.exports = { extractImages }
