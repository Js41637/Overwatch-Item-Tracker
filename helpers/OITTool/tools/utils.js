const fs = require('fs');
const _getCleanID = require('../../dataMapper/utils').getCleanID;
const _getCleanHeroID = require('../../dataMapper/utils').getCleanHeroId;
const idsBlizzardChanged = require('../../dataMapper/itemData').idsBlizzardChanged

const handleErr = err => console.log(`Error while doing stuff!!\n==ERROR==\n${err}\n==ENDERROR==`);

const getCleanID = (what, hero) => {
  if (!what.length) return undefined;
  return _getCleanID(what.replace(/\.(png|dds|tif|jpg|wem|ogg)|$/i, ''), hero);
};

const getCleanHeroID = heroId => {
  return _getCleanHeroID(heroId)
}

const hardCodedIds = {
  "Cheers!.dds": "cheers",
  "Cheers.dds": "cheers1"
};

const badItems = {
  'law': 'dva-law',
  'oni': 'genji-oni'
};

const cleanFileIDs = (files, heroID, itemType) => {
  var itemIDCache = {};
  return files.map(file => {
    var id = getCleanID(file, heroID);

    
    const uniqueId = `${itemType}/${id}`
    id = idsBlizzardChanged[uniqueId] || id
    
    if (itemIDCache[id]) {
      console.warn("ItemID collision found", id);
      id = `${id}1`;
    }
    itemIDCache[id] = true;
    // fml
    id = !heroID && badItems[id] ? badItems[id] : (!heroID && hardCodedIds[file]) ? hardCodedIds[file] : id;
    return { name: file, cleanName: id};
  });
};

const getDirectories = (where, noerr) => {
  return new Promise((resolve, reject) => {
    fs.stat(where, err => {
      if (err && noerr) return resolve([]);
      if (err) return reject(`${where} doesn't exist`);
      fs.readdir(where, (err, dirs) => {
        if (err && noerr) return resolve([]);
        if (err) return reject("I dunno, no dirs??");
        return resolve(dirs.map(d => (d.startsWith('!') || d.endsWith('.js') || d.endsWith('.json')) ? null : d).filter(Boolean));
      });
    });
  });
};

const checkDirectorys = (param1, param2, where = './') => {
  return new Promise(resolve => {
    fs.stat(`${where}${param1}`, err => {
      if (err) {
        fs.mkdir(`${where}${param1}`, () => {
          if (param2 && param2 !== '') fs.mkdir(`${where}${param1}/${param2}`, resolve);
          else resolve();
        });
      } else {
        fs.stat(`${where}${param1}/${param2}`, err => {
          if (err) {
            fs.mkdir(`${where}${param1}/${param2}`, resolve);
          } else resolve();
        });
      }
    });
  });
};

const copyFile = (source, target, cb) => {
  var cbCalled = false;
  const rd = fs.createReadStream(source);
  rd.on("error", done);
  const wr = fs.createWriteStream(target);
  wr.on("error", done);
  wr.on("close", done);
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
};

module.exports = { getDirectories, getCleanID, checkDirectorys, cleanFileIDs, copyFile, handleErr, getCleanHeroID };
