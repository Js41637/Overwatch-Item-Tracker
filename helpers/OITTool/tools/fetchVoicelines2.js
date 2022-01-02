const fs = require('fs')
const { getDirectories, checkDirectorys, getCleanHeroID, getCleanID } = require('./utils');

const BASE_DIR = 'Voiceline'

const fetchVoicelines2 = () => {
  if (!fs.existsSync('../voicelines')) {
    fs.mkdirSync(`../voicelines`);
  }

  if (!process.cwd().match(/OverwatchAssets\\Heroes$/)) {
    console.error("Needs to be run in OverwatchAssets\\Heroes");
    process.exit();
  }

  getDirectories('./').then(heroes => {
    return Promise.all(heroes.map(hero => {
      const heroId = getCleanHeroID(hero)

      if (!fs.existsSync(`./${hero}/${BASE_DIR}`)) {
        return Promise.resolve()
      }

      return getDirectories(`./${hero}/${BASE_DIR}`).then(events => {
        if (!events.length) return Promise.resolve()
        return Promise.all(events.map(event => {
          return getDirectories(`./${hero}/${BASE_DIR}/${event}`).then(types => {
            return Promise.all(types.map(type => {
              return getDirectories(`./${hero}/${BASE_DIR}/${event}/${type}`).then(soundDirs => {
                return Promise.all(soundDirs.map(soundDir => {
                  const fileId = getCleanID(soundDir, heroId)
                  return getDirectories(`./${hero}/${BASE_DIR}/${event}/${type}/${soundDir}`).then(sounds => {
                    if (!sounds.length) return Promise.resolve()
                    if (sounds.length > 1) {
                      console.warn('Warning!', fileId, 'has more than 1 sound!!')
                      return Promise.resolve()
                    }

                    return checkDirectorys(heroId, 'voicelines', '../voicelines/').then(() => {
                      fs.renameSync(`./${hero}/${BASE_DIR}/${event}/${type}/${soundDir}/${sounds[0]}`, `../voicelines/${heroId}/voicelines/${fileId}.ogg`)
                      return Promise.resolve()
                    })
                  })
                }))
              })
            }))
          })
        }))
      })
    }))
  })


}

module.exports = { fetchVoicelines2 }
