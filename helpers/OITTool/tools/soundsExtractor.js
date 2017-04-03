#! /usr/bin/env node
// soundTracker.js
// Generates a JSON file for every sound file extracted, when new sound files are added
// we'll be able to see wots wot
// Run this in the root Heroes dir
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const { exec } = require('child_process')

const { sortBy, last } = require('lodash')
const { eachLimit } = require('async')
const moment = require('moment')

const { getDirectories, getCleanID, copyFile, handleErr } = require('./utils')
const HERODATA = require('../../dataMapper/HERODATA.js')
const { mapFilesToHeroes } = require('./filesToHeroMapper')

var mappedSounds
try {
  mappedSounds = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/mappedSounds.json')))
} catch (e) {
  mappedSounds = null
}

const checksum = (str, algorithm, encoding) => {
  return crypto.createHash('sha1').update(str, 'utf8').digest(encoding || 'hex')
}

const getFileSize = WHEREISIT => {
  return checksum(fs.readFileSync(WHEREISIT))
}

const checkTempDir = () => {
  fs.stat(`./!soundTemp`, err => {
    if (err) {
      fs.mkdirSync(`./!soundTemp`)
    }
  })
}

const moveSoundFiles = soundsListOnly => {
  console.log("Mapping and moving sound files")
  var soundsList = {}, checksumCache = {}, totalFiles = 0, dupeFiles = 0;
  return new Promise(resolve => {
    getDirectories('./').then(heroes => {
      heroes = sortBy(heroes, [h => !Object.keys(HERODATA).includes(getCleanID(h))])
      // Go through every hero, 1 at a time to prevent node from dying
      eachLimit(heroes, 1, (hero, cb) => {
        var heroID = getCleanID(hero)
        soundsList[heroID] = []
        getDirectories(`./${hero}`).then(() => {
          getDirectories(`./${hero}/Sound Dump`).then(sounds => {
            Promise.all(sounds.filter(a => a.endsWith('.wem')).map(sound => {
              return new Promise(r => {
                totalFiles++;
                const checksum = getFileSize(`./${hero}/Sound Dump/${sound}`)
                var dupeFile = checksum in checksumCache
                soundsList[heroID].push(Object.assign({}, {
                  id: sound.replace('.wem', ''),
                  checksum: checksum
                }, dupeFile ? { dupe: true } : {}))
                checksumCache[checksum] = true
                if (dupeFile) {
                  dupeFiles++;
                  return r()
                }
                if (soundsListOnly) return r()
                copyFile(`./${hero}/Sound Dump/${sound}`, `./!soundTemp/${heroID}-${sound}`, r)
              })
            })).then(() => {
              console.log("- Found", sounds.length, "sounds for", hero)
              cb()
            })
          }).catch(err => console.error("- Error getting sounds for", hero, err))
        }).catch(err => console.error("- Error loading hero dir", hero, err))
      }, () => resolve({ soundsList, checksumCache, totalFiles, dupeFiles }))
    })
  })
}

const convertSoundFiles = () => {
  return new Promise((resolve, reject) => {
    console.log("Converting sound files to ogg")
    const buffer =  { maxBuffer: 1024 * 10000 }
    const base = path.join(__dirname, "../programs")

    const ww2ogg = `for /f "delims=" %f in ('dir /s/b/a-d "./!soundTemp\\*.wem"') do (${base}\\ww2ogg.exe --pcb ${base}\\packed_codebooks_aoTuV_603.bin "%f")`
    const revorb = `for /f "delims=" %f in ('dir /s/b/a-d "./!soundTemp\\*.ogg"') do (${base}\\revorb.exe "%f")`
    const del = `for /f "delims=" %f in ('dir /s/b/a-d "./!soundTemp\\*.wem"') do (del "%f")`

    exec(ww2ogg, buffer, (err, stdout, stderr) => {
      if (err)  return reject(`Error converting files to OGG \n ===START ERROR===\n${err}\n${stderr}\n===END ERROR===`)
      console.log("Running revorb on all converted ogg files")
      exec(revorb, buffer, err2 => {
        if (err2) return reject("Error running revorb")
        console.log("Deleting old .wem files")
        exec(del, buffer, err3 => {
          if (err3) return reject("Error deleting old .wem files")
          resolve()
        })
      })
    })
  })
}

const moveFilesToHeroes = () => {
  return mapFilesToHeroes(['none', './!soundTemp/'], true)
}

const extractSounds = args => {
  if (!process.cwd().match(/OverwatchAssets\\Heroes$/)) {
    console.error("Needs to be run in OverwatchAssets\Heroes")
    process.exit()
  }

  var soundsListOnly = args[0]
  const startTS = Date.now()

  checkTempDir()
  moveSoundFiles(soundsListOnly).then(({ soundsList, checksumCache, totalFiles, dupeFiles }) => { //eslint-disable-line
    console.log("Done generating and moving sound data")
    console.log("- Mapped", totalFiles, "sound files")
    console.log("- Detected", dupeFiles, "dupe files")
    fs.writeFileSync('./soundFiles.json', JSON.stringify(soundsList, null, 2))
    if (soundsListOnly) return

    convertSoundFiles().then(() => {
      mapFilesToHeroes(['none', './!soundTemp/'], true).then(() => {
        console.log("Finished doing sound stuff in", moment.duration(Date.now() - startTS).asMinutes(), "minutes")
      }).catch(handleErr)
    }).catch(handleErr)
  }).catch(handleErr)
}

const fetchVoicelines = () => {
  const cwd = process.cwd()
  const isAudio = cwd.match(/OverwatchAssets\\audio$/)
  if (!cwd.match(/OverwatchAssets$/) && !isAudio) {
    console.error("Needs to be run in OverwatchAssets or OverwatchAssets\audio")
    process.exit()
  }

  if (!mappedSounds) return console.error("Error, unable to find mappedSounds.json in OIT Data")

  const base = `./${isAudio ? '' : 'audio/'}`
  const mappedHeroes = Object.keys(mappedSounds)

  fs.stat(`${base}!voicelines`, err => {
    if (err) fs.mkdirSync(`${base}!voicelines`)
  })

  getDirectories(base).then(heroes => {
    Promise.all(heroes.filter(h => mappedHeroes.includes(h)).map(hero => {
      return new Promise(resolve => {
        const heroSounds = mappedSounds[hero]
        const soundIDs = Object.keys(heroSounds)
        getDirectories(`${base}${hero}`).then(sounds => {
          Promise.all(sounds.map(sound => {
            return new Promise(r => {
              const soundID = last(sound.split('-')).slice(0, -4)
              if (!soundIDs.includes(soundID)) return r()
              copyFile(`${base}${hero}/${sound}`, `${base}!voicelines/${heroSounds[soundID]}.ogg`, r)
            })
          })).then(resolve)
        }).catch(handleErr)
      })
    })).then(() => mapFilesToHeroes(['voicelines', `${base}!voicelines/`]).then(() => {
      console.log("Done")
    }))
  }).catch(handleErr)
}

module.exports = { extractSounds, fetchVoicelines }
