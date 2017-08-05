#! /usr/bin/env node
// soundDumpParser.js

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { orderBy, reduce, get, cloneDeep, keyBy, merge, flatten, uniq } = require('lodash');
const { eachLimit, eachOfLimit } = require('async');
const moment = require('moment');

const consoleColors = require('../../consoleColors');
consoleColors.load();
const { getDirectories, checkDirectorys, getCleanID, copyFile } = require('./utils');

console.info('Sound Dump Parser starting up');

const allOriginalIDs = {};
var originalSoundIDs = {};
var original = {};
try {
  console.info('Found pre existing sound list');
  original = JSON.parse(fs.readFileSync('./soundFiles.json', 'utf8'));
  for (let hero in original) {
    originalSoundIDs[hero] = {};
    for (let type in original[hero]) {
      for (let soundID in original[hero][type]) {
        let sound = original[hero][type][soundID];
        allOriginalIDs[sound.id] = true;
        if (!sound.ts) continue;
        originalSoundIDs[hero][sound.id] = sound.ts;
      }
    }
  }
} catch (e) {
  console.warn('No original sound list??');
  originalSoundIDs = undefined;
}

const newTS = Date.now();
var masterSoundList = {};

// first list and cache is for heroes, second if for NPCs
const soundList = { 'dupes': { base: {} } };
const soundIDCache = {'all': {}, 'dupes': {}};
const soundList2 = {};
const soundIDCache2 = {'all': {}};

// Sort related NPCs into one category seeing as most have dupe sounds anyway
const groupedHeroes = {
  'friendly-bot': 'training-bot',
  'training-bot': 'training-bot',
  shocktire: 'halloween-bots',
  zombardier: 'halloween-bots',
  zomnic: 'halloween-bots',
  detonator: 'uprising-bots',
  eradicator: 'uprising-bots',
  nulltrooper: 'uprising-bots',
  slicer: 'uprising-bots'
};

function sortSounds() {
  // Go through the all the new sounds detected and compare them with data in the previous sound list
  // Adds items to the `misssingSounds` array if a sound appears to be missing
  // Removes an `unused` param on the sound if it is no longer missing 
  const newSounds = Object.keys(soundIDCache['all']).concat(Object.keys(soundIDCache2['all']));
  const missingSounds = reduce(original, (result, data, hero) => {
    result[hero] = {};
    for (let type in data) {
      result[hero][type] = [];
      for (let soundID in data[type]) {
        let sound = data[type][soundID];
        if (sound.unused && newSounds.includes(soundID)) {
          delete original[hero][type][soundID].unused;
        }
        if (!newSounds.includes(soundID)) result[hero][type].push(soundID);
      }
    }

    return result;
  }, {});

  console.log("Missing sounds", missingSounds);

  // Merge the Hero Sounds and NPC sounds
  const data = Object.assign({}, cloneDeep(soundList), cloneDeep(soundList2));
  
  // Go through every sound for each hero in each group and smartly merge it with the original data.
  const sortedData = reduce(data, (res, sounds, hero) => {
    res[hero] = {};
    for (let type in sounds) {
      for (let soundID in sounds[type]) {
        delete sounds[type][soundID].path;
        delete sounds[type][soundID].isNew;
      }
      // Check out dis bad boi, tbh i dont remember how I made it but it works noice.
      res[hero][type] = keyBy(orderBy(merge({}, get(original, [hero, type], {}), sounds[type]), ['ts', 'id'], ['desc']), 'id');
    }
    return res;
  }, {});

  // Go through all sounds again (after the merge) and check if a sound is in the missingSounds array and mark it as unused
  for (let hero in missingSounds) {
    for (let type in missingSounds[hero]) {
      for (let sound of missingSounds[hero][type]) {
        if (sortedData[hero][type][sound]) sortedData[hero][type][sound].unused = true;
      }
    }
  }
  return sortedData;
}

