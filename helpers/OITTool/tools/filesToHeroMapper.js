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
const mapFilesToHeroes = (args, internal) => {
  return new Promise((resolve, reject) => {
    if (!args.length) return reject("You need to specify a folder to move files into! icons, sprays, emotes, etc...")
    var type = args[0]
    var dir = args[1]

    if (!dir || !dir.length || dir.length < 3) dir = './'
    dir = dir.endsWith('/') ? dir : `${dir}/`

    if (!validTypes.includes(type)) return reject("Invalid folder specified, valid folders are " + validTypes.join('|'))

    getDirectories(dir).then(files => {
      files = files.filter(f => f.match(/^[\w-.]+\.(webm|jpg|png|dds|ogg)+$/))
      if (!files || !files.length) {
        console.warn("Found no valid files to move")
        return resolve()
      }
      Promise.all(files.map(file => {
        return new Promise(r => {
          var hero = file.split('-')[0]
          hero = (hero == 'soldier' ? 'soldier-76' : hero)
          hero = Object.keys(HERODATA).includes(hero) ? hero : internal ? weirdHeroes[hero] : 'all'
          type = type == 'none' ? '' : `/${type}`
          checkDirectorys(hero, type, dir).then(() => {
            fs.rename(`${dir}${file}`, `${dir}${hero}${type}/${file}`, r)
          }).catch(reject)
        })
      })).then(resolve)
    }).catch(reject)
  })
}

module.exports = { mapFilesToHeroes }