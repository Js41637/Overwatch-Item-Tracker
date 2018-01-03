const { qualityOrder } = require('./utils.js');
const CURRENTEVENT = 'WINTER_WONDERLAND';

const EVENTS = {
  SUMMER16: 'SUMMER_GAMES_2016',
  HALLOWEEN16: 'HALLOWEEN_2016',
  CHRISTMAS16: 'WINTER_WONDERLAND_2016',
  LUNAR17: 'LUNAR_NEW_YEAR_2017',
  UPRISING17: 'UPRISING_2017',
  ANNIVERSARY17: 'ANNIVERSARY_2017',
  SUMMER: 'SUMMER_GAMES',
  HALLOWEEN: 'HALLOWEEN',
  WINTER: 'WINTER_WONDERLAND',
  LUNAR: 'LUNAR_NEW_YEAR',
  UPRISING: 'UPRISING',
  ANNIVERSARY: 'ANNIVERSARY',
};

const EVENTORDER = {
  undefined: 0, // no event
  [EVENTS.SUMMER]: 1,
  [EVENTS.HALLOWEEN]: 2,
  [EVENTS.WINTER]: 3,
  [EVENTS.LUNAR]: 4,
  [EVENTS.UPRISING]: 5,
  [EVENTS.ANNIVERSARY]: 6
};

const EVENTNAMES = {
  [EVENTS.SUMMER]: 'Summer Games',
  [EVENTS.HALLOWEEN]: 'Halloween Terror',
  [EVENTS.WINTER]: 'Winter Wonderland',
  [EVENTS.LUNAR]: 'Year of the Rooster',
  [EVENTS.UPRISING]: 'Uprising',
  [EVENTS.ANNIVERSARY]: 'Anniversary'
};

const EVENTTIMES = {
  //[EVENTS.SUMMER16]: {1502204400000
  //  "start": "1470164400000",
  //  "end": "1471928400000"
  //},
  //[EVENTS.HALLOWEEN16]: {
  //  "start": "1476208800000",
  //  "end": "1478059200000"
  //},
  [EVENTS.CHRISTMAS16]: {
    "start": "1481652000000",
    "end": "1483416000000"
  },
  [EVENTS.LUNAR]: {
    "start": "1485280800000",
    "end": "1487066400000"
  },
  [EVENTS.UPRISING]: {
    "start": "1491937200000",
    "end": "1493769600000"
  },
  [EVENTS.ANNIVERSARY]: {
    "start": "1495551600000",
    "end": "1497348000000"
  },
  [EVENTS.SUMMER]: {
    "start": "1502204400000",
    "end": "1504000800000"
  },
  [EVENTS.HALLOWEEN]: {
    "start": "1507658400000",
    "end": "1509613200000"
  },
  [EVENTS.WINTER]: {
    "start": "1513101600000",
    "end": "1514890800000"
  }
};

const EVENT_ITEM_ORDER = {
  [EVENTS.SUMMER]: {
    "icons": ['heroName', 'name'],
    "skins": [a => qualityOrder[a.quality], 'heroName', 'name']
  },
  [EVENTS.HALLOWEEN]: {
    "icons": ['heroName', 'name'],
    "skins": [a => qualityOrder[a.quality], 'heroName', 'name']
  },
  [EVENTS.WINTER]: {
    "icons": ['name'],
    "skins": [a => qualityOrder[a.quality], 'heroName', 'name']
  },
  [EVENTS.ANNIVERSARY]: {
    "icons": ['heroName', 'name']
  }
};

// Mapping of cases where the new item previews are only stored under the events so when the hero data
// is generated it links the preview to the preview stored under the event. This is because in most cases
// heroes have their own item previews seperate from events but this is not always the case as I am lazy.
const EVENT_PREVIEWS = {
  [EVENTS.ANNIVERSARY]: ['emotes'],
  [EVENTS.SUMMER]: ['emotes', 'intros'],
  [EVENTS.HALLOWEEN]: ['emotes', 'intros'],
  [EVENTS.WINTER]: ['emotes', 'intros']
}

const NEW_EVENTS = [
  EVENTS.SUMMER,
  EVENTS.HALLOWEEN,
  EVENTS.WINTER
]

module.exports = { EVENTS, EVENTNAMES, EVENTTIMES, EVENTORDER, CURRENTEVENT, EVENT_ITEM_ORDER, EVENT_PREVIEWS, NEW_EVENTS };
