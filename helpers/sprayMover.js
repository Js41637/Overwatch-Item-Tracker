const fs = require('fs')

const checkDirectorys = who => {
  return new Promise(resolve => {
    fs.stat(`./${who}`, err => {
      if (err) {
        fs.mkdir(`./${who}`, () => {
          fs.mkdir(`./${who}/sprays`, resolve)
        })
      } else resolve()
    })
  })
}

fs.readdir('./', (err, files) => {
  files = files.map(f => !f.startsWith('!') && f.endsWith('.png') ? f : null).filter(Boolean)
  files.forEach(file => {
    var hero = file.split('-')[0]
    checkDirectorys(hero).then(() => {
      fs.rename(`./${file}`, `./${hero}/sprays/${file}`)
    })
  })
})
