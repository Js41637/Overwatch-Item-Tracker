const _ = require('lodash');
const achievementData = require('../../data/achievements');

const qualityOrder = {
  common: 0,
  rare: 1,
  epic: 2,
  legendary: 3
};

const qualities = ['common', 'epic', 'rare', 'legendary'];
const types = [
  { m: 'skin', name: 'skins' },
  { m: 'playericon', name: 'icons' },
  { m: 'spray', name: 'sprays' },
  { m: 'emote', name: 'emotes' },
  { m: 'voiceline', name: 'voicelines' },
  { m: 'pose', name: 'poses' },
  { m: 'highlightintro', name: 'intros' },
  { m: 'weapon', name: 'weapons' } // Golden
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
    console.warn("Unknown type?", type);
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
            .replace(/[åäàá]/g, 'a')
            .replace(/[öôọó]/g, 'o')
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
    url = `/updates/${event}/${type}/${id}`;
  } else {
    url = `/heroes/${hero}/${type}/${id}`;
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
    array = _.sortBy(o, h => h.sortName || h.name);
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

const getOriginalItemsList = data => {
  const out = {}

  for (let hero in data.heroes) {
    out[hero] = {}
    for (let type in data.heroes[hero].items) {
      out[hero][type] = []
      for (let item of data.heroes[hero].items[type]) {
        out[hero][type].push(item.id)
      }
    }
  }

  return out
}

module.exports = { getCleanID, getItemType, getPreviewURL, sortObject, stupidNames, qualityOrder, getAchievementForItem, getOriginalItemsList };