function getSkinID(skin, heroID) {
  if (skin === '_Base') return;
  return getCleanID(skin, heroID);
}

// Second dump contains hero sounds (no skins) but includes npcs, we only want npcs
function parseSecondDump(update, dupeFolders) {
  console.info('Parsing second dump');
  return new Promise(resolve => getDirectories('./').then(heroes => {
    eachLimit(heroes, 1, (hero, cb) => {
      const heroID = groupedHeroes[getCleanID(hero)];
      if (!heroID) return cb(); // NPCs only
      soundList2[heroID] = { 'base': {} };
      soundIDCache2[heroID] = {};
      getDirectories(`./${hero}/Sound Dump`).then(folders => {
        console.info(`- Parsing sounds for ${hero}`);
        return Promise.all(folders.map(folder => getDirectories(`./${hero}/Sound Dump/${folder}`).then(sounds => {
          if (dupeFolders.includes(folder)) {
            processDupeFolderSounds(sounds, hero, false, folder, update);
            return;
          }
          return Promise.all(sounds.filter(a => a.endsWith('.wem')).map(sound => new Promise(r => {
            const soundID = sound.slice(0, -4);
            if (soundID in soundIDCache['all']) { // Ignore sound if it's mapped to a hero
              return r();
            }
            if (soundID in soundIDCache2[heroID]) { // Ignore sound if it's already been mapped
              return r();
            }

            const isNew = !get(originalSoundIDs, [heroID, soundID]);
            const ts = !isNew ? { ts: originalSoundIDs[heroID][soundID] } : update ? { ts: newTS } : void 0;
            soundIDCache2[heroID][soundID] = true;
            soundIDCache2['all'][soundID] = true;
            soundList2[heroID]['base'][soundID] = Object.assign({
              isNew,
              id: soundID,
              path: `./${hero}/Sound Dump/${folder}/${sound}`
            }, ts);
            r();
          })));
        })));
      }).then(() => {
        cb();
      });
    }, resolve);
  }));
}

function processDupeFolderSounds(sounds, hero, skin, folder, update) {
  const heroID = 'dupes';
  sounds.filter(a => a.endsWith('.wem')).forEach(sound => {
    const soundID = sound.slice(0, -4);

    if (soundID in soundIDCache[heroID]) return;

    const isNew = !get(originalSoundIDs, [heroID, soundID]);
    const ts = !isNew ? { ts: originalSoundIDs[heroID][soundID] } : update ? { ts: newTS } : void 0;

    soundIDCache[heroID][soundID] = true;
    soundIDCache['all'][soundID] = true;
    soundList[heroID]['base'][soundID] = Object.assign({
      isNew,
      id: soundID,
      path: `./${hero}/Sound Dump${skin ? ' Full' : ''}/${skin ? skin + '/' : ''}${folder}/${sound}`
    }, ts);
  });
}

