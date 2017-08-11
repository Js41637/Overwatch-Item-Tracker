const achievementsText = '';
const heroes = [];
const json = {};
const getCleanID = function() {};

var achievementMapping = {};
var achievements = achievementsText.split(/\n(?!\t)/).filter(Boolean).map(a => {
  const split = a.split('\n');
  
  let reward, quality, type;
  if (split[1]) {
    [, reward, quality, type] = split[1].replace('Reward: ', '').match(/(.+) \(([A-z]+)([A-z ]+)\)/);
  }

  const id = getCleanID(split[0]);

  const data =  {
    id,
    name: split[0],
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
  const itemID = json.heroes[achievement.hero].items.sprays.reduce((res, item) => {
    if (item.name.toLowerCase() === achievement.reward.toLowerCase()) {
      res = item.id;
    }
    return res;
  }, null);

  if (itemID) {
    mappings[itemID] = achievement.id;
  }
});