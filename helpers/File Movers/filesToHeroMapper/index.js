#! /usr/bin/env node
// filesToHeroMapper.js
// This requires all files to be appropriately named.
// Moves all files in a directory to their respective hero directory and subtype
// e.g. ana-candy.webm > ./Ana/emotes/ana-candy.webm
const fs = require('fs')

const types =  ['emotes', 'poses', 'intros', 'skins', 'sprays', 'icons']
const type = process.argv[2]
if (!types.includes(type)) {
  console.error("Invalid type, valid types are", types.join('|'))
  process.exit()
}

const checkDirectorys = who => {
  return new Promise(resolve => {
    fs.stat(`./${who}`, err => {
      if (err) {
        fs.mkdir(`./${who}`, () => {
          fs.mkdir(`./${who}/${type}`, resolve)
        })
      } else resolve()
    })
  })
}

fs.readdir('./', (err, files) => {
  files = files.filter(f => f.match(/^[\w-]+\.(webm|jpg|png)+$/))
  if (!files || !files.length) {
    console.error("Found no valid files")
    process.exit()
  }
  files.forEach(file => {
    var hero = file.split('-')[0]
    hero = (hero == 'soldier' ? 'soldier-76' : hero)
    checkDirectorys(hero).then(() => {
      fs.renameSync(`./${file}`, `./${hero}/${type}/${file}`)
    })
  })
})
