const fs = require('fs');
const path = require('path');
const { last } = require('lodash');
const { mapFilesToHeroes } = require('./filesToHeroMapper');
const { getDirectories, copyFile, handleErr } = require('./utils');

var mappedSounds;
try {
  mappedSounds = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/mappedVoicelines.json')));
} catch (e) {
  mappedSounds = null;
}

const fetchVoicelines = () => {
  if (!mappedSounds) return console.error("Error, unable to find mappedVoicelines.json in OIT Data");

  const base = './';
  const mappedHeroes = Object.keys(mappedSounds);

  fs.stat(`${base}!voicelines`, err => {
    if (err) fs.mkdirSync(`${base}!voicelines`);
  });

  getDirectories(base).then(heroes => {
    Promise.all(heroes.filter(h => mappedHeroes.includes(h)).map(hero => {
      return new Promise(resolve => {
        const heroSounds = mappedSounds[hero];
        const soundIDs = Object.keys(heroSounds);
        getDirectories(`${base}${hero}`).then(sounds => {
          Promise.all(sounds.map(sound => {
            return new Promise(r => {
              const soundID = last(sound.split('-')).slice(0, -4);
              if (!soundIDs.includes(soundID)) return r();
              copyFile(`${base}${hero}/${sound}`, `${base}!voicelines/${heroSounds[soundID]}.ogg`, r);
            });
          })).then(resolve);
        }).catch(handleErr);
      });
    })).then(() => mapFilesToHeroes(['voicelines', `${base}!voicelines/`]).then(() => {
      console.log("Done");
    }));
  }).catch(handleErr);
};

module.exports = { fetchVoicelines };