#! /usr/bin/env node
// soundTracker.js
// Generates a JSON file for every sound file extracted, when new sound files are added
// we'll be able to see wots wot
// Run this in the root Heroes dir
const fs = require('fs')
const crypto = require('crypto')
if (!process.cwd().match(/OverwatchAssets\\Heroes$/)) {
  console.error("Needs to be run in OverwatchAssets/Heroes")
  process.exit()
}

const getDirectories = where => {
  return new Promise((resolve, reject) => {
    fs.stat(where, err => {
      if (err) return reject(`${where} doesn't exist`)
      fs.readdir(where, (err, dirs) => {
        if (err) return reject("I dunno, no dirs??")
        return resolve(dirs.map(d => (d.startsWith('!') || d.endsWith('.js') || d.endsWith('.json')) ? null : d).filter(Boolean))
      })
    })
  })
}

const checksum = (str, algorithm, encoding) => {
  return crypto.createHash('sha1').update(str, 'utf8').digest(encoding || 'hex')
}

const getFileSize = WHEREISIT => {
  return checksum(fs.readFileSync(WHEREISIT))
}

var soundsList = {}
var checksumCache = {}
var totalFiles = 0
var dupeFiles = 0

const makeTheThingy = () => {
  return new Promise((resolve) => {
    getDirectories('./').then(heroes => {
      Promise.all(heroes.map(hero => {
        return new Promise((r, rj) => {
         soundsList[hero] = []
          getDirectories(`./${hero}`).then(() => {
            getDirectories(`./${hero}/Sound Dump`).then(sounds => {
              sounds.forEach(sound => {
                totalFiles++;
                const checksum = getFileSize(`./${hero}/Sound Dump/${sound}`)
                var dupeFile = checksum in checksumCache
                soundsList[hero].push(Object.assign({}, {
                  id: sound,
                  checksum: checksum
                }, dupeFile ? { dupe: true } : {}))
                checksumCache[checksum] = true
                if (dupeFile) dupeFiles++;
              })
              console.log("Found", sounds.length, "for", hero)
              r()
            }).catch(err => {
              console.error("Error getting sounds for", hero, err)
            })
          }).catch(err => {
            console.error("Error loading hero dir", hero, err)
          })
        })

      })).then(() => {
        resolve()
      })
    })
  })
}

makeTheThingy().then(() => {
  console.log("DONE")
  console.log("Mapped", totalFiles, "sound files")
  console.log("Detected", dupeFiles, "dupe files")
  fs.writeFileSync(`./soundFiles.json`, JSON.stringify(soundsList, null, 2))
})

