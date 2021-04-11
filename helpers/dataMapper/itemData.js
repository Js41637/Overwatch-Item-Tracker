const {
  EVENTS
} = require('./EVENTDATA');

// All class items have no attributes provided so we need to manually add them
// ids correlate to item ids.
const data = {
  owlTeams: ['atlanta-reign', 'boston-uprising', 'chengdu-hunters', 'dallas-fuel', 'florida-mayhem', 'guangzhou-charge', 'hangzhou-spark', 'houston-outlaws', 'london-spitfire', 'los-angeles-gladiators', 'los-angeles-valiant', 'new-york-excelsior', 'overwatch-league', 'paris-eternal', 'philadelphia-fusion', 'san-francisco-shock', 'seoul-dynasty', 'shanghai-dragons', 'toronto-defiant', 'vancouver-titans', 'washington-justice'],

  // Changes IDs and Names will eventually be fixed with a data migration.
  idsBlizzardChanged: {
    "sprays/mccree-bad-luck": "mccree-noose",
    "sprays/sombra-hax0red": "sombra-deafmute",
    "sprays/hanzo-brickstrike": "hanzo-brick-dragon",
    "sprays/year-of-the-dog": "year-of-the-dog-2018",
    "sprays/year-of-the-rooster": "year-of-the-rooster-2017",
    "sprays/year-of-the-rat": "year-of-the-rat-2020",
    "sprays/year-of-the-ox": "year-of-the-ox-2021",
    "sprays/junkrat-hayseed": "junkrat-scarecrow",
    "skins/junkrat-bilgerat": "junkrat-buccaneer",
    "sprays/anniversary": "anniversary-2017",
    "voicelines/moira-slainte": "moira-slinte",
    "voicelines/brigitte-its-broken": "brigitte-this-is-pie",
    "sprays/saurfang": "varok",
    "sprays/watchparty-gibraltar": "watchpoint-gibraltar",
    "icons/2018-pacific-allstars": "pacific-allstars-2018",
    "icons/2018-atlantic-allstars": "atlantic-allstars-2018",
    "icons/path-to-pro-2019": "path-to-pro",
    "icons/reaper-imperial-guard": "reaper-imperial",

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
    "icons/competitive-team-deathmatch-hero-2018": "competitive-team-deathmatch-hero",

    "sprays/open-queue-season-1-competitor": "competitive-open-queue-competitor",
    "sprays/open-queue-season-1-hero": "competitive-open-queue-hero",
    "icons/open-queue-season-1-competitor": "competitive-open-queue-competitor",
    "icons/open-queue-season-1-hero": "competitive-open-queue-hero"
  },
  itemNamesIFuckedUp: {
    "voicelines/reinhardt-100-german-power": "100% German power"
  },
  badNames: {
    '>_\\<': ">_<"
  },
  defaultItems: {
    sprays: ['logo', 'you-are-not-prepared', 'da-de-los-muertos'],
    icons: ['overwatch-light', 'overwatch-dark', 'you-are-not-prepared'],
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
      'archer',
      // kensaka challenge thing
      "bath-time",
      "catchamari",
      "pawttery",
      "shrine-district",
      "tato-takes-off",
      "the-dragon-consumes",
      'blizzards-30th-anniversary'
    ],
    icons: [
      // Diablo
      'dark-wanderer',
      // WoW
      'kul-tiras',
      'zandalar',
      'blizzards-30th-anniversary'
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
      icons: ['inaugural-season', 'pacific-allstars-2018', 'atlantic-allstars-2018', '2019-atlantic-allstars', '2019-pacific-allstars', 'grand-finals-2019'],
      sprays: ['inaugural-season', '1-fan', 'living-room', 'matchs-on', 'watchpoint-gibraltar', "watching-ball", "tailgate"]
    }
  },
  achievementSprays: [
    'path-to-pro-2019',
    'path-to-pro-2020',
    'path-to-pro-2021',
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
    'sand-castle',
    // CHRISTMAS19
    'ice-spheres',
    'mountain-man',
    'jotunn',
    // ARCHIVES20
    'aggressive',
    'blood-moon-rising',
    'carry',
    'deadeye-strike',
    'detonated',
    'feeling-invincible',
    // SUMMER20
    'header',
    'goalkeeper',
    'surfimari',
    'golfimari',
    'baseballmari',
    // HALLOWEEN20
    'frenzied-stampede',
    'quickdraw',
    'zombarded',
    'viking-fury',
    'uncanny-speed',
    'red-riding-hunt',
    // CHRISTMAS20
    'cookie-throw',
    'frozen-elf',
    'mutual-thaw',
    // LUNAR2021
    "not-so-fast-outlaw",
    "quick-on-the-draw",
    "pay-up",
    // ARCHIVES21
    'not-part-of-the-plan',
    'highvalue-target',
    'overworked',
  ],
  allClassEventItems: {
    sprays: {
      [EVENTS.SUMMER]: ['summer-games-2016', 'summer-games', 'goal-blossom', 'safe-hands', 'bicycle-kick', 'sand-castle', 'shark-attack', 'snorkling', 'goalkeeper', 'header'],
      [EVENTS.HALLOWEEN]: ['never-die', 'bats', 'boo', 'boop', 'candyball', 'fangs', 'gummy-hog', 'halloween-terror', 'pumpkins', 'witchs-brew', 'halloween-special', 'junkensteins-revenge', 'rise-of-the-zomnics', 'the-reapening', 'my-creations', 'the-monster', 'the-reaper', 'the-witch', 'zomnic', 'zombardier', 'flaming-pumpkin', 'frenzied-stampede', 'quickdraw', 'zombarded', 'viking-fury', 'uncanny-speed', 'red-riding-hunt', 'vengeful-ghost', 'halloween-elite'],
      [EVENTS.WINTER]: ['snowcree', 'snowhog', 'snowmei', 'snowreaper', 'winter-wonderland', 'yeti', 'yeti-hunter', 'frozen-throne', 'yeti-rage', 'bonk', 'holiday-surprise', 'ice-spheres', 'jotunn', 'mountain-man', 'polar-bear', 'snow-snow-snow', 'cookie-throw', 'frozen-elf', 'mutual-thaw'],
      [EVENTS.LUNAR]: ['auspicious-lion', 'awakened-lion', 'dragons-head', 'lucky-pouch', 'red-envelope', 'year-of-the-rooster-2017', 'year-of-the-dog-2018', 'good-fortune', 'captured-flag', 'interrupted-delivery', 'year-of-the-rat-2020', 'year-of-the-ox-2021', 'not-so-fast-outlaw', 'pay-up', 'quick-on-the-draw'],
      [EVENTS.UPRISING]: ['b73ns', 'eradicator', 'null-sector', 'nullmari', 'nulltrooper', 'or14ns', 'slicer', 'archives', 'talon-assassin', 'droppachi', 'talon-enforcer', 'talon-heavy-assault', 'talon-sniper', 'talon-trooper', 'almendron', 'ambush', 'big-plans', 'cut-the-brakes', 'hot-pursuit', 'light-the-way', 'new-strike-team', 'the-broker', 'aggressive', 'blood-moon-rising', 'carry', 'deadeye-strike', 'detonated', 'feeling-invincible', 'strike', 'not-part-of-the-plan', 'highvalue-target', 'overworked'],
      [EVENTS.ANNIVERSARY]: ['anniversary-2017', 'fast', 'feast']
    },
    icons: {
      [EVENTS.SUMMER]: ["summer-games-2016", "summer-games-2017", "summer-games-2018", "summer-games-2019", "summer-games-2020", "meteor", "australia", "brazil", "china", "egypt", "france", "germany", "greece", "japan", "mexico", "nepal", "numbani", "russia", "south-korea", "sweden", "switzerland", "united-kingdom", "united-states-of-america", "argentina", "austria", "belgium", "canada", "denmark", "finland", "ireland", "israel", "italy", "jordan", "netherlands", "new-zealand", "portugal", "romania", "snorkelmari", "spain", "footballmari", "punchimari", "tennismari", 'baseballmari', 'golfimari', 'surfimari'],
      [EVENTS.HALLOWEEN]: ["calavera", "vampachimari", "eyeball", "superstition", "witchs-hat", "ghostymari", "tombstone", "bewitching", "candle", "never-die", "wolf", "witchs-brew", "spider", "junkensteins-pachimonster", "pachimummy", "pumpkimari", "skelemari", "witchymari", "kittymari", "halloween-terror-2016", "halloween-terror-2017", "halloween-terror-2018", "halloween-terror-2019", 'clownmari', 'halloween-terror-2020'],
      [EVENTS.WINTER]: ["winter-wonderland-2016", "winter-wonderland-2017", "winter-wonderland-2018", "winter-wonderland-2019", "snowman", "present", "pachimerry", "gingermari", "pachicracker", "snowimari", "2017", "2018", "2019", "2020", "2021", "end-of-2020", "winter-wonderland-2020", "holly", "tannenbaum", "bubbly", "gingerbread", "candy-cane", "ornament", "hot-cocoa", "cheers", "wreath", "mochi", "dreidel", "bells", "peppermint", "snow-globe", "pachireindeer", "stocking", "yetimari"],
      [EVENTS.LUNAR]: ["bokimari", "coin", "dragon-dance", "fortune", "fuchimari", "gold", "have-fish", "lantern", "lion-dance", "lucky-pouch", "peachimari", "new-year-cake", "pachilantern", "red-envelope", "seollal", "tangerines", "year-of-the-rooster-2017", "year-of-the-dog-2018", "wuchimari", "huchimari", "paquemari", "paqingmari", "good-fortune", "baihu", "zhuque", "qinglong", "xuanwu", 'guan-yu', 'hong-gildong', 'huang-zhong', 'l-bu', 'piggimari', 'year-of-the-pig-2019', 'zhang-fei', 'zhuge-liang', 'year-of-the-rat-2020', 'year-of-the-ox-2021',],
      [EVENTS.UPRISING]: ['archives-2021', 'archives-2020', 'archives-2019', 'archives-2018', 'uprising-2017', 'null-sector', 'drop-pod', 'b73ns', 'nullmari', 'assassin', 'enforcer', 'heavy-assault', 'maximilien', 'sniper', 'trooper'],
      [EVENTS.ANNIVERSARY]: ['anniversary-2017', 'anniversary-2018', 'anniversary-2019', 'anniversary-2020', 'fanous', 'cupachicake', 'pachiversary'],
    }
  },
  eventItemOverrides: {
    'skins/reaper-american': EVENTS.SUMMER,
    'skins/reinhardt-bundesadler': EVENTS.SUMMER,
    'skins/mei-zhongguo': EVENTS.SUMMER,
    'skins/sombra-demon-hunter': EVENTS.HALLOWEEN,
    'icons/sombra-demon-hunter': EVENTS.HALLOWEEN,
    'sprays/sombra-demon-hunter': EVENTS.HALLOWEEN,
    'icons/baptiste-vampire': EVENTS.HALLOWEEN,
    'icons/junkrat-inferno': EVENTS.HALLOWEEN,
    'sprays/junkrat-inferno': EVENTS.HALLOWEEN,
    'skins/baptiste-vampire': EVENTS.HALLOWEEN,
    'sprays/baptiste-vampire': EVENTS.HALLOWEEN,
    'skins/junkrat-inferno': EVENTS.HALLOWEEN,
    'skins/mercy-snow-angel': EVENTS.WINTER,
    'icons/mercy-snow-angel': EVENTS.WINTER,
    'sprays/mercy-winter-spell': EVENTS.WINTER,
    'skins/moira-holly': EVENTS.WINTER,
    'icons/moira-coinn-nollag': EVENTS.WINTER,
    'sprays/moira-presents': EVENTS.WINTER,
    'skins/soldier-76-ugly-sweater-76': EVENTS.WINTER,
    'icons/soldier-76-ugly-sweater': EVENTS.WINTER,
    'sprays/soldier-76-ugly-sweater': EVENTS.WINTER,

    'skins/doomfist-monk': EVENTS.LUNAR,
    'sprays/doomfist-focus': EVENTS.LUNAR,
    'icons/doomfist-jingang': EVENTS.LUNAR,
    'skins/winston-ancient-bronze': EVENTS.LUNAR,
    'sprays/winston-ancient-bronze': EVENTS.LUNAR,
    'icons/winston-ancient-bronze': EVENTS.LUNAR,
    'skins/wrecking-ball-paper-cutting': EVENTS.LUNAR,
    'sprays/wrecking-ball-spring': EVENTS.LUNAR,
    'icons/wrecking-ball-rat': EVENTS.LUNAR,

    'skins/symmetra-holi': EVENTS.UPRISING,
    'sprays/symmetra-holi': EVENTS.UPRISING,
    'icons/symmetra-holi': EVENTS.UPRISING,
    'icons/torbjorn-rustclad': EVENTS.UPRISING,
    'sprays/torbjorn-indigestion': EVENTS.UPRISING,
    'skins/torbjorn-rustclad': EVENTS.UPRISING,
    'icons/mei-snowbear': EVENTS.UPRISING,
    'sprays/mei-bear-hug': EVENTS.UPRISING,
    'skins/mei-bear': EVENTS.UPRISING,

    'skins/widowmaker-fleur-de-lis': EVENTS.ANNIVERSARY,
    'icons/widowmaker-fleur-de-lis': EVENTS.ANNIVERSARY,
    'sprays/widowmaker-fleur-de-lis': EVENTS.ANNIVERSARY,
    'skins/sigma-carbon-fiber': EVENTS.ANNIVERSARY,
    'icons/sigma-carbon-fiber': EVENTS.ANNIVERSARY,
    'sprays/sigma-carbon-fiber': EVENTS.ANNIVERSARY,
    'skins/mccree-masked-man': EVENTS.ANNIVERSARY,
    'icons/mccree-masked-man': EVENTS.ANNIVERSARY,
    'sprays/mccree-masked-man': EVENTS.ANNIVERSARY,

    'sprays/tracer-union-jack': EVENTS.SUMMER,
    'skins/tracer-union-jack': EVENTS.SUMMER,
    'sprays/bastion-sand-castle': EVENTS.SUMMER,
    'skins/bastion-sand-castle': EVENTS.SUMMER,
    'sprays/orisa-ice-cream': EVENTS.SUMMER,
    'skins/orisa-ice-cream': EVENTS.SUMMER,
    'icons/surfimari': EVENTS.SUMMER,
    'icons/golfimari': EVENTS.SUMMER,
    'icons/baseballmari': EVENTS.SUMMER,

    'skins/sombra-fantasma': EVENTS.HALLOWEEN,
    'icons/sombra-fantasma': EVENTS.HALLOWEEN,
    'sprays/sombra-fantasma': EVENTS.HALLOWEEN,
    'skins/brigitte-stone': EVENTS.HALLOWEEN,
    'icons/brigitte-stone': EVENTS.HALLOWEEN,
    'sprays/brigitte-stone': EVENTS.HALLOWEEN,
    'skins/echo-ragdoll': EVENTS.HALLOWEEN,
    'icons/echo-ragdoll': EVENTS.HALLOWEEN,
    'sprays/echo-ragdoll': EVENTS.HALLOWEEN,

    'skins/junkrat-elf': EVENTS.WINTER,
    'icons/junkrat-elf': EVENTS.WINTER,
    'sprays/junkrat-elf': EVENTS.WINTER,
    'skins/ana-gingerbread': EVENTS.WINTER,
    'icons/ana-gingerbread': EVENTS.WINTER,
    'sprays/ana-gingerbread': EVENTS.WINTER,
    'skins/roadhog-frosty': EVENTS.WINTER,
    'icons/roadhog-frosty': EVENTS.WINTER,
    'sprays/roadhog-frosty': EVENTS.WINTER,

    'skins/baptiste-terracotta-medic': EVENTS.LUNAR,
    'icons/baptiste-stonefaced': EVENTS.LUNAR,
    'sprays/baptiste-terracotta-squad': EVENTS.LUNAR,
    'skins/mccree-xiake': EVENTS.LUNAR,
    'icons/mccree-wanderer': EVENTS.LUNAR,
    'sprays/mccree-gunsmoke': EVENTS.LUNAR,
    'skins/reaper-imperial-guard': EVENTS.LUNAR,
    'icons/reaper-imperial': EVENTS.LUNAR,
    'sprays/reaper-siwang': EVENTS.LUNAR,

    'skins/lucio-corredor': EVENTS.UPRISING,
    'icons/lucio-corredor': EVENTS.UPRISING,
    'sprays/lucio-turn-up-the-heat': EVENTS.UPRISING,
    'skins/zenyatta-subaquatic': EVENTS.UPRISING,
    'icons/zenyatta-subaquatic': EVENTS.UPRISING,
    'sprays/zenyatta-deep-in-thought': EVENTS.UPRISING,
    'skins/mercy-camouflage': EVENTS.UPRISING,
    'icons/mercy-camouflage': EVENTS.UPRISING,
    'sprays/mercy-night-mission': EVENTS.UPRISING,
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
        'mercy-2019-atlantic-allstars',
        'dva-2020-pacific-allstars',
        'reinhardt-2020-atlantic-allstars',
        'brigitte-goat',
        'doomfist-thunder',
        'winston-flying-ace',
        'zenyatta-zen-nakji',
        'zarya-alien',
        'roadhog-midas',
        'echo-good-and-evil'
      ]
    }
  },
  noLongerPurchaseableItems: {
    sprays: ['summer-games-2016', 'summer-games-2017', 'summer-games-2018', 'year-of-the-rooster-2017', 'year-of-the-dog-2018', 'year-of-the-rat-2020', 'year-of-the-ox-2021']
  }
};

module.exports = data;
