const fs = require('fs');
const { sortBy } = require('lodash');
const { getDirectories, cleanFileIDs, handleErr } = require('./utils');

var TYPES = {
  Portrait: 'icons',
  Spray: 'sprays'
};

const mapAllClassData = () => {
  const cwd = process.cwd();
  const isGeneral = cwd.match(/OverwatchAssets\\General$/);
  if (!cwd.match(/OverwatchAssets$/) && !isGeneral) {
    console.error("Needs to be run in OverwatchAssets or OverwatchAssets\\General");
    process.exit();
  }

  var data = {
    icons: [],
    sprays: []
  };

  const base = `./${isGeneral ? '' : 'General/'}`;
  getDirectories(base).then(types => {
    Promise.all(types.map(type => {
      if (type !== 'Portrait' && type !== 'Spray') return Promise.resolve();
      return getDirectories(`${base}${type}`).then(groups => {
        return Promise.all(groups.map(group => {
          return getDirectories(`${base}${type}/${group}`).then(files => {
            files = files.filter(x => !fs.statSync(`${base}${type}/${group}/${x}`).isDirectory())
            files = cleanFileIDs(files);
            return Promise.all(files.map(({ name, cleanName }) => {
              data[TYPES[type]].push({ name: name.slice(0, -4), id: cleanName });
              Promise.resolve();
            }));
          }).catch(handleErr);
        })).catch(handleErr);
      }).catch(handleErr);
    })).then(() => {
      Object.keys(data).forEach(type => {
        data[type] = sortBy(data[type], [a => a.name.toLowerCase()]);
      });
      fs.writeFileSync(`${base}allClassItems.json`, JSON.stringify(data, null, 2));
    });
  }).catch(handleErr);
};

module.exports = { mapAllClassData };
