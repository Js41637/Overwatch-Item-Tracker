// sprayMover.js
// After converting .dds sprays into PNGs into ./!convertedSprays it will move all sprays
// into a ./sprays folder for each hero which can then be copyed into the tracker images
const fs = require('fs')

var type = 'skins'

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
  files = files.map(f => !f.startsWith('!') && f.endsWith('.jpg') ? f : null).filter(Boolean)
  files.forEach(file => {
    var hero = file.split('-')[0]
    hero = (hero == 'soldier' ? 'soldier-76' : hero)
    checkDirectorys(hero).then(() => {
      fs.rename(`./${file}`, `./${hero}/${type}/${file}`)
    })
  })
})
