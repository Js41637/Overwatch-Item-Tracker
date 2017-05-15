#! /usr/bin/env node
// soundDumpParser.js

const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { sortBy, reduce, get, cloneDeep } = require('lodash')
const { eachLimit, eachOfLimit } = require('async')
const moment = require('moment')

const consoleColors = require('../../consoleColors')
consoleColors.load()
const { getDirectories, checkDirectorys, getCleanID, copyFile } = require('./utils')

console.info('Sound Dump Parser starting up')

var originalSoundIDs = {}
try {
  console.info('Found pre existing sound list')
  let original = JSON.parse(fs.readFileSync('./soundsList.json', 'utf8'))
  for (let hero in original) {
    originalSoundIDs[hero] = {}
    for (let type in original[hero]) {
      for (let sound of original[hero][type]) {
        if (!sound.ts) continue
        originalSoundIDs[hero][sound.id] = sound.ts
      }
    }
  }
} catch (e) {
  console.warn('No original sound list??')
  originalSoundIDs = undefined
}

const newTS = Date.now()
var masterSoundList = {}

// first list and cache is for heroes, second if for NPCs
const soundList = {}
const soundIDCache = {'all': {}}
const soundList2 = {}
const soundIDCache2 = {}

// Sort related NPCs into one category seeing as most have dupe sounds anyway
const groupedHeroes = {
  'friendly-bot': 'training-bot',
  'training-bot': 'training-bot',
  shocktire: 'halloween-bots',
  zombardier: 'halloween-bots',
  zomnic: 'halloween-bots',
  detonator: 'uprising-bots',
  eradicator: 'uprising-bots',
  nulltrooper: 'uprising-bots',
  slicer: 'uprising-bots'
}

function sortSounds() {
  const data = Object.assign({}, cloneDeep(soundList), cloneDeep(soundList2))
  return reduce(data, (res, sounds, hero) => {
    res[hero] = {}
    for (let type in sounds) {
      sounds[type] = sounds[type].map(s => {
        delete s.path
        delete s.isNew
        return s
      })
      res[hero][type] = sortBy(sounds[type], ['ts', 'id'])
    }
    return res
  }, {})
}

function getSkinID(skin, heroID) {
  if (skin === '_Base') return
  return getCleanID(skin, heroID)
}

// Second dump contains hero sounds (no skins) but includes npcs, we only want npcs
function parseSecondDump(update) {
  console.info('Parsing second dump')
  return new Promise(resolve => getDirectories('./').then(heroes => {
    eachLimit(heroes, 1, (hero, cb) => {
      const heroID = groupedHeroes[getCleanID(hero)]
      if (!heroID) return cb() // NPCs only
      soundList2[heroID] = { 'base': [] }
      soundIDCache2[heroID] = {}
      getDirectories(`./${hero}/Sound Dump`).then(folders => {
        console.info(`- Parsing sounds for ${hero}`)
        return Promise.all(folders.map(folder => getDirectories(`./${hero}/Sound Dump/${folder}`).then(sounds => {
          return Promise.all(sounds.filter(a => a.endsWith('.wem')).map(sound => new Promise(r => {
            const soundID = sound.slice(0, -4)
            if (soundID in soundIDCache['all']) { // Ignore sound if it's mapped to a hero
              return r()
            }
            if (soundID in soundIDCache2[heroID]) { // Ignore sound if it's already been mapped
              return r()
            }

            const isNew = !get(originalSoundIDs, [heroID, soundID])
            const ts = !isNew ? { ts: originalSoundIDs[heroID][soundID] } : update ? { ts: newTS } : void 0
            soundIDCache2[heroID][soundID] = true
            soundList2[heroID]['base'].push(Object.assign({
              id: soundID,
              path: `./${hero}/Sound Dump/${folder}/${sound}`
            }, ts))
            r()
          })))
        })))
      }).then(() => {
        cb()
      })
    }, resolve)
  }))
}

