const { qualityOrder } = require('./utils.js');
const CURRENTEVENT = 'HALLOWEEN';

const EVENTS = {
  SUMMER16: 'SUMMER_GAMES_2016',
  HALLOWEEN16: 'HALLOWEEN_2016',
  CHRISTMAS16: 'WINTER_WONDERLAND_2016',
  ROOSTER17: 'YEAR_OF_THE_ROOSTER_2017',
  UPRISING17: 'UPRISING_2017',
  ANNIVERSARY17: 'ANNIVERSARY_2017',
  SUMMER: 'SUMMER_GAMES',
  HALLOWEEN: 'HALLOWEEN',
};

const EVENTORDER = {
  undefined: 0, // no event
  [EVENTS.SUMMER16]: 1,
  [EVENTS.HALLOWEEN16]: 2,
  [EVENTS.CHRISTMAS16]: 3,
  [EVENTS.ROOSTER17]: 4,
  [EVENTS.UPRISING17]: 5,
  [EVENTS.ANNIVERSARY17]: 6,
  [EVENTS.SUMMER]: 7,
  [EVENTS.HALLOWEEN]: 8,
};

const EVENTNAMES = {
  [EVENTS.CHRISTMAS16]: 'Winter Wonderland 2016',
  [EVENTS.ROOSTER17]: 'Year of the Rooster 2017',
  [EVENTS.UPRISING17]: 'Uprising 2017',
  [EVENTS.ANNIVERSARY17]: 'Anniversary 2017',
  [EVENTS.SUMMER]: 'Summer Games',
  [EVENTS.HALLOWEEN]: 'Halloween Terror',
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
  [EVENTS.ROOSTER17]: {
    "start": "1485280800000",
    "end": "1487066400000"
  },
  [EVENTS.UPRISING17]: {
    "start": "1491937200000",
    "end": "1493769600000"
  },
  [EVENTS.ANNIVERSARY17]: {
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
  [EVENTS.ANNIVERSARY17]: {
    "icons": ['heroName', 'name']
  }
};

// Mapping of cases where the new item previews are only stored under the events so when the hero data
// is generated it links the preview to the preview stored under the event. This is because in most cases
// heroes have their own item previews seperate from events but this is not always the case as I am lazy.
const EVENT_PREVIEWS = {
  [EVENTS.ANNIVERSARY17]: ['emotes'],
  [EVENTS.SUMMER]: ['emotes', 'intros'],
  [EVENTS.HALLOWEEN]: ['emotes', 'intros']
}

const NEW_EVENTS = [
  EVENTS.SUMMER,
  EVENTS.HALLOWEEN
]

module.exports = { EVENTS, EVENTNAMES, EVENTTIMES, EVENTORDER, CURRENTEVENT, EVENT_ITEM_ORDER, EVENT_PREVIEWS, NEW_EVENTS };
