#! /usr/bin/env node
// soundTracker.js
// Generates a JSON file for every sound file extracted, when new sound files are added
// we'll be able to see wots wot
// Run this in the root Heroes dir
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const { exec } = require('child_process')

const { sortBy, forEach, flattenDeep } = require('lodash')
const { eachLimit } = require('async')
const moment = require('moment')

const { getDirectories, getCleanID, copyFile, handleErr } = require('./utils')
const HERODATA = require('../../dataMapper/HERODATA.js')
const { mapFilesToHeroes } = require('./filesToHeroMapper')

var timestamp = Date.now().toString()
var existingSounds;
var existingSoundIDs = {}

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

const moveSoundFiles = (soundsListOnly, extractAll) => {
  console.log("Mapping and moving sound files")
  var soundsList = {}, checksumCache = {}, totalFiles = 0, dupeFiles = 0, totalNewFiles = 0;
  return new Promise(resolve => {
    return getDirectories('./').then(heroes => {
      heroes = sortBy(heroes, [h => !Object.keys(HERODATA).includes(getCleanID(h))])
      // Go through every hero, 1 at a time to prevent node from dying
      eachLimit(heroes, 1, (hero, cb) => {
        var heroID = getCleanID(hero)
        soundsList[heroID] = []
        var newFiles = 0
        return getDirectories(`./${hero}`).then(() => {
          return getDirectories(`./${hero}/Sound Dump`).then(dirs => {
            return Promise.all(dirs.map(dir => {
              return getDirectories(`./${hero}/Sound Dump/${dir}`).then(sounds => {
                return Promise.all(sounds.filter(a => a.endsWith('.wem')).map(sound => {
                  return new Promise(r => {
                    totalFiles++;
                    const checksum = getFileSize(`./${hero}/Sound Dump/${dir}/${sound}`)
                    const dupeFile = checksum in checksumCache ? { dupe: true } : undefined
                    const id = sound.replace('.wem', '')
                    const oldSoundTS = (existingSoundIDs[id] && existingSoundIDs[id].length) ? { ts: existingSoundIDs[id] } : undefined
                    const isNew = !existingSoundIDs[id] ? { ts: timestamp } : undefined
                    soundsList[heroID].push(Object.assign({}, {
                      id: id,
                      checksum: checksum
                    }, dupeFile, isNew, oldSoundTS))
                    checksumCache[checksum] = true
                    if (dupeFile) {
                      dupeFiles++;
                      return r()
                    }
                    if (isNew) newFiles++
                    if (soundsListOnly || (!isNew && !extractAll)) return r()
                    copyFile(`./${hero}/Sound Dump/${dir}/${sound}`, `./!soundTemp/${heroID}-${sound}`, r)
                  })
                }))
              })
            })).then(sounds => {
              console.log("- Found", flattenDeep(sounds).length, "sounds for", hero)
              if (newFiles) {
                console.log("-- Found", newFiles, "new sounds for", hero)
                totalNewFiles += newFiles
              }
              cb()
            })
          }).catch(err => console.error("- Error getting sounds for", hero, err))
        }).catch(err => console.error("- Error loading hero dir", hero, err))
      }, () => resolve({ soundsList, checksumCache, totalFiles, dupeFiles, totalNewFiles }))
    })
  })
}

const convertSoundFiles = dir => {
  return new Promise((resolve, reject) => {
    console.log("Converting sound files to ogg")
    const buffer =  { maxBuffer: 1024 * 20000 } // shit gets large
    const base = path.join(__dirname, "../programs")

    const ww2ogg = `for /f "delims=" %f in ('dir /s/b/a-d "./${dir}\\*.wem"') do (${base}\\ww2ogg.exe --pcb ${base}\\packed_codebooks_aoTuV_603.bin "%f")`
    const revorb = `for /f "delims=" %f in ('dir /s/b/a-d "./${dir}\\*.ogg"') do (${base}\\revorb.exe "%f")`
    const del = `for /f "delims=" %f in ('dir /s/b/a-d "./${dir}\\*.wem"') do (del "%f")`

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

const saveSoundList = soundList => {
  forEach(soundList, (sounds, hero) => {
    soundList[hero] = sortBy(sounds, ['ts', 'id'])
  })
  fs.writeFileSync('./soundFiles.json', JSON.stringify(soundList, null, 2))
}

const extractSounds = args => {
  if (args[0] == 'ignore') {
    convertSoundFiles('')
    return
  }
  if (!process.cwd().match(/OverwatchAssets\\Heroes$/)) {
    console.error("Needs to be run in OverwatchAssets\Heroes")
    process.exit()
  }

  try {
    existingSounds = JSON.parse(fs.readFileSync('./soundFiles.json', 'utf8'))
  } catch(e) {
    console.warn("Couldn't find existing sounds file?")
  }

  if (existingSounds) {
    forEach(existingSounds, sounds => forEach(sounds, sound => existingSoundIDs[sound.id] = sound.ts || true))
  }

  var soundsListOnly = args[0] == 'list'
  var extractAll = args[0] == 'all'
  const startTS = Date.now()

  checkTempDir()
  moveSoundFiles(soundsListOnly, extractAll).then(({ soundsList, checksumCache, totalFiles, dupeFiles, totalNewFiles }) => { //eslint-disable-line
    console.log("Done generating and moving sound data")
    console.log("- Mapped", totalFiles, "sound files")
    console.log("- Detected", dupeFiles, "dupe files")
    console.log("- Detected", totalNewFiles, "new files")
    saveSoundList(soundsList)
    if (soundsListOnly) return

    convertSoundFiles('!soundTemp').then(() => {
      mapFilesToHeroes(['none', './!soundTemp/'], true).then(() => {
        console.log("Finished doing sound stuff in", moment.duration(Date.now() - startTS).asMinutes(), "minutes")
      }).catch(handleErr)
    }).catch(handleErr)
  }).catch(handleErr)
}

module.exports = { extractSounds }