// First dump contains all heroes sounds and skin sounds
function parseFullDump(update, dupeFolders) {
  console.info('Parsing full dump');
  return new Promise(resolve => getDirectories('./').then(heroes => {
    eachLimit(heroes, 1, (hero, cb) => {
      const heroID = getCleanID(hero);
      var newFiles = 0;
      var totalFiles = 0;
      getDirectories(`./${hero}/Sound Dump Full`, true).then(skins => {
        if (!skins.length) return;
        soundList[heroID] = { base: {}, misc: {} };
        soundIDCache[heroID] = {}; 
        return Promise.all(skins.map(skin => getDirectories(`./${hero}/Sound Dump Full/${skin}`).then(folders => {
          const skinID = getSkinID(skin, heroID);
          return Promise.all(folders.map(folder => getDirectories(`./${hero}/Sound Dump Full/${skin}/${folder}`).then(sounds => {
            // We got a dupe here bois
            if (dupeFolders.includes(folder)) {
              processDupeFolderSounds(sounds, hero, skin, folder, update);
              return;
            }

            return Promise.all(sounds.filter(a => a.endsWith('.wem')).map(sound => new Promise(r => {
              const soundID = sound.slice(0, -4);
              totalFiles++;

               // Heroes shouldn't have dupe sounds anyway
              if (soundID in soundIDCache[heroID]) return r();

              const isNew = !get(originalSoundIDs, [heroID, soundID]);
              const ts = !isNew ? { ts: originalSoundIDs[heroID][soundID] } : update ? { ts: newTS } : void 0;
              const isMisc = soundID.match(/^0{7}[4|5|6]/);
              
              if (isNew) newFiles++;
              soundIDCache[heroID][soundID] = true;
              soundIDCache['all'][soundID] = true;
              soundList[heroID][isMisc ? 'misc' : 'base'][soundID] = Object.assign({
                isNew,
                id: soundID,
                path: `./${hero}/Sound Dump Full/${skin}/${folder}/${sound}`
              }, ts, skinID ? { skin: skinID } : void 0);
              r();
            })));
          })));
        })));
      }).then(() => {
        if (totalFiles) console.info(`-- [${heroID}] Found ${totalFiles} files`, (newFiles ? ` | Found ${newFiles} new files` : ''));
        cb();
      });
    }, resolve);
  }));
}

// Create the !soundTemp dir if it doesn't exist
function checkTempDir() {
  return new Promise(resolve => {
    fs.stat(`./!soundTemp`, err => {
      if (err) {
        fs.mkdirSync(`./!soundTemp`);
      }
      resolve();
    });
  });
}


// Move all sound files (or new) files to the temp dir in their respective hero/npc folders
function moveFilesToTempDir(update) {
  return new Promise(resolve => {
    const sounds = Object.assign({}, soundList, soundList2);
    eachOfLimit(sounds, 1, (sounds, hero, cb) => { // one at a time
      Promise.all(Object.keys(sounds).map(type => {
        return Promise.all(Object.keys(sounds[type]).map(soundID => new Promise(r => {
          const sound = sounds[type][soundID];
          
          // if we're updating from existing data, ignore files that aren't new
          if (update && !sound.isNew) {
            return r();
          }

          checkDirectorys('!soundTemp', hero).then(() => {
            copyFile(sound.path, `./!soundTemp/${hero}/${hero}-${sound.id}.wem`, r);
          });
        })));
      })).then(() => cb());
    }, () => resolve());
  });
}

// Connvert all files in the !soundTemp folder to ogg and run revorb and then delete old .wem files
function convertFiles() {
  return new Promise((resolve, reject) => {
    console.info("Converting sound files to ogg");
    const buffer =  { maxBuffer: 1024 * 40000 }; // shit gets very large
    const base = path.join(__dirname, "../programs");

    const ww2ogg = `for /f "delims=" %f in ('dir /s/b/a-d "./!soundTemp\\*.wem" "./!soundTemp\\*.0B2" "./!soundTemp\\*.03F"') do (${base}\\ww2ogg.exe --pcb ${base}\\packed_codebooks_aoTuV_603.bin "%f")`;
    const revorb = `for /f "delims=" %f in ('dir /s/b/a-d "./!soundTemp\\*.ogg"') do (${base}\\revorb.exe "%f")`;
    const del = `for /f "delims=" %f in ('dir /s/b/a-d "./!soundTemp\\*.wem" "./!soundTemp\\*.0B2" "./!soundTemp\\*.03F"') do (del "%f")`;

    exec(ww2ogg, buffer, (err, stdout, stderr) => {
      if (err)  return reject(`Error converting files to OGG \n ===START ERROR===\n${err}\n${stderr}\n===END ERROR===`);
      console.info("Running revorb on all converted ogg files");
      exec(revorb, buffer, err2 => {
        if (err2) return reject("Error running revorb");
        console.info("Deleting old .wem files");
        exec(del, buffer, err3 => {
          if (err3) return reject("Error deleting old .wem files");
          resolve();
        });
      });
    });
  });
}

