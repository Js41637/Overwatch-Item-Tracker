const fs = require('fs')
const HERODATA = require('../../dataMapper/HERODATA.js')
const { checkDirectorys, getDirectories } = require('./utils')

const validTypes = ['emotes', 'intros', 'icons', 'poses', 'sprays', 'skins', 'skinsEpic', 'skinsLegendary']
const mapFilesToHeroes = args => {
  if (!args.length) {
    console.error("You need to specify a folder to move files into! icons, sprays, emotes, etc...")
    process.exit()
  }
  var type = args[0]
  if (!validTypes.includes(type)) {
    console.error("Invalid folder specified, valid folders are " + validTypes.join('|'))
    process.exit()
  }

  getDirectories('./').then(files => {
    files = files.filter(f => f.match(/^[\w-]+\.(webm|jpg|png|dds)+$/))
    if (!files || !files.length) {
      console.error("Found no valid files")
      process.exit()
    }
    files.forEach(file => {
      var hero = file.split('-')[0]
      hero = (hero == 'soldier' ? 'soldier-76' : hero)
      hero = Object.keys(HERODATA).includes(hero) ? hero : 'all'
      checkDirectorys(hero, type).then(() => {
        fs.renameSync(`./${file}`, `./${hero}/${type}/${file}`)
      })
    })
  }).catch(console.warn)
}

module.exports = { mapFilesToHeroes }