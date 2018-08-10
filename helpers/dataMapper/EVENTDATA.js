const { qualityOrder } = require('./utils.js');
const CURRENTEVENT = 'SUMMER_GAMES';

const EVENTS = {
  SUMMER16: 'SUMMER_GAMES_2016',
  SUMMER17: 'SUMMER_GAMES_2017',
  SUMMER18: 'SUMMER_GAMES_2018',

  HALLOWEEN16: 'HALLOWEEN_2016',
  HALLOWEEN17: 'HALLOWEEN_2017',

  CHRISTMAS16: 'WINTER_WONDERLAND_2016',
  CHRISTMAS17: 'WINTER_WONDERLAND_2017',

  LUNAR17: 'LUNAR_NEW_YEAR_2017',
  LUNAR18: 'LUNAR_NEW_YEAR_2018',

  UPRISING17: 'UPRISING_2017',
  UPRISING18: 'UPRISING_2018',

  ANNIVERSARY17: 'ANNIVERSARY_2017',
  ANNIVERSARY18: 'ANNIVERSARY_2018',

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
  [EVENTS.LUNAR]: 'Lunar New Year',
  [EVENTS.UPRISING]: 'Overwatch Archives',
  [EVENTS.ANNIVERSARY]: 'Anniversary'
};

const EVENTTIMES = {
  //[EVENTS.SUMMER16]: {1502204400000
  //  start: '1470164400000',
  //  end: '1471928400000'
  //},
  //[EVENTS.HALLOWEEN16]: {
  //  start: '1476208800000',
  //  end: '1478059200000'
  //},
  // [EVENTS.UPRISING17]: {
  //   start: '1491937200000',
  //   end: '1493769600000'
  // },
  [EVENTS.CHRISTMAS16]: {
    start: '1481652000000',
    end: '1483416000000'
  },
  [EVENTS.LUNAR16]: {
    start: '1485280800000',
    end: '1487066400000'
  },
  [EVENTS.UPRISING]: {
    start: '1523386800000',
    end: '1525220550912'
  },
  [EVENTS.ANNIVERSARY]: {
    start: '1527015600000',
    end: '1528797600000'
  },
  [EVENTS.SUMMER17]: {
    start: '1502204400000',
    end: '1504000800000'
  },
  [EVENTS.SUMMER]: {
    start: '1533837600000',
    end: '1535709600000'
  },
  [EVENTS.HALLOWEEN]: {
    start: '1507658400000',
    end: '1509613200000'
  },
  [EVENTS.WINTER]: {
    start: '1513101600000',
    end: '1514890800000'
  },
  [EVENTS.LUNAR]: {
    start: '1518112800000',
    end: '1520330400000'
  },
};

const EVENT_ITEM_ORDER = {
  [EVENTS.SUMMER]: {
    icons: ['heroName', 'name'],
    skins: [a => qualityOrder[a.quality], 'heroName', 'name']
  },
  [EVENTS.HALLOWEEN]: {
    icons: ['heroName', 'name'],
    skins: [a => qualityOrder[a.quality], 'heroName', 'name']
  },
  [EVENTS.WINTER]: {
    icons: ['name'],
    skins: [a => qualityOrder[a.quality], 'heroName', 'name']
  },
  [EVENTS.ANNIVERSARY]: {
    skins: [a => qualityOrder[a.quality], 'heroName', 'name'],
    icons: ['heroName', 'name'],
    voicelines: ['heroName', item => item.isNew ? 1 : 0, 'name']
  },
  [EVENTS.LUNAR]: {
    skins: [a => qualityOrder[a.quality], 'heroName', 'name'],
    icons: ['heroName', 'name']
  },
  [EVENTS.UPRISING]: {
    skins: [a => qualityOrder[a.quality], 'heroName', 'name'],
    icons: ['heroName', 'name']
  }
};

// Mapping of cases where the new item previews are only stored under the events so when the hero data
// is generated it links the preview to the preview stored under the event. This is because in most cases
// heroes have their own item previews seperate from events but this is not always the case as I am lazy.
const EVENT_PREVIEWS = {
  [EVENTS.ANNIVERSARY]: ['emotes']
}

const LATEST_EVENTS = {
  [EVENTS.SUMMER]: EVENTS.SUMMER18,
  [EVENTS.HALLOWEEN]: EVENTS.HALLOWEEN17,
  [EVENTS.WINTER]: EVENTS.CHRISTMAS17,
  [EVENTS.LUNAR]: EVENTS.LUNAR18,
  [EVENTS.UPRISING]: EVENTS.UPRISING18,
  [EVENTS.ANNIVERSARY]: EVENTS.ANNIVERSARY18
}

module.exports = { EVENTS, EVENTNAMES, EVENTTIMES, EVENTORDER, CURRENTEVENT, EVENT_ITEM_ORDER, EVENT_PREVIEWS, LATEST_EVENTS };
