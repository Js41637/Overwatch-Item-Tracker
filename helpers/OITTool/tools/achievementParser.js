const fs = require('fs');
const path = require('path');
const { getCleanID } = require('./utils');
const heroData = require('../../../data/items');
const heroes = Object.keys(heroData).map(h => {
  const hero = heroData[h];
  if (hero.id === 'all') return;
  return { id: hero.id, name: hero.name };
}).filter(Boolean);

var achievementMapping = {};

let achievementsText;
try {
  achievementsText = fs.readFileSync('./achievements.txt', 'utf8');
} catch(e) {
  console.error('Error: Couldn\'t find an achievements.txt file!');
  process.exit();
}

console.log('Processing achievements');

// Remove the first few lines from OT
var splitText = achievementsText.split('\n');
while (!splitText[0].includes("Listing Achievements")) { // remove the first few lines
  splitText = splitText.slice(1);
}
achievementsText = splitText.slice(1).join('\n');

var achievements = achievementsText.split(/\n(?!\t)/).filter(Boolean).map(a => {
  const split = a.split('\n');
  
  let reward, quality, type;
  if (split[1]) {
    [, reward, quality, type] = split[1].replace('Reward: ', '').match(/(.+) \(([A-z]+)([A-z ]+)\)/);
  }

  const id = getCleanID(split[0]);

  const data =  {
    id,
    name: split[0].trim(),
    reward: reward ? reward.trim() : null,
    quality: quality ? quality.toLowerCase() : null,
    type: type ? type.trim().toLowerCase() : null,
    description: split[2] ? split[2].replace('Description: ', '').replace('%%', '%').trim() : null
  };

  const hero = heroes.reduce((res, hero) => {
    const heroRegex = new RegExp(` (${hero.name})('s)?( |\\.)(?!(Snowball|Teleporters))`, 'i');
    if (data.description) {
      const heroMatch = data.description.match(heroRegex);
      if (heroMatch) {
        res = hero.id;
      }
    }
    return res;
  }, 'all');

  if (hero) {
    data.hero = hero;
  }

  achievementMapping[id] = JSON.parse(JSON.stringify(data));
  delete achievementMapping[id].id;

  return data;
});

var mappings = {};
achievements.forEach(achievement => {
  const itemID = heroData[achievement.hero].items.sprays.reduce((res, item) => {
    if (item.name.toLowerCase() === achievement.reward.toLowerCase()) {
      res = item.id;
    }
    return res;
  }, null);

  if (itemID) {
    mappings[itemID] = achievement.id;
  }
});

const out = {
  achievements: achievementMapping,
  mappings: mappings
};

fs.writeFileSync(path.join(__dirname, '../../../data/achievements.json'), JSON.stringify(out, null, 2));

console.log('Done');