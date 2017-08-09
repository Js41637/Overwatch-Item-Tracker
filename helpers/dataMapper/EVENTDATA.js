const { qualityOrder } = require('./utils.js');
const CURRENTEVENT = 'SUMMER_GAMES';

const EVENTS = {
  SUMMER: 'SUMMER_GAMES',
  HALLOWEEN16: 'HALLOWEEN_2016',
  CHRISTMAS16: 'WINTER_WONDERLAND_2016',
  ROOSTER17: 'YEAR_OF_THE_ROOSTER_2017',
  UPRISING17: 'UPRISING_2017',
  ANNIVERSARY17: 'ANNIVERSARY_2017'
};

const EVENTORDER = {
  undefined: 0, // no event
  [EVENTS.SUMMER]: 7,
  [EVENTS.HALLOWEEN16]: 1,
  [EVENTS.CHRISTMAS16]: 2,
  [EVENTS.ROOSTER17]: 3,
  [EVENTS.UPRISING17]: 4,
  [EVENTS.ANNIVERSARY17]: 5
};

const EVENTNAMES = {
  [EVENTS.SUMMER]: 'Summer Games',
  [EVENTS.HALLOWEEN16]: 'Halloween Terror 2016',
  [EVENTS.CHRISTMAS16]: 'Winter Wonderland 2016',
  [EVENTS.ROOSTER17]: 'Year of the Rooster 2017',
  [EVENTS.UPRISING17]: 'Uprising 2017',
  [EVENTS.ANNIVERSARY17]: 'Anniversary 2017'
};

const EVENTTIMES = {
  [EVENTS.SUMMER]: {
    "start": "1470164400000",
    "end": "1471928400000"
  },
  [EVENTS.HALLOWEEN16]: {
    "start": "1476208800000",
    "end": "1478059200000"
  },
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
  }
};

const EVENT_ITEM_ORDER = {
  [EVENTS.SUMMER]: {
    "icons": ['heroName', 'name'],
    "skins": [a => qualityOrder[a.quality], 'heroName', 'name']
  },
  [EVENTS.ANNIVERSARY17]: {
    "icons": ['heroName', 'name']
  }
};

module.exports = { EVENTS, EVENTNAMES, EVENTTIMES, EVENTORDER, CURRENTEVENT, EVENT_ITEM_ORDER };
