const fs = require('fs')
const HERODATA = require('../../dataMapper/HERODATA.js')
const { checkDirectorys, getDirectories } = require('./utils')

const validTypes = ['emotes', 'intros', 'icons', 'poses', 'sprays', 'skins', 'skinsEpic', 'skinsLegendary', 'voice', 'none']
const weirdHeroes = {
  friendly: 'friendly-bot',
  shocktire: 'shocktire',
  training: 'training-bot',
  zombardier: 'zombardier',
  zomnic: 'zomnic'
  
}
const mapFilesToHeroes = (args, internal, cb) => {
  if (!args.length) {
    console.error("You need to specify a folder to move files into! icons, sprays, emotes, etc...")
    process.exit()
  }
  var type = args[0]
  var dir = args[1]
  if (!dir || !dir.length || dir.length < 3) dir = './'
  dir = dir.endsWith('/') ? dir : `${dir}/`
  if (!validTypes.includes(type)) {
    console.error("Invalid folder specified, valid folders are " + validTypes.join('|'))
    process.exit()
  }

  getDirectories(dir).then(files => {
    files = files.filter(f => f.match(/^[\w-.]+\.(webm|jpg|png|dds|ogg)+$/))
    if (!files || !files.length) {
      console.error("Found no valid files")
      process.exit()
    }
    files.forEach(file => {
      var hero = file.split('-')[0]
      hero = (hero == 'soldier' ? 'soldier-76' : hero)
      hero = Object.keys(HERODATA).includes(hero) ? hero : internal ? weirdHeroes[hero] : 'all'
      type = type == 'none' ? '' : `/${type}`
      checkDirectorys(hero, type, dir).then(() => {
        fs.renameSync(`${dir}${file}`, `${dir}${hero}${type}/${file}`)
      })
    })
    if (cb) cb()
  }).catch(console.warn)
}

module.exports = { mapFilesToHeroes }