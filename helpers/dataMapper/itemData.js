const { EVENTS } = require('./EVENTDATA')

// All class items have no attributes provided so we need to manually add them
// ids correlate to items in allClassItems.json
const data = {
  defaultItems: {
    sprays: ['logo', 'you-are-not-prepared', 'da-de-los-muertos'],
    icons: ['overwatch-light', 'overwatch-dark', 'you-are-not-prepared']

  },
  achievementSprays: [
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
    'awakened-lion'

  ],
  // Items surrounded by [] means they are not purchasable / achievement
  allClassEventItems: {
    sprays: {
      [EVENTS.SUMMER16]: ['summer-games-2016'],
      [EVENTS.HALLOWEEN16]: ['never-die', 'bats', 'boo', 'boop', 'candyball', 'fangs', 'gummy-hog', 'halloween-terror', 'pumpkins', 'witchs-brew', 'halloween-special', 'junkensteins-revenge', 'rise-of-the-zomnics', 'the-reapening'],
      [EVENTS.CHRISTMAS16]: ['snowcree', 'snowhog', 'snowmei', 'snowreaper', 'winter-wonderland'],
      [EVENTS.ROOSTER17]: ['auspicious-lion', 'awakened-lion', 'dragons-head', 'lucky-pouch', 'red-envelope', 'year-of-the-rooster']
    },
    icons: {
      [EVENTS.SUMMER16]: ["summer-games-2016", "australia", "brazil", "china", "egypt", "france", "germany", "greece", "japan", "mexico", "nepal", "numbani", "russia", "south-korea", "sweden", "switzerland", "united-kingdom", "united-states-of-america"],
      [EVENTS.HALLOWEEN16]: ["halloween-terror-2016", "never-die", "bewitching", "calavera", "candle", "eyeball", "ghostymari", "spider", "superstition", "tombstone", "vampachimari", "witchs-brew", "witchs-hat", "wolf"],
      [EVENTS.CHRISTMAS16]: ["winter-wonderland-2016", "snowman", "present", "pachimerry", "gingermari", "2017", "holly", "tannenbaum", "bubbly", "gingerbread", "candy-cane", "ornament", "hot-cocoa", "cheers", "wreath", "mochi", "dreidel", "bells", "peppermint", "snow-globe", "pachireindeer", "stocking"],
      [EVENTS.ROOSTER17]: ["bokimari", "coin", "dragon-dance", "fortune", "fuchimari", "gold", "have-fish", "lantern", "lion-dance", "lucky-pouch", "lunamari", "new-year-cake", "pachilantern", "red-envelope", "seollal", "tangerines", "year-of-the-rooster-2017"]
    }
  }
}

module.exports = data


/* ORIGINAL
const allClassEventItems = {
  sprays: {
    [EVENTS.SUMMER16]: ['Summer Games'],
    [EVENTS.HALLOWEEN16]: ['...Never Die', 'Bats', 'Boo!', 'Boop!', 'Candyball', 'Fangs', 'Gummy Hog', 'Halloween Terror 2016', 'Pumpkins', 'Witch\'s Brew'],
    [EVENTS.CHRISTMAS16]: [['SnowCree'], ['SnowHog'], ['SnowMei'], ['SnowReaper'], 'Winter Wonderland'],
    [EVENTS.ROOSTER17]: [['Auspicious Lion'], ['Awakened Lion'], 'Dragon\'s Head', 'Lucky Pouch', 'Red Envelope', 'Year of the Rooster']
  },
  icons: {
    [EVENTS.SUMMER16]: ["Summer Games", "Australia", "Brazil", "China", "Egypt", "France", "Germany", "Greece", "Japan", "Mexico", "Nepal", "Numbani", "Russia", "South Korea", "Sweden", "Switzerland", "United Kingdom", "United States"],
    [EVENTS.HALLOWEEN16]: ["Halloween Terror", "...Never Die", "Bewitching", "Calavera", "Candle", "Eyeball", "Ghostymari", "Spider", "Superstition", "Tombstone", "Vampachimari", "Witch's Brew", "Witch's Hat", "Wolf"],
    [EVENTS.CHRISTMAS16]: ["Winter Wonderland", "Snowman", "Present", "Pachimerry", "Gingermari", "2017", "Holly", "Tannenbaum", "Bubbly", "Gingerbread", "Candy Cane", "Ornament", "Hot Cocoa", "Cheers!", "Wreath", "Mochi", "Dreidel", "Bells", "Peppermint", "Snow Globe", "Pachireindeer", "Stocking"],
    [EVENTS.ROOSTER17]: ["Bokimari", "Coin", "Dragon Dance", "Fortune", "Fuchimari", "Gold", "Have Fish", "Lantern", "Lion Dance", "Lucky Pouch", "Lunamari", "New Year Cake", "Pachilantern", "Red Envelope", "Seollal", "Tangerines", "Year of the Rooster"]
  }
}
*/
