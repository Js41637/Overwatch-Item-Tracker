const { qualityOrder } = require('./utils.js');
const CURRENTEVENT = 'ANNIVERSARY';

const EVENTS = {
  SUMMER16: 'SUMMER_GAMES_2016',
  SUMMER17: 'SUMMER_GAMES_2017',
  SUMMER18: 'SUMMER_GAMES_2018',
  SUMMER19: 'SUMMER_GAMES_2019',
  SUMMER20: 'SUMMER_GAMES_2020',
  SUMMER21: 'SUMMER_GAMES_2021',

  HALLOWEEN16: 'HALLOWEEN_2016',
  HALLOWEEN17: 'HALLOWEEN_2017',
  HALLOWEEN18: 'HALLOWEEN_2018',
  HALLOWEEN19: 'HALLOWEEN_2019',
  HALLOWEEN20: 'HALLOWEEN_2020',
  HALLOWEEN21: 'HALLOWEEN_2021',

  CHRISTMAS16: 'WINTER_WONDERLAND_2016',
  CHRISTMAS17: 'WINTER_WONDERLAND_2017',
  CHRISTMAS18: 'WINTER_WONDERLAND_2018',
  CHRISTMAS19: 'WINTER_WONDERLAND_2019',
  CHRISTMAS20: 'WINTER_WONDERLAND_2020',
  CHRISTMAS21: 'WINTER_WONDERLAND_2021',

  LUNAR17: 'LUNAR_NEW_YEAR_2017',
  LUNAR18: 'LUNAR_NEW_YEAR_2018',
  LUNAR19: 'LUNAR_NEW_YEAR_2019',
  LUNAR20: 'LUNAR_NEW_YEAR_2020',
  LUNAR21: 'LUNAR_NEW_YEAR_2021',
  LUNAR22: 'LUNAR_NEW_YEAR_2022',

  UPRISING17: 'UPRISING_2017',
  UPRISING18: 'UPRISING_2018',
  UPRISING19: 'UPRISING_2019',
  UPRISING20: 'UPRISING_2020',
  UPRISING21: 'UPRISING_2021',

  ANNIVERSARY17: 'ANNIVERSARY_2017',
  ANNIVERSARY18: 'ANNIVERSARY_2018',
  ANNIVERSARY19: 'ANNIVERSARY_2019',
  ANNIVERSARY20: 'ANNIVERSARY_2020',
  ANNIVERSARY21: 'ANNIVERSARY_2021',
  ANNIVERSARY_REMIX_VOL_1: 'ANNIVERSARY_REMIX_VOL_1',

  SUMMER: 'SUMMER_GAMES',
  HALLOWEEN: 'HALLOWEEN',
  WINTER: 'WINTER_WONDERLAND',
  LUNAR: 'LUNAR_NEW_YEAR',
  UPRISING: 'UPRISING',
  ANNIVERSARY: 'ANNIVERSARY',
};

const LATEST_EVENTS = {
  [EVENTS.SUMMER]: EVENTS.SUMMER21,
  [EVENTS.HALLOWEEN]: EVENTS.HALLOWEEN21,
  [EVENTS.WINTER]: EVENTS.CHRISTMAS21,
  [EVENTS.LUNAR]: EVENTS.LUNAR22,
  [EVENTS.UPRISING]: EVENTS.UPRISING21,
  [EVENTS.ANNIVERSARY]: EVENTS.ANNIVERSARY_REMIX_VOL_1
}

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
  [EVENTS.UPRISING18]: {
    start: '1523386800000',
    end: '1525220550912'
  },
  [EVENTS.SUMMER17]: {
    start: '1502204400000',
    end: '1504000800000'
  },
  [EVENTS.HALLOWEEN17]: {
    start: '1507658400000',
    end: '1509613200000'
  },
  [EVENTS.WINTER17]: {
    start: '1513101600000',
    end: '1514890800000'
  },
  [EVENTS.LUNAR18]: {
    start: '1518112800000',
    end: '1520330400000'
  },
  [EVENTS.ANNIVERSARY18]: {
    start: '1527015600000',
    end: '1528797600000'
  },
  [EVENTS.WINTER18]: {
    start: '1544547600000',
    end: '1546513200000'
  },
  [EVENTS.LUNAR19]: {
    start: '1548349200000',
    end: '1550574000000'
  },
  [EVENTS.SUMMER18]: {
    start: '1533837600000',
    end: '1535709600000'
  },
  [EVENTS.SUMMER20]: {
    start: '1563300000000',
    end: '1565092800000'
  },
  [EVENTS.HALLOWEEN18]: {
    start: '1539104400000',
    end: '1541062800000'
  },
  [EVENTS.UPRISING19]: {
    start: '1555437600000',
    end: '1557230400000'
  },
  [EVENTS.ANNIVERSARY19]: {
    start: '1558461600000',
    end: '1560254400000'
  },
  [EVENTS.HALLOWEEN19]: {
    start: '1571158800000',
    end: '1572951600000'
  },
  [EVENTS.CHRISTMAS19]: {
    start: '1576004400000',
    end: '1578049200000'
  },
  [EVENTS.LUNAR20]: {
    start: '1579201200000',
    end: '1580900400000'
  },
  [EVENTS.UPRISING20]: {
    start: '1584036000000',
    end: '1585908000000'
  },
  [EVENTS.ANNIVERSARY20]: {
    start: '1589914800000',
    end: '1591786800000'
  },
  [EVENTS.SUMMER20]: {
    start: '1596564000000',
    end: '1598443200000'
  },
  [EVENTS.HALLOWEEN20]: {
    start: '1602612000000',
    end: '1604487600000'
  },
  [EVENTS.WINTER20]: {
    start: '1608058800000',
    end: '1609930800000'
  },
  [EVENTS.LUNAR21]: {
    start: '1612465200000',
    end: '1614337200000'
  },
  [EVENTS.UPRISING]: {
    start: '1617735600000',
    end: '1619611200000'
  },
  [EVENTS.ANNIVERSARY21]: {
    start: '1621364400000',
    end: '1623409200000'
  },
  [EVENTS.SUMMER]: {
    start: '1626807600000',
    end: '1628679600000'
  },
  [EVENTS.HALLOWEEN]: {
    start: '1634061600000',
    end: '1635933600000'
  },
  [EVENTS.WINTER]: {
    start: '1639681200000',
    end: '1641553200000'
  },
  [EVENTS.LUNAR]: {
    start: '1643137200000',
    end: '1645009200000'
  },
  [EVENTS.ANNIVERSARY]: {
    start: '1649185200000',
    end: '1651057200000'
  }
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
    voicelines: ['isNew', 'heroName', 'name']
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

const EVENT_CONFIG = {
  [EVENTS.LUNAR]: {
    disable_seperate_legendary_skins: true
  },
  [EVENTS.ANNIVERSARY_REMIX_VOL_1]: {
    display_name: 'Remix Vol. 1'
  }
}

module.exports = { EVENTS, EVENTNAMES, EVENTTIMES, EVENTORDER, CURRENTEVENT, EVENT_ITEM_ORDER, EVENT_PREVIEWS, LATEST_EVENTS, EVENT_CONFIG };
