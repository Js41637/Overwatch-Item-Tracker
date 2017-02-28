const fs = require('fs')

var getCleanID = what => {
  return what.toLowerCase().replace('ö', 'o').replace('ú', 'u').replace(/[^a-zA-Z 0-9]/g, '').replace(/ /g, '-').replace(/dds$/, '')
}

var getDirectories = where => {
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

var TYPES = {
  Icon: 'icons',
  Spray: 'sprays'
}

var data = {
  icons: [],
  sprays: []
}

var itemIDCache = {
  icons: {},
  sprays: {}
}

function resolveItemIDClash(id) {
  var lastCharacter = id.slice(-1)
  return id + ((parseInt(lastCharacter) || 0) + 1)
}

getDirectories(`./`).then(types => {
  Promise.all(types.map(type => {
    if (type == 'Portrait') return Promise.resolve()
    return getDirectories(`./${type}`).then(files => {
      Promise.all(files.map(file => {
        var id = getCleanID(file)
        if (itemIDCache[TYPES[type]][id]) {
          id = resolveItemIDClash(id)
        }
        data[TYPES[type]].push({
          name: file.slice(0, -4),
          id: id
        })
        itemIDCache[TYPES[type]][id] = true
        Promise.resolve()
      }))
    })
  })).then(() => {
    fs.writeFileSync('./allClassItems.json', JSON.stringify(data, null, 2))
  })
})
