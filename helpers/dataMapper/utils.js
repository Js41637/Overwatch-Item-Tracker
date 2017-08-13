const _ = require('lodash');
const achievementData = require('../../data/achievements');

const qualityOrder = {
  'common': 0,
  'rare': 1,
  'epic': 2,
  'legendary': 3
};

const qualities = ['common', 'epic', 'rare', 'legendary'];
const types = [
  { m: 'skin', name: 'skins' },
  { m: 'icon', name: 'icons' },
  { m: 'spray', name: 'sprays' },
  { m: 'emote', name: 'emotes' },
  { m: 'voice line', name: 'voicelines' },
  { m: 'victory pose', name: 'poses' },
  { m: 'heroic intro', name: 'intros' }
  //, { m: 'weapon skin', name: 'weapons' } // Golden
];

// Generate a match for each quality for every type of item
const matches = {};
types.forEach(t => {
  qualities.forEach(q => matches[`${q} ${t.m}`] = { quality: q, type: t.name });
});

// Returns the type of item, see above
const getItemType = type => {
  let m = matches[type.toLowerCase()];
  if (!m) {
    if (type !== 'Common Weapon Skin') console.warn("Unknown type?", type);
    return {};
  }
  return m;
};

// Can't generate IDs off these names can we :)
const stupidNames = {
  "^_^": "joy",
  "____": "frustration", // don't ask
  ">_<": "frustration",
  ">_\\<": "frustration",
  ";)": "winky-face",
  "^o^": "excited"
};

// Returns a cleanID, replacing all bad characters and replacing unicode ones
const getCleanID = (what, hero) => {
  what = stupidNames[what] || what;
  return (hero ? `${hero}-` : '') + 
          what.toLowerCase()
              .replace('ị', 'i')
              .replace('é', 'e')
              .replace(/[åäà]/g, 'a')
              .replace(/[öôọ]/g, 'o')
              .replace('ú', 'u')
              .replace('çã', 'ca')
              .replace(/[^a-zA-Z 0-9]/g, '')
              .trim()
              .replace(/\s+/g, " ")
              .replace(/ /g, '-');
};

// Returns the image or video URL for an item
const getPreviewURL = (type, id, hero, event) => {
  let url;
  if (event && type.match(/^(skins(Epic|Legendary)?|poses|emotes|intros)$/)) {
    url = `./resources/updates/${event}/${type}/${id}`;
  } else {
    url = `./resources/heroes/${hero}/${type}/${id}`; 
  }
  switch (type) {
    case 'voicelines':
      return `${url}.ogg`;
    case 'emotes':
    case 'intros':
      return `${url}.webm`;
    case 'sprays':
    case 'icons':
      return `${url}.png`;
    case 'skins':
    case 'skinsEpic':
    case 'skinsLegendary':
    case 'poses':
      return `${url}.jpg`;
  }
};

// Makes it so it JSON.stringify's in order
var sortObject = (o, update) => {
  var sorted = {}, array = [];

  if (update) {
    array = _.sortBy(o, u => u.order);
  } else {
    array = _.sortBy(o, h => h.name);
  }

  for (let thing of array) {
    if (update) {
      delete thing.order;
    }

    sorted[thing.id] = thing;
  }

  return sorted;
};

const getAchievementForItem = itemID => {
  const match = achievementData.achievements[achievementData.mappings[itemID]];
  if (!match) {
    console.warn('Missing achievement mapping for', itemID);
    return undefined;
  }

  return match.description;
};

module.exports = { getCleanID, getItemType, getPreviewURL, sortObject, stupidNames, qualityOrder, getAchievementForItem };
