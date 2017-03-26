#! /usr/bin/env node
// cleanFileIDs.js
// Renames all files in a directory to their cleanIDs
// e.g. Some Weirdo's Name.webm > some-weirdos-name.webm
const fs = require('fs')

// Can't generate IDs off these names can we :)
const stupidNames = {
  "^_^": "joy",
  "____": "frustration"
}

var getCleanID = what => {
  what = stupidNames[what] || what
  return what.toLowerCase().replace('é', 'e').replace(/[åäà]/g, 'a').replace(/[öô]/g, 'o').replace('ú', 'u').replace('çã', 'ca').replace(/[^a-zA-Z 0-9]/g, '').trim().replace(/ /g, '-').slice(0, -3)
}

var itemIDCache = {}

function resolveItemIDClash(id) {
  var lastCharacter = id.slice(-1)
  return id + ((parseInt(lastCharacter) || 0) + 1)
}

fs.readdir('./', (err, files = []) => {
  files = files.filter(f => f.match(/.+(png|dds|jpg|mp4|webm)$/))
  if (!files.length) {
    console.error("Found no valid files")
    process.exit()
  }
  files.forEach(file => {
    var extension = file.slice(-3)
    var id = getCleanID(file)
    if (itemIDCache[id]) {
      id = resolveItemIDClash(id)
    }
    fs.renameSync(`./${file}`, `./${id}.${extension}`)
  })
})