// Detect sound groups that are on multiple heroes
async function findDupeFolders() {
  return getDirectories('./').then(heroes => {
    return Promise.all(heroes.map(hero => {
      return getDirectories(`./${hero}/Sound Dump Full`, true).then(skins => {
        if (!skins.length) return; // If no sound dump folder or we're on an NPC
        return Promise.all(skins.map(skin => getDirectories(`./${hero}/Sound Dump Full/${skin}`))).then(flatten);
      });
    })).then(heroes => heroes.filter(Boolean)); // Remove undefined gaps from NPCs
  }).then(heroes => {
    var folderIds = [];
    var dupes = [];
    for (let folders of heroes) {
      for (let folder of folders) {
        if (folderIds.includes(folder)) {
          if (!dupes.includes(folder)) dupes.push(folder);
        } else folderIds.push(folder);
      }
    }

    console.info(`Detected ${dupes.length} dupe folders`);
    return uniq(dupes); // should already be uniq
  });
}

async function process01BSounds(update) {
  console.info('Parsing 01B dump');
  let totalFiles = 0;
  let actualFiles = 0;
  let newFiles = 0;

  return new Promise(resolve => {
    getDirectories('./Audio', true).then(folders => {
      if (!folders.length) {
        console.warn('No map audio!');
        setTimeout(() => {
          resolve(); // Delay before we return to give user a chance to stop
        }, 2000);
        return;
      }

      soundList['01B'] = { base: { } };

      return Promise.all(folders.map(folder => getDirectories(`./Audio/${folder}`).then(sounds => {
        return Promise.all(sounds.filter(a => a.endsWith('.wem')).map(sound => new Promise(r => {
          const soundID = sound.slice(0, -4);
          totalFiles++;

          if (soundID in soundIDCache.all || soundID in soundIDCache2.all) return r();

          actualFiles++;
          const isNew = !get(originalSoundIDs, ['01B', soundID]);
          const ts = !isNew ? { ts: originalSoundIDs['01B'][soundID] } : update ? { ts: newTS } : void 0;
          if (isNew) newFiles++;

          soundIDCache['all'][soundID] = true;

          soundList['01B']['base'][soundID] = Object.assign({
            isNew,
            id: soundID,
            path: `./Audio/${folder}/${sound}`
          }, ts);
          r();
        })));
      }))).then(() => {
        if (totalFiles) {
          console.info(`-- [01B] Found ${totalFiles} files | ${actualFiles} unique files`, (newFiles ? `| ${newFiles} new files` : ''));
        }
        resolve();
      });
    });
  });
}

async function parseSoundDump(args) {
  if (!process.cwd().match(/OverwatchAssets\\SoundDump/)) {
    console.error("Needs to be run in OverwatchAssets\SoundDump");
    process.exit();
  }

  const startTS = Date.now();

  const listOnly = args[0] == 'list';
  const fetchNew = args[0] == 'update' || args[1] == 'update';

  const dupeFolders = await findDupeFolders();
  await parseFullDump(fetchNew, dupeFolders);
  await parseSecondDump(fetchNew, dupeFolders);
  await process01BSounds(fetchNew);

  console.info('Finished parsing sounds');
  masterSoundList = sortSounds();
  fs.writeFileSync('./soundFiles.json', JSON.stringify(masterSoundList, null, 2));

  if (listOnly) {
    console.info('Done, not converting sounds');
    return;
  }

  console.info('Preparing to move and convert sounds');
  await checkTempDir();
  await moveFilesToTempDir(fetchNew);

  console.info('Moved files, converting');
  await convertFiles();
  console.info('Converted all files!');
  console.info(`Finished processing in ${moment.duration(Date.now() - startTS).asMinutes().toFixed(2)} minutes`);
}

module.exports = { parseSoundDump };