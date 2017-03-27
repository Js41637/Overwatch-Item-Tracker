const fs = require('fs')
const { getDirectories, getCleanID, cleanFileIDs } = require('./utils')

const moveSpraysOrIcons = what => {
  const cwd = process.cwd()
  const general = cwd.match(/OverwatchAssets\\General$/)
  if (!cwd.match(/OverwatchAssets\\Heroes$/) && !general) {
    console.error("Needs to be run in OverwatchAssets\Heroes or OverwatchAssets\General")
    process.exit()
  }
  
  var type = what == 'sprays' ? 'Spray' : what == 'icons' ? 'Icon' : undefined
  console.log(`Preparing to move ${type ? what : 'sprays and icons'}`)
  getDirectories('./').then(heroDirs => {
    if (general) {
      if (what == 'both') {
        heroDirs.map(t => {
          if (t !== 'Icon' & t !== 'Spray') return
          moveGeneralThings(t)
        })
      } else {
        moveGeneralThings(type)
      }
    } else {
      heroDirs.forEach(heroDir => {
        const heroID = getCleanID(heroDir)
        if (what == 'both') {
          getDirectories(`./${heroDir}`).then(types => {
            types.map(t => {
              if (t !== 'Icon' & t !== 'Spray') return
              moveThings(heroDir, t, heroID)
            })
          })
        } else {
          moveThings(heroDir, type, heroID)
        }
      })
    }
  }).catch(console.error)

  fs.stat(`../!toBeConverted`, err => {
    if (err) {
      fs.mkdirSync(`../!toBeConverted`)
      fs.mkdirSync(`../!toBeConverted/Icon`)
      fs.mkdirSync(`../!toBeConverted/Spray`)
    }
  })
}

const moveGeneralThings = type => {
  getDirectories(`./${type}`).then(files => {
    files = cleanFileIDs(files)
    files.forEach(file => {
      fs.createReadStream(`./${type}/${file.name}`).pipe(fs.createWriteStream(`../!toBeConverted/${type}/${file.cleanName}.dds`));
    })
  })
}

const moveThings = (heroDir, type, heroID) => {
  getDirectories(`./${heroDir}/${type}`).then(events => {
    events.map(event => {
      getDirectories(`./${heroDir}/${type}/${event}`).then(files => {
        files = cleanFileIDs(files, heroID)
        files.forEach(file => {
          fs.createReadStream(`./${heroDir}/${type}/${event}/${file.name}`).pipe(fs.createWriteStream(`../!toBeConverted/${type}/${file.cleanName}.dds`));
        })
      })
    })
  }).catch(console.warn)
}

module.exports = { moveSpraysOrIcons }