const fs = require('fs');
const { getDirectories, getCleanID, cleanFileIDs, handleErr } = require('./utils');
const { mapFilesToHeroes } = require('./filesToHeroMapper');
const { eachLimit } = require('async');
const { exec } = require('child_process');

var TYPES = {
  Portrait: 'icons',
  Spray: 'sprays'
};

const checkDirs = () => {
  fs.stat(`./!toBeConverted`, err => {
    if (err) {
      fs.mkdirSync(`./!toBeConverted`);
      fs.mkdirSync(`./!toBeConverted/Portrait`);
      fs.mkdirSync(`./!toBeConverted/Spray`);
    }
  });
  fs.stat('./images', err => {
    if (err) fs.mkdirSync(`./images`);
  });
};

const findImages = hero => {
  return new Promise(resolve => {
    const base = hero.length ? 'Heroes/' : 'General';
    const heroID = getCleanID(hero);

    getDirectories(`./${base}${hero}`).then(types => {
      if (!types.includes('Portrait') && !types.includes('Spray')) return resolve();
      Promise.all(types.map(type => {
        return new Promise(res => {
          if (type !== 'Portrait' && type !== 'Spray') return res();
          moveImages(hero, type, heroID).then(res);
        });
      })).then(resolve);
    }).catch(err => {
      console.error(err)
      resolve()
    });
  });
};

const _moveImages = (files, heroId, type, where) => {
  return new Promise(res => {
    files = cleanFileIDs(files, heroId);
    let total = 0
    files.forEach(file => {
      total++;
      fs.createReadStream(`${where}/${file.name}`).pipe(fs.createWriteStream(`./!toBeConverted/${type}/${file.cleanName}.TIF`));
    });
    setTimeout(() => {
      res(total);
    }, 1000);
  })
}

const moveImages = (heroDir, type, heroID) => {
  return new Promise((resolve, reject) => {
    const base = heroDir ? `Heroes/${heroDir}` : 'General';
    const isGeneral = base === 'General'

    return getDirectories(`./${base}/${type}`).then(events => {
      var totalFiles = 0;
      return Promise.all(events.map(event => {
        return getDirectories(`./${base}/${type}/${event}`).then(typesOrFiles => {
          if (isGeneral) {
            return _moveImages(typesOrFiles, heroID,  type, `./${base}/${type}/${event}`).then(total => {
              totalFiles += total
            })
          }

          return Promise.all(typesOrFiles.map(otherType => {
            return getDirectories(`./${base}/${type}/${event}/${otherType}`).then(files => {
              return _moveImages(files, heroID,  type, `./${base}/${type}/${event}/${otherType}`).then(total => {
                totalFiles += total
              })
            })
          }))
        });
      })).then(() => {
        console.log(`[Hero] ${heroID || 'General'} - Got ${totalFiles} ${type} files`);
        resolve();
      });
    }).catch(reject);
  });
};

const convertFiles = () => {
  return new Promise((resolve, reject) => {
    console.log("Preparing to convert files");
    getDirectories('./!toBeConverted').then(types => {
      eachLimit(types, 1, (type, cb) => {
        console.log(`Starting to convert ${TYPES[type]}`);
        console.log(`-- Converting images to png`);
        // timeout prevents the first icon from being converted incorrectly for some reason
        setTimeout(() => {
          exec(`mogrify -path ./images -format png ./!toBeConverted/${type}/*.TIF`, err => {
            if (err) return reject(`Error while mogrify'ing images! \n ${err}`);
            console.log("-- Optimising images with pngquant");
            exec(`pngquant ./images/*.png --ext=.png --speed 1 --force --strip`, err2 => {
              if (err2) return reject(`Error while pngquant'ing images! \n ${err2}`);
              // Need to set a timeout as this command seems to exit well before it is actually finished
              setTimeout(() => {
                console.log("-- Moving files to their hero dirs");
                mapFilesToHeroes([TYPES[type], './images/']).then(() => {
                  console.log("-- Finished moving files");
                  cb();
                });
              }, 4500);
            });
          });
        }, 1500);
      }, () => {
        console.log("Finished converting all images");
      });
    });
  });
};

const extractImages = (skipExtract) => {
  if (!process.cwd().match(/OverwatchAssets$/)) {
    console.error("Needs to be run in OverwatchAssets");
    process.exit();
  }

  skipExtract = (skipExtract[0] || '') == 'skip';

  console.log("Preparing to move all sprays and icons");
  checkDirs();
  if (skipExtract) {
    console.log("Skipping extraction, converting files");
    convertFiles().catch(handleErr);
    return;
  }
  getDirectories('./Heroes').then(heroDirs => {
    Promise.all([ ...heroDirs, ''].map(hero => {
      return new Promise(resolve => findImages(hero).then(resolve));
    })).then(() => {
      console.log("Finished moving sprays and icons, starting conversion");
      convertFiles().catch(handleErr);
    });
  }).catch(console.error);
};

module.exports = { extractImages };
