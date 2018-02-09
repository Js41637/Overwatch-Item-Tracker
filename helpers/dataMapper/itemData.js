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
    "emotes/winston-twist": "winston-dance",
    "voicelines/doomfist-they-say-chivalry-is-dead": "doomfist-and-they-say-chivalry-is-dead",
    "voicelines/mei-dont-you-love-surprises": "mei-dont-you-just-love-surprises",
    "voicelines/symmetra-expecting-a-miracle": "symmetra-were-you-expecting-a-miracle",
    "sprays/year-of-the-rooster-2017": "year-of-the-rooster"
  },
  itemNamesIFuckedUp: {
    "voicelines/reinhardt-100-german-power": "100% German power"
  },
  badNames: {
    '>_\\<': ">_<"
  },
  defaultItems: {
    sprays: ['logo', 'you-are-not-prepared', 'da-de-los-muertos', 'boston-uprising-logo', 'dallas-fuel-logo', 'florida-mayhem-logo', 'houston-outlaws-logo', 'london-spitfire-logo', 'los-angeles-gladiators-logo', 'los-angeles-valiant-logo', 'new-york-excelsior-logo', 'overwatch-league', 'philadelphia-fusion-logo', 'san-francisco-shock-logo', 'seoul-dynasty-logo', 'shanghai-dragons-logo'],
    icons: ['overwatch-light', 'overwatch-dark', 'you-are-not-prepared', 'boston-uprising', 'dallas-fuel', 'florida-mayhem', 'houston-outlaws', 'london-spitfire', 'los-angeles-gladiators', 'los-angeles-valiant', 'new-york-excelsior', 'overwatch-league', 'philadelphia-fusion', 'san-francisco-shock', 'seoul-dynasty', 'shanghai-dragons'],
  },
  hiddenItems: { // Hidden all classItems
    sprays: [],
    icons: []
  },
  blizzardItems: {
    sprays: [
      // Diablo
      'barbarian',
      'crusader',
      'demon-hunter',
      'monk',
      'witch-doctor',
      'wizard',
      // WoW
      'anduin',
      'jaina',
      'sylvanas',
      'varok'
    ],
    icons: [
      // Diablo
      'dark-wanderer',
      // WoW
      'kul-tiras',
      'zandalar'
    ]
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
    },
    "overwatch league": {
      icons: ['boston-uprising', 'dallas-fuel', 'florida-mayhem', 'houston-outlaws', 'london-spitfire', 'los-angeles-gladiators', 'los-angeles-valiant', 'new-york-excelsior', 'overwatch-league', 'philadelphia-fusion', 'san-francisco-shock', 'seoul-dynasty', 'shanghai-dragons'],
      sprays: ['boston-uprising-logo', 'dallas-fuel-logo', 'florida-mayhem-logo', 'houston-outlaws-logo', 'london-spitfire-logo', 'los-angeles-gladiators-logo', 'los-angeles-valiant-logo', 'new-york-excelsior-logo', 'overwatch-league', 'philadelphia-fusion-logo', 'san-francisco-shock-logo', 'seoul-dynasty-logo', 'shanghai-dragons-logo']
    }
  },
  achievementSprays: [
    'copa-lucioball-competitor',
    'copa-lucioball-hero',
    'competitive-ctf-competitor',
    'competitive-ctf-hero',
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
    //HALLOWEEN17
    'my-creations',
    'the-monster',
    'the-reaper',
    'the-witch',
    // WINTER16
    'snowcree',
    'snowhog',
    'snowmei',
    'snowreaper',
    // WINTER17
    'yeti',
    'yeti-hunter',
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
      [EVENTS.HALLOWEEN]: ['never-die', 'bats', 'boo', 'boop', 'candyball', 'fangs', 'gummy-hog', 'halloween-terror', 'pumpkins', 'witchs-brew', 'halloween-special', 'junkensteins-revenge', 'rise-of-the-zomnics', 'the-reapening', 'my-creations', 'the-monster', 'the-reaper', 'the-witch'],
      [EVENTS.WINTER]: ['snowcree', 'snowhog', 'snowmei', 'snowreaper', 'winter-wonderland', 'yeti', 'yeti-hunter'],
      [EVENTS.LUNAR]: ['auspicious-lion', 'awakened-lion', 'dragons-head', 'lucky-pouch', 'red-envelope', 'year-of-the-rooster', 'year-of-the-dog-2018', 'good-fortune'],
      [EVENTS.UPRISING]: ['b73ns', 'eradicator', 'null-sector', 'nullmari', 'nulltrooper', 'or14ns', 'slicer'],
      [EVENTS.ANNIVERSARY]: ['anniversary-2017']
    },
    icons: {
      [EVENTS.SUMMER]: ["summer-games-2016", "summer-games-2017", "australia", "brazil", "china", "egypt", "france", "germany", "greece", "japan", "mexico", "nepal", "numbani", "russia", "south-korea", "sweden", "switzerland", "united-kingdom", "united-states-of-america"],
      [EVENTS.HALLOWEEN]: ["calavera", "vampachimari", "eyeball", "superstition", "witchs-hat", "ghostymari", "tombstone", "bewitching", "candle", "never-die", "wolf", "witchs-brew", "spider", "junkensteins-pachimonster", "pachimummy", "halloween-terror-2016", "halloween-terror-2017"],
      [EVENTS.WINTER]: ["winter-wonderland-2016", "winter-wonderland-2017", "snowman", "present", "pachimerry", "gingermari", "2017", "2018", "holly", "tannenbaum", "bubbly", "gingerbread", "candy-cane", "ornament", "hot-cocoa", "cheers", "wreath", "mochi", "dreidel", "bells", "peppermint", "snow-globe", "pachireindeer", "stocking", "yetimari"],
      [EVENTS.LUNAR]: ["bokimari", "coin", "dragon-dance", "fortune", "fuchimari", "gold", "have-fish", "lantern", "lion-dance", "lucky-pouch", "peachimari", "new-year-cake", "pachilantern", "red-envelope", "seollal", "tangerines", "year-of-the-rooster-2017", "year-of-the-dog-2018", "wuchimari", "huchimari", "paquemari", "paqingmari", "good-fortune"],
      [EVENTS.UPRISING]: ['uprising-2017', 'null-sector', 'drop-pod', 'b73ns', 'nullmari'],
      [EVENTS.ANNIVERSARY]: ['anniversary-2017', 'pachiversary'],
    }
  }
};

module.exports = data;
