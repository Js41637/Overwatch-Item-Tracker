// sprayRenamer.js
// After extracting sprays from the game into ./OverwatchAssets
// run this script which move all sprays into ./converted sorted by hero and their cleanIDs
const fs = require('fs')

if (!process.cwd().match(/OverwatchAssets$/)) {
  console.error("Needs to be run in OverwatchAssets")
  process.exit()
}

// Can't generate IDs off these names can we :)
const stupidNames = {
  "^_^": "joy",
  "____": "frustration"
}

var getCleanID = what => {
  what = stupidNames[what] || what
  return what.toLowerCase().replace('é', 'e').replace(/[åäà]/g, 'a').replace(/[öô]/g, 'o').replace('ú', 'u').replace('çã', 'ca').replace(/[^a-zA-Z 0-9]/g, '').trim().replace(/ /g, '-').replace(/dds$/, '')
}

var getDirectories = where => {
  return new Promise((resolve, reject) => {
    fs.stat(where, err => {
      if (err) return reject(`${where} doesn't exist`)
      fs.readdir(where, (err, dirs) => {
        if (err) return reject("I dunno, no dirs??")
        return resolve(dirs.map(d => (d.startsWith('!') || d.endsWith('.js')) ? null : d).filter(Boolean))
      })
    })
  })
}

getDirectories('./').then(heroDirs => {
  heroDirs.forEach(heroDir => {
    const dirID = getCleanID(heroDir)
    fs.stat(`./converted/${dirID}`, err => err ? fs.mkdir(`./converted/${dirID}`, () => fs.stat(`./converted/${dirID}/Sprays`, err => err ? fs.mkdir(`./converted/${dirID}/Sprays`) : void 0)) : void 0)
    getDirectories(`./${heroDir}/Spray`).then(types => {
      Promise.all(types.map(t => getDirectories(`./${heroDir}/Spray/${t}`))).then(groups => {
        groups.forEach((sprays, i) => {
          sprays.forEach(s => fs.rename(`./${heroDir}/Spray/${types[i]}/${s}`, `./converted/${dirID}/Sprays/${dirID}-${getCleanID(s)}.dds`))
        })
      }).catch(console.error)
    }).catch(console.error)
  })
}).catch(console.error)

fs.stat(`./converted`, err => err ? fs.mkdir(`./converted`) : void 0)
