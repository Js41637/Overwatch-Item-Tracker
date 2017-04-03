const fs = require('fs')
const { getDirectories, cleanFileIDs, handleErr } = require('./utils')

var TYPES = {
  Icon: 'icons',
  Spray: 'sprays'
}

const mapAllClassData = () => {
  const cwd = process.cwd()
  const isGeneral = cwd.match(/OverwatchAssets\\General$/)
  if (!cwd.match(/OverwatchAssets$/) && !isGeneral) {
    console.error("Needs to be run in OverwatchAssets or OverwatchAssets\General")
    process.exit()
  }

  var data = {
    icons: [],
    sprays: []
  }

  const base = `./${isGeneral ? '' : 'General/'}`
  getDirectories(base).then(types => {
    Promise.all(types.map(type => {
      if (type !== 'Icon' && type !== 'Spray') return Promise.resolve()
      return getDirectories(`${base}${type}`).then(files => {
        files = cleanFileIDs(files)
        Promise.all(files.map(({ name, cleanName }) => {
          data[TYPES[type]].push({ name: name.slice(0, -4), id: cleanName })
          Promise.resolve()
        }))
      }).catch(handleErr)
    })).then(() => {
      fs.writeFileSync(`${base}allClassItems.json`, JSON.stringify(data, null, 2))
    })
  }).catch(handleErr)
}

module.exports = { mapAllClassData }
