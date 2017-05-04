const fs = require('fs')
const _getCleanID = require('../../dataMapper/utils').getCleanID

const handleErr = err => console.log(`Error while doing stuff!!\n==ERROR==\n${err}\n==ENDERROR==`)

const getCleanID = (what, hero) => {
  if (!what.length) return undefined
  return _getCleanID(what.replace(/\.(png|dds|jpg)|$/, ''), hero)
}

const hardCodedIds = {
  "Cheers!.dds": "cheers",
  "Cheers.dds": "cheers1"
}

const badItems = {
  'law': 'dva-law',
  'oni': 'genji-oni'
}

const cleanFileIDs = (files, heroID) => {
  var itemIDCache = {}
  return files.map(file => {
    var id = getCleanID(file, heroID)
    if (itemIDCache[id]) {
      console.warn("ItemID collision found", id)
      id = `${id}1`
    }
    itemIDCache[id] = true
    // fml
    id = !heroID && badItems[id] ? badItems[id] : (!heroID && hardCodedIds[file]) ? hardCodedIds[file] : id
    return { name: file, cleanName: id}
  })
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

const checkDirectorys = (who, type, where = './') => {
  return new Promise(resolve => {
    fs.stat(`${where}${who}`, err => {
      if (err) {
        fs.mkdir(`${where}${who}`, () => {
          if (type && type !== '') fs.mkdir(`${where}${who}/${type}`, resolve)
          else resolve()
        })
      } else {
        fs.stat(`${where}${who}/${type}`, err => {
          if (err) {
            fs.mkdir(`${where}${who}/${type}`, resolve)
          } else resolve()
        })
      }
    })
  })
}

const copyFile = (source, target, cb) => {
  var cbCalled = false
  const rd = fs.createReadStream(source)
  rd.on("error", done)
  const wr = fs.createWriteStream(target);
  wr.on("error", done)
  wr.on("close", done);
  rd.pipe(wr)

  function done(err) {
    if (!cbCalled) {
      cb(err)
      cbCalled = true
    }
  }
}

module.exports = { getDirectories, getCleanID, checkDirectorys, cleanFileIDs, copyFile, handleErr }