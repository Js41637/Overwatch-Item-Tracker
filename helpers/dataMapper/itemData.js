const { EVENTS } = require('./EVENTDATA');

// All class items have no attributes provided so we need to manually add them
// ids correlate to item ids.
const data = {
  // Changes IDs and Names will eventually be fixed with a data migration.
  idsBlizzardChanged: {
    "voicelines/orisa-satisfied-with-protection": "orisa-satsified-with-protection",
    "icons/na-zdorovie": "cheers1",
    "voicelines/genji-hoping-for-a-challenge": "genji-i-was-hoping-for-a-challenge",
    "sprays/mercy-heartbeat": "mercy-stethoscope",
    "emotes/winston-twist": "winston-dance"
  },
  itemNamesIFuckedUp: {
    "voicelines/reinhardt-100-german-power": "100% German power"
  },
  badNames: {
    '>_\\<': ">_<"
  },
  defaultItems: {
    sprays: ['logo', 'you-are-not-prepared', 'da-de-los-muertos'],
    icons: ['overwatch-light', 'overwatch-dark', 'you-are-not-prepared']
  },
  hiddenItems: { // Hidden all classItems
    sprays: ['snowcer', 'snowscientist'],
    icons: []
  },
  blizzardItems: {
    sprays: ['barbarian', 'crusader', 'demon-hunter', 'monk', 'witch-doctor', 'wizard'],
    icons: ['dark-wanderer']
  },
  specialItems: {
    diablo: {
      sprays: ['barbarian', 'crusader', 'demon-hunter', 'monk', 'witch-doctor', 'wizard', 'piata'],
      icons: ['dark-wanderer', 'lord-of-terror', 'lord-of-candy', 'barbarian', 'crusader', 'demon-hunter', 'monk', 'witch-doctor', 'wizard']
    },
    starcraft: {
      icons: ['protoss', 'terran', 'zerg', 'dominion', 'hierarch', 'jim', 'queen-of-blades', '16bit-hero'],
      sprays: ['gl-hf']
    },
    "world of warcraft": {
      icons: ['for-the-alliance', 'for-the-horde', 'dark-lady', 'garrosh', 'jaina', 'lich-king', 'varian', 'you-are-not-prepared'],
      sprays: ['you-are-not-prepared']
    },
    hearthstone: {
      icons: ['hearthstone']
    },
    "heroes of the storm": {
      icons: ['nexus']
    }
  },
  achievementSprays: [
    'copa-lucioball-competitor',
    'copa-lucioball-hero',
    // HERO
    'cute',
    'pixel',
    // DEFAULT
    'beyond-the-moon',
    'forge-onward',
    'gl-hf',
    'jail',
    'man-and-omnic',
    'oops',
    'out-of-my-way',
    'piata',
    'red-o',
    'red-x',
    'respect',
    'rise',
    'sorry',
    'tea-time',
    'thanks',
    'victory',
    'well-played',
    // HALLOWEEN16
    'halloween-special',
    'junkensteins-revenge',
    'rise-of-the-zomnics',
    'the-reapening',
    // CHRISTMAS16
    'snowcree',
    'snowhog',
    'snowmei',
    'snowreaper',
    // ROOSTER17
    'auspicious-lion',
    'awakened-lion',
    // UPRISING17
    'slicer',
    'or14ns',
    'nulltrooper',
    'nullmari',
    'eradicator',
    'b73ns',
    // SUMMER17
    'goal-blossom',
    'safe-hands',
    'bicycle-kick'

  ],
  allClassEventItems: {
    sprays: {
      [EVENTS.SUMMER]: ['summer-games-2016', 'summer-games', 'goal-blossom', 'safe-hands', 'bicycle-kick'],
      [EVENTS.HALLOWEEN]: ['never-die', 'bats', 'boo', 'boop', 'candyball', 'fangs', 'gummy-hog', 'halloween-terror', 'pumpkins', 'witchs-brew', 'halloween-special', 'junkensteins-revenge', 'rise-of-the-zomnics', 'the-reapening'],
      [EVENTS.CHRISTMAS16]: ['snowcree', 'snowhog', 'snowmei', 'snowreaper', 'winter-wonderland'],
      [EVENTS.ROOSTER17]: ['auspicious-lion', 'awakened-lion', 'dragons-head', 'lucky-pouch', 'red-envelope', 'year-of-the-rooster'],
      [EVENTS.UPRISING17]: ['b73ns', 'eradicator', 'null-sector', 'nullmari', 'nulltrooper', 'or14ns', 'slicer'],
      [EVENTS.ANNIVERSARY17]: ['anniversary-2017']
    },
    icons: {
      [EVENTS.SUMMER]: ["summer-games-2016", "summer-games-2017", "australia", "brazil", "china", "egypt", "france", "germany", "greece", "japan", "mexico", "nepal", "numbani", "russia", "south-korea", "sweden", "switzerland", "united-kingdom", "united-states-of-america"],
      [EVENTS.HALLOWEEN]: ["calavera", "vampachimari", "eyeball", "superstition", "witchs-hat", "ghostymari", "tombstone", "bewitching", "candle", "never-die", "wolf", "witchs-brew", "spider", "junkensteins-pachimonster", "pachimummy", "halloween-terror-2016"],
      [EVENTS.CHRISTMAS16]: ["winter-wonderland-2016", "snowman", "present", "pachimerry", "gingermari", "2017", "holly", "tannenbaum", "bubbly", "gingerbread", "candy-cane", "ornament", "hot-cocoa", "cheers", "wreath", "mochi", "dreidel", "bells", "peppermint", "snow-globe", "pachireindeer", "stocking"],
      [EVENTS.ROOSTER17]: ["bokimari", "coin", "dragon-dance", "fortune", "fuchimari", "gold", "have-fish", "lantern", "lion-dance", "lucky-pouch", "peachimari", "new-year-cake", "pachilantern", "red-envelope", "seollal", "tangerines", "year-of-the-rooster-2017"],
      [EVENTS.UPRISING17]: ['uprising-2017', 'null-sector', 'drop-pod', 'b73ns', 'nullmari'],
      [EVENTS.ANNIVERSARY17]: ['anniversary-2017', 'pachiversary'],
    }
  }
};

module.exports = data;