// First dump contains all heroes sounds and skin sounds
function parseFullDump(update) {
  console.info('Parsing full dump')
  return new Promise(resolve => getDirectories('./').then(heroes => {
    eachLimit(heroes, 1, (hero, cb) => {
      const heroID = getCleanID(hero)
      var newFiles = 0
      var totalFiles = 0
      getDirectories(`./${hero}/Sound Dump Full`, true).then(skins => {
        if (!skins.length) return
        soundList[heroID] = { base: [], misc: [] }
        soundIDCache[heroID] = {} 
        return Promise.all(skins.map(skin => getDirectories(`./${hero}/Sound Dump Full/${skin}`).then(folders => {
          const skinID = getSkinID(skin, heroID)
          return Promise.all(folders.map(folder => getDirectories(`./${hero}/Sound Dump Full/${skin}/${folder}`).then(sounds => {
            return Promise.all(sounds.filter(a => a.endsWith('.wem')).map(sound => new Promise(r => {
              const soundID = sound.slice(0, -4)
              totalFiles++
               // Heroes shouldn't have dupe sounds anyway
              if (soundID in soundIDCache[heroID]) return r()
              const isNew = !get(originalSoundIDs, [heroID, soundID])
              const ts = !isNew ? { ts: originalSoundIDs[heroID][soundID] } : update ? { ts: newTS } : void 0
              const isMisc = soundID.match(/^0{7}[4|6]/)
              
              if (isNew) newFiles++
              soundIDCache[heroID][soundID] = true
              soundIDCache['all'][soundID] = true
              soundList[heroID][isMisc ? 'misc' : 'base'].push(Object.assign({
                isNew,
                id: soundID,
                path: `./${hero}/Sound Dump Full/${skin}/${folder}/${sound}`
              }, ts, skinID ? { skin: skinID } : void 0))
              r()
            })))
          })))
        })))
      }).then(() => {
        if (totalFiles) console.info(`-- [${heroID}] Found ${totalFiles} files`, (newFiles ? ` | Found ${newFiles} new files` : ''))
        cb()
      })
    }, resolve)
  }))
}

function checkTempDir() {
  return new Promise(resolve => {
    fs.stat(`./!soundTemp`, err => {
      if (err) {
        fs.mkdirSync(`./!soundTemp`)
      }
      resolve()
    })
  })
}

function moveFilesToTempDir(update) {
  return new Promise(resolve => {
    const sounds = Object.assign({}, soundList, soundList2)
    eachOfLimit(sounds, 1, (sounds, hero, cb) => {
      Promise.all(Object.keys(sounds).map(type => {
        return Promise.all(sounds[type].map(sound => new Promise(r => {
          if (update && !sound.isNew) return r()
          checkDirectorys('!soundTemp', hero).then(() => {
            copyFile(sound.path, `./!soundTemp/${hero}/${hero}-${sound.id}.wem`, r)
          })
        })))
      })).then(() => cb())
    }, () => resolve())
  })
}

function convertFiles() {
  return new Promise((resolve, reject) => {
    console.info("Converting sound files to ogg")
    const buffer =  { maxBuffer: 1024 * 20000 } // shit gets large
    const base = path.join(__dirname, "../programs")

    const ww2ogg = `for /f "delims=" %f in ('dir /s/b/a-d "./!soundTemp\\*.wem" "./!soundTemp\\*.0B2" "./!soundTemp\\*.03F"') do (${base}\\ww2ogg.exe --pcb ${base}\\packed_codebooks_aoTuV_603.bin "%f")`
    const revorb = `for /f "delims=" %f in ('dir /s/b/a-d "./!soundTemp\\*.ogg"') do (${base}\\revorb.exe "%f")`
    const del = `for /f "delims=" %f in ('dir /s/b/a-d "./!soundTemp\\*.wem" "./!soundTemp\\*.0B2" "./!soundTemp\\*.03F"') do (del "%f")`

    exec(ww2ogg, buffer, (err, stdout, stderr) => {
      if (err)  return reject(`Error converting files to OGG \n ===START ERROR===\n${err}\n${stderr}\n===END ERROR===`)
      console.info("Running revorb on all converted ogg files")
      exec(revorb, buffer, err2 => {
        if (err2) return reject("Error running revorb")
        console.info("Deleting old .wem files")
        exec(del, buffer, err3 => {
          if (err3) return reject("Error deleting old .wem files")
          resolve()
        })
      })
    })
  })
}


async function parseSoundDump(args) {
  if (!process.cwd().match(/OverwatchAssets\\SoundDump$/)) {
    console.error("Needs to be run in OverwatchAssets\SoundDump")
    process.exit()
  }

  const startTS = Date.now()

  const listOnly = args[0] == 'list'
  const fetchNew = args[0] == 'update' || args[1] == 'update'

  await parseFullDump(fetchNew)
  await parseSecondDump(fetchNew)

  console.info('Finished parsing sounds')
  masterSoundList = sortSounds()
  fs.writeFileSync('./soundsList.json', JSON.stringify(masterSoundList, null, 2))

  if (listOnly) {
    console.info('Done, not converting sounds')
    return
  }

  console.info('Preparing to move and convert sounds')
  await checkTempDir()
  await moveFilesToTempDir(fetchNew)
  console.info('Moved files, converting')
  await convertFiles()
  console.info('Converted all files!')
  console.info(`Finished processing in ${moment.duration(Date.now() - startTS).asMinutes().toFixed(2)} minutes`)
}

module.exports = { parseSoundDump }