const { EVENTS } = require('./EVENTDATA');

const OWLTEAMS = ['atlanta-reign', 'boston-uprising', 'chengdu-hunters', 'dallas-fuel', 'florida-mayhem', 'guangzhou-charge', 'hangzhou-spark', 'houston-outlaws', 'london-spitfire', 'los-angeles-gladiators', 'los-angeles-valiant', 'new-york-excelsior', 'overwatch-league', 'paris-eternal', 'philadelphia-fusion', 'san-francisco-shock', 'seoul-dynasty', 'shanghai-dragons', 'toronto-defiant', 'vancouver-titans', 'washington-justice']
const OWLTEAMLOGOS = OWLTEAMS.map(team => team === 'overwatch-league' ? team : `${team}-logo`)
// All class items have no attributes provided so we need to manually add them
// ids correlate to item ids.
const data = {
  // Changes IDs and Names will eventually be fixed with a data migration.
  idsBlizzardChanged: {
    "sprays/hanzo-brickstrike": "hanzo-brick-dragon",
    "sprays/year-of-the-dog": "year-of-the-dog-2018",
    "sprays/year-of-the-rooster": "year-of-the-rooster-2017",
    "sprays/junkrat-hayseed": "junkrat-scarecrow",
    "skins/junkrat-bilgerat": "junkrat-buccaneer",
    "sprays/anniversary": "anniversary-2017",
    "voicelines/moira-slainte": "moira-slinte",
    "voicelines/brigitte-its-broken": "brigitte-this-is-pie",
    "sprays/saurfang": "varok",
    "sprays/watchparty-gibraltar": "watchpoint-gibraltar",
    "icons/2018-pacific-allstars": "pacific-allstars-2018",
    "icons/2018-atlantic-allstars": "atlantic-allstars-2018",

    "voicelines/roadhog-im-beached-as-bro": "roadhog-youre-a-talker",
    "voicelines/brigitte-get-out-of-here": "brigitte-take-a-hike",


    "icons/competitive-ctf-competitor-2018": "competitive-ctf-competitor",
    "icons/competitive-ctf-hero-2018": "competitive-ctf-hero",
    "sprays/competitive-ctf-competitor-2018": "competitive-ctf-competitor",
    "sprays/competitive-ctf-hero-2018": "competitive-ctf-hero",

    "icons/competitive-6v6-elimination-competitor-2018": "competitive-6v6-elimination-competitor",
    "icons/competitive-6v6-elimination-hero-2018": "competitive-6v6-elimination-hero",
    "sprays/competitive-6v6-elimination-competitor-2018": "competitive-6v6-elimination-competitor",
    "sprays/competitive-6v6-elimination-hero-2018": "competitive-6v6-elimination-hero",

    "sprays/competitive-deathmatch-competitor-2018": "competitive-deathmatch-competitor",
    "sprays/competitive-deathmatch-hero-2018": "competitive-deathmatch-hero",
    "icons/competitive-deathmatch-competitor-2018": "competitive-deathmatch-competitor",
    "icons/competitive-deathmatch-hero-2018": "competitive-deathmatch-hero",

    "sprays/competitive-3v3-elimination-competitor-2018": "competitive-3v3-elimination-competitor",
    "sprays/competitive-3v3-elimination-hero-2018": "competitive-3v3-elimination-hero",
    "icons/competitive-3v3-elimination-competitor-2018": "competitive-3v3-elimination-competitor",
    "icons/competitive-3v3-elimination-hero-2018": "competitive-3v3-elimination-hero",

    "sprays/competitive-team-deathmatch-competitor-2018": "competitive-team-deathmatch-competitor",
    "sprays/competitive-team-deathmatch-hero-2018": "competitive-team-deathmatch-hero",
    "icons/competitive-team-deathmatch-competitor-2018": "competitive-team-deathmatch-competitor",
    "icons/competitive-team-deathmatch-hero-2018": "competitive-team-deathmatch-hero"
  },
  itemNamesIFuckedUp: {
    "voicelines/reinhardt-100-german-power": "100% German power"
  },
  badNames: {
    '>_\\<': ">_<"
  },
  defaultItems: {
    sprays: ['logo', 'you-are-not-prepared', 'da-de-los-muertos', ...OWLTEAMLOGOS],
    icons: ['overwatch-light', 'overwatch-dark', 'you-are-not-prepared', ...OWLTEAMS],
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
      'varok',
      'bastet',
      // Warcraft
      'footman',
      'ghoul',
      'grunt',
      'archer'
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
      icons: ['kul-tiras', 'zandalar', 'for-the-alliance', 'for-the-horde', 'dark-lady', 'garrosh', 'jaina', 'lich-king', 'varian', 'you-are-not-prepared'],
      sprays: ['you-are-not-prepared', 'anduin', 'jaina', 'sylvanas', 'varok']
    },
    warcraft: {
      icons: ['arthas', 'thrall', 'tyrande', 'lich-king-1', 'kelthuzad'],
      sprays: ['footman', 'ghoul', 'grunt', 'archer']
    },
    hearthstone: {
      icons: ['hearthstone']
    },
    "heroes of the storm": {
      icons: ['nexus']
    },
    "overwatch league": {
      icons: [...OWLTEAMS, 'inaugural-season', 'pacific-allstars-2018', 'atlantic-allstars-2018', '2019-atlantic-allstars', '2019-pacific-allstars', 'grand-finals-2019'],
      sprays: [...OWLTEAMLOGOS, 'inaugural-season', '1-fan', 'living-room', 'matchs-on', 'watchpoint-gibraltar', "watching-ball", "tailgate"]
    }
  },
  achievementSprays: [
    'path-to-pro-2019',
    'copa-lucioball-competitor',
    'copa-lucioball-hero',
    'competitive-ctf-competitor',
    'competitive-ctf-hero',
    'competitive-ctf-competitor-2019',
    'competitive-ctf-hero-2019',
    'competitive-6v6-elimination-competitor',
    'competitive-6v6-elimination-hero',
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
    // HALLOWEEN18
    'zomnic',
    'zombardier',
    'flaming-pumpkin',
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
    'bicycle-kick',
    // RETRIBUTION18
    'talon-assassin',
    'talon-enforcer',
    'talon-heavy-assault',
    'talon-sniper',
    'talon-trooper',
    'droppachi',
    // CHRISTMAS18
    'frozen-throne',
    'yeti-rage',
    'bonk',
    // LUNAR19
    'captured-flag',
    'interrupted-delivery',
    // ARCHIVES 2019
    'almendron',
    'ambush',
    'big-plans',
    'cut-the-brakes',
    'hot-pursuit',
    'light-the-way',
    'new-strike-team',
    'the-broker',
    'shark-attack',
    'snorkling',
    'sand-castle'
  ],
  allClassEventItems: {
    sprays: {
      [EVENTS.SUMMER]: ['summer-games-2016', 'summer-games', 'goal-blossom', 'safe-hands', 'bicycle-kick', 'sand-castle', 'shark-attack', 'snorkling'],
      [EVENTS.HALLOWEEN]: ['never-die', 'bats', 'boo', 'boop', 'candyball', 'fangs', 'gummy-hog', 'halloween-terror', 'pumpkins', 'witchs-brew', 'halloween-special', 'junkensteins-revenge', 'rise-of-the-zomnics', 'the-reapening', 'my-creations', 'the-monster', 'the-reaper', 'the-witch', 'zomnic', 'zombardier', 'flaming-pumpkin'],
      [EVENTS.WINTER]: ['snowcree', 'snowhog', 'snowmei', 'snowreaper', 'winter-wonderland', 'yeti', 'yeti-hunter', 'frozen-throne', 'yeti-rage', 'bonk'],
      [EVENTS.LUNAR]: ['auspicious-lion', 'awakened-lion', 'dragons-head', 'lucky-pouch', 'red-envelope', 'year-of-the-rooster-2017', 'year-of-the-dog-2018', 'good-fortune', 'captured-flag', 'interrupted-delivery'],
      [EVENTS.UPRISING]: ['b73ns', 'eradicator', 'null-sector', 'nullmari', 'nulltrooper', 'or14ns', 'slicer', 'archives', 'talon-assassin', 'droppachi', 'talon-enforcer', 'talon-heavy-assault', 'talon-sniper', 'talon-trooper', 'almendron', 'ambush', 'big-plans', 'cut-the-brakes', 'hot-pursuit', 'light-the-way', 'new-strike-team', 'the-broker'],
      [EVENTS.ANNIVERSARY]: ['anniversary-2017']
    },
    icons: {
      [EVENTS.SUMMER]: ["summer-games-2016", "summer-games-2017", "summer-games-2018", "summer-games-2019", "meteor", "australia", "brazil", "china", "egypt", "france", "germany", "greece", "japan", "mexico", "nepal", "numbani", "russia", "south-korea", "sweden", "switzerland", "united-kingdom", "united-states-of-america", "argentina", "austria", "belgium", "canada", "denmark", "finland", "ireland", "israel", "italy", "jordan", "netherlands", "new-zealand", "portugal", "romania", "snorkelmari", "spain", "footballmari", "punchimari", "tennismari"],
      [EVENTS.HALLOWEEN]: ["calavera", "vampachimari", "eyeball", "superstition", "witchs-hat", "ghostymari", "tombstone", "bewitching", "candle", "never-die", "wolf", "witchs-brew", "spider", "junkensteins-pachimonster", "pachimummy", "pumpkimari", "skelemari", "witchymari", "kittymari",  "halloween-terror-2016", "halloween-terror-2017", "halloween-terror-2018", "halloween-terror-2019"],
      [EVENTS.WINTER]: ["winter-wonderland-2016", "winter-wonderland-2017", "winter-wonderland-2018", "snowman", "present", "pachimerry", "gingermari", "pachicracker", "snowimari", "2017", "2018", "2019", "holly", "tannenbaum", "bubbly", "gingerbread", "candy-cane", "ornament", "hot-cocoa", "cheers", "wreath", "mochi", "dreidel", "bells", "peppermint", "snow-globe", "pachireindeer", "stocking", "yetimari"],
      [EVENTS.LUNAR]: ["bokimari", "coin", "dragon-dance", "fortune", "fuchimari", "gold", "have-fish", "lantern", "lion-dance", "lucky-pouch", "peachimari", "new-year-cake", "pachilantern", "red-envelope", "seollal", "tangerines", "year-of-the-rooster-2017", "year-of-the-dog-2018", "wuchimari", "huchimari", "paquemari", "paqingmari", "good-fortune", "baihu", "zhuque", "qinglong", "xuanwu", 'guan-yu', 'hong-gildong', 'huang-zhong', 'l-bu', 'piggimari', 'year-of-the-pig-2019', 'zhang-fei', 'zhuge-liang'],
      [EVENTS.UPRISING]: ['archives-2019', 'archives-2018', 'uprising-2017', 'null-sector', 'drop-pod', 'b73ns', 'nullmari', 'assassin', 'enforcer', 'heavy-assault', 'maximilien', 'sniper', 'trooper'],
      [EVENTS.ANNIVERSARY]: ['anniversary-2017', 'anniversary-2018', 'anniversary-2019', 'cupachicake', 'pachiversary'],
    }
  },
  eventItemOverrides: {
    'reaper-american': EVENTS.SUMMER,
    'reinhardt-bundesadler': EVENTS.SUMMER,
    'mei-zhongguo': EVENTS.SUMMER,
    'sombra-demon-hunter': EVENTS.HALLOWEEN,
    'baptiste-vampire': EVENTS.HALLOWEEN,
    'junkrat-inferno': EVENTS.HALLOWEEN
  },
  specialAchievementItems: {
    bcrf: {
      skins: ['mercy-pink'],
      sprays: ['mercy-pink', 'mercy-cure', 'mercy-ribbon', 'mercy-together'],
      icons: ['mercy-pink', 'mercy-ribbon']
    },
    owl: {
      emotes: ['lucio-dance-party'],
      skins: [
        'genji-2018-pacific-allstars',
        'tracer-2018-atlantic-allstars',
        'lucio-2019-pacific-allstars',
        'mercy-2019-atlantic-allstars'
      ]
    }
  },
  noLongerPurchaseableItems: {
    sprays: ['summer-games-2016', 'summer-games-2017', 'summer-games-2018', 'year-of-the-rooster-2017', 'year-of-the-dog-2018']
  }
};

module.exports = data;
