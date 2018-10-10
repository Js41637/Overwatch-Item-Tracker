const fs = require('fs');
const HERODATA = require('../../dataMapper/HERODATA.js');
const { checkDirectorys, getDirectories, getCleanID } = require('./utils');

const validTypes = ['emotes', 'intros', 'icons', 'poses', 'sprays', 'skins', 'skinsEpic', 'skinsLegendary', 'voicelines', 'owlskins', 'none'];
const weirdHeroes = {
  halloween: 'halloween-bots',
  training: 'training-bot',
  uprising: 'uprising-bots'
};

const fileRx = /^[\w-.]+\.(webm|jpg|png|dds|ogg)+$/
const renameRx = /^[\w- .]+\.(webm|jpg|png|dds|ogg)+$/

const mapFilesToHeroes = (args, internal) => {
  return new Promise((resolve, reject) => {
    if (!args.length) return reject("You need to specify a folder to move files into! icons, sprays, emotes, etc...");
    var type = args[0];
    var dir = args[1];
    var rename = args[2]

    if (!dir || !dir.length || dir.length < 3) dir = './';
    dir = dir.endsWith('/') ? dir : `${dir}/`;

    if (!validTypes.includes(type)) return reject("Invalid folder specified, valid folders are " + validTypes.join('|'));

    type = (type == 'none' ? '' : `/${type}`);

    getDirectories(dir).then(files => {
      files = files.filter(f => f.match(rename ? renameRx : fileRx));
      if (!files || !files.length) {
        console.warn("Found no valid files to move");
        return resolve();
      }

      Promise.all(files.map(file => {
        return new Promise(r => {
          var hero = file.split('-')[0];
          hero = (hero == 'soldier' ? 'soldier-76' :  hero === 'wrecking' ? 'wrecking-ball' : hero);
          hero = Object.keys(HERODATA).includes(hero) ? hero : internal ? weirdHeroes[hero] : 'all';
          checkDirectorys(hero, type, dir).then(() => {
            let newFile = file

            if (rename) {
              let fileType = file.match(/\.(\w+)$/i)[1]
              newFile = `${getCleanID(newFile)}.${fileType}`
            }

            fs.rename(`${dir}${file}`, `${dir}${hero}${type}/${newFile}`, r);
          }).catch(reject);
        });
      })).then(resolve);
    }).catch(reject);
  });
};

module.exports = { mapFilesToHeroes };
