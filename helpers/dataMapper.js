var rawData = rawData ? rawData : `` // Raw data extracted using Overwatch Cosmetic Extractor

var splitRawData = rawData.split('\n')
while (!splitRawData[0].includes("Cosmetics")) { // remove the first few lines
  splitRawData = splitRawData.slice(1)
}

// Remove invalid error keys
splitRawData = splitRawData.map(a => a.includes("Error unknown") ? '\n' : a).join('\n')

var rawDataRegex = /Cosmetics for (.+)(\n.+)*/gm // Match each heros items
var itemGroupRegex = /\t(.+)(\n\t{2}.+)*/g // Match each group of items for a hero
var data = []
var heroMatch
while ((heroMatch = rawDataRegex.exec(splitRawData)) !== null) {
  var rawItems = heroMatch[0].split('\n').slice(1).join('\n')
  var items = []
  var itemMatch
  while ((itemMatch = itemGroupRegex.exec(rawItems)) !== null) {
    items.push({
      group: itemMatch[1].split(' ')[0], // ACHIVEMENT, STANDARD_COMMON, COMMON, EVENTS
      items: itemMatch[0].split('\n').slice(1).map(a => a.trim())
    })
  }
  data.push({ hero: heroMatch[1], items })
}

var getClassForHero = hero => {
  switch (hero) {
    case "genji":
    case "mccree":
    case "pharah":
    case "reaper":
    case "soldier: 76":
    case "sombra":
    case "tracer":
      return "Assault"
    case "bastion":
    case "hanzo":
    case "junkrat":
    case "mei":
    case "torbjörn":
    case "widowmaker":
      return "Defence"
    case "d.va":
    case "reinhardt":
    case "roadhog":
    case "winston":
    case "zarya":
      return "Tank"
    case "ana":
    case "lúcio":
    case "mercy":
    case "symmetra":
    case "zenyatta":
      return "Support"
    default:
      return "Unknown"
  }
}

var getCleanID = (what, hero) => {
  return (hero ? `${hero}-` : '') + what.toLowerCase().replace(/[öô]/g, 'o').replace('ú', 'u').replace('çã', 'ca').replace(/[^a-zA-Z 0-9]/g, '').replace(/ /g, '-')
}

var stupidNames = {
  "^_^": "joy",
  ">_<": "frustration",
  ";)": "winky-face"
}

var qualities = ['common', 'epic', 'rare', 'legendary']
var types = [
  { m: 'skin', name: 'skins' },
  { m: 'icon', name: 'icons' },
  { m: 'spray', name: 'sprays' },
  { m: 'emote', name: 'emotes' },
  { m: 'voice line', name: 'voicelines' },
  { m: 'victory pose', name: 'poses' },
  { m: 'heroic intro', name: 'intros' }
  //, { m: 'weapon skin', name: 'weapons' } // Golden
]
var matches = {} // Generate a match for each quality for every type of item
types.forEach(t => {
  qualities.forEach(q => matches[`${q} ${t.m}`] = { quality: q, type: t.name })
})

var getType = type => {
  let m = matches[type.toLowerCase()]
  if (!m) {
    console.warn("Unknown type?", type)
    return {}
  }
  return m
}

// http://stackoverflow.com/a/1359808
// Makes it so it JSON.stringify's in order
var sortObject = o => {
  var sorted = {}, key, a = []
  for (key in o) {
    if (o.hasOwnProperty(key)) a.push(key)
  }
  a.sort()
  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]]
  }
  return sorted
}

var EVENTS = {
  SUMMER16: 'SUMMER_GAMES_2016',
  HALLOWEEN16: 'HALLOWEEN_2016',
  CHRISTMAS16: 'WINTER_WONDERLAND_2016',
  ROOSTER17: 'YEAR_OF_THE_ROOSTER_2017'
}

var heroes = {}
data.forEach(({ hero, items: itemGroups }) => {
  var heroID = getCleanID(hero)
  var heroData = {
    name: hero,
    class: getClassForHero(hero.toLowerCase()),
    id: heroID,
    items: {
      skins: [],
      emotes: [],
      intros: [],
      icons: [],
      sprays: [],
      voicelines: [],
      poses: []
    }
  }
  itemGroups.forEach(({ group, items }) => {
    items.forEach(item => {
      var [str, name, type] = item.match(/(.+) \((.+)\)/) //eslint-disable-line
      name = name.trim()
      if (name == 'RANDOM') return
      var id = getCleanID(name, heroID)
      id = id && id.length ? id : stupidNames[name] || "UNDEFINED"
      var { quality, type: itemType } = getType(type)
      if (!quality || !itemType) return
      var out = { name, id, quality: quality }
      switch (group) {
        case 'COMMON':
          break;
        case 'ACHIEVEMENT':
          out.achievement = true
          break;
        case 'STANDARD_COMMON':
          out.standardItem = true
          break;
        default:
          out.event = group
          break;
      }
      heroData.items[itemType].push(out)
    })
  })
  heroes[heroID] = heroData
})
heroes = sortObject(heroes)

var getImageURL = (type, event, id) => {
  var baseUrl = `./resources/updates/${event}/${type}/${id}`
  switch (type) {
    case 'emotes':
    case 'intros':
      return `${baseUrl}.webm`
    case 'sprays':
    case 'icons':
      return `${baseUrl}.png`
    case 'skins':
    case 'skinsEpic':
    case 'skinsLegendary':
    case 'poses':
      return `${baseUrl}.jpg`
  }
}

var allClassItems = {
  'sprays': {
    [EVENTS.SUMMER16]: ['Summer Games'],
    [EVENTS.HALLOWEEN16]: ['...Never Die', 'Bats', 'Boo!', 'Boop!', 'Candyball', 'Fangs', 'Gummy Hog', 'Halloween Terror 2016', 'Pumpkins', 'Witch\'s Brew'],
    [EVENTS.CHRISTMAS16]: ['SnowCree', 'SnowHog', 'SnowMei', 'SnowReaper', ['Winter Wonderland']],
    [EVENTS.ROOSTER17]: ['Auspicious Lion', 'Awakened Lion', ['Dragon\'s Head'], ['Lucky Pouch'], ['Red Envelope'], ['Year of the Rooster']]
  },
  icons: {
    [EVENTS.SUMMER16]: ["Summer Games","Australia", "Brazil", "China", "Egypt", "France", "Germany", "Greece", "Japan", "Mexico", "Nepal", "Numbani", "Russia", "South Korea", "Sweden", "Switzerland", "United Kingdom", "United States"],
    [EVENTS.HALLOWEEN16]: ["Halloween Terror", "...Never Die", "Bewitching", "Calavera", "Candle", "Eyeball", "Ghostymari", "Spider", "Superstition", "Tombstone", "Vampachimari", "Witch's Brew", "Witch's Hat", "Wolf"],
    [EVENTS.CHRISTMAS16]: ["Winter Wonderland", "Snowman", "Present", "Pachimerry", "Gingermari", "2017", "Holly", "Tannenbaum", "Bubbly", "Gingerbread", "Candy Cane", "Ornament", "Hot Cocoa", "Cheers!", "Wreath", "Mochi", "Dreidel", "Bells", "Peppermint", "Snow Globe", "Pachireindeer", "Stocking"],
    [EVENTS.ROOSTER17]: ["Bokimario", "Coin", "Dragon Dance", "Fuchimari", "Gold", "Have Fish", "Lantern", "Lion Dance", "Lord of Candy", "Lucky Pouch", "Lunamari", "New Year Cake", "Pachilantern", "Piggy", "Red Envelope", "Seollal", "Tangerines", "Year of the Rooster"]
  }
}

// Go through every heros items and create a seperate object containing every item added in events
var updates = {}
Object.keys(heroes).forEach(hKey => {
  var hero = heroes[hKey]
  Object.keys(hero.items).forEach(tKey => {
    var items = hero.items[tKey]
    items.forEach(item => {
      var event = item.event
      var type = tKey == 'skins' ? (item.quality == 'legendary' ? 'skinsLegendary' : (item.quality == 'epic' ? 'skinsEpic' : 'skins')) : tKey
      if (!event) return
      if (!updates[event]) updates[event] = {}
      if (!updates[event][type]) updates[event][type] = []
      var legend = (tKey != 'skins' && item.quality == 'legendary') ? { legendary: true } : {}
      var u = getImageURL(type, event, item.id)
      var url = type == 'voice' ? {} : ((type == 'emotes' || type == 'intros') ? { video: u } : { img: u })
      var newItem = Object.assign({}, { hero: hero.name }, legend, item, url )
      if (type == 'icons') {
        delete newItem.hero
        delete newItem.quality
      }
      delete newItem.event
      updates[event][type].push(newItem)
    })
  })
})

// Add ornament ids to normal sprays
updates[EVENTS.CHRISTMAS16].sprays = updates[EVENTS.CHRISTMAS16].sprays.map(spray => {
  if (spray.hero) {
    var ornamentID = `${getCleanID(spray.hero)}-ornament`
    spray.ornamentID = ornamentID;
    spray.ornamentURL = getImageURL('sprays', EVENTS.CHRISTMAS16, ornamentID);
    return spray
  } else return spray
}).filter(Boolean)

// Add dragon dance ids to normal sprays
updates[EVENTS.ROOSTER17].sprays = updates[EVENTS.ROOSTER17].sprays.map(spray => {
  if (spray.hero) {
    var dragonID = `${getCleanID(spray.hero)}-dragon-dance`
    spray.dragonID = dragonID;
    spray.dragonURL = getImageURL('sprays', EVENTS.ROOSTER17, dragonID);
    return spray
  } else return spray
}).filter(Boolean)

// Add allclass items (which aren't detected by item extrator) manually
Object.keys(allClassItems).forEach(type => {
  Object.keys(allClassItems[type]).forEach(event => {
    allClassItems[type][event].forEach(item => {
      var isSpecial = typeof item == 'object'
      var itemID = getCleanID(isSpecial ? item[0] : item)
      var out = {
        name: isSpecial ? item[0] : item,
        id: itemID,
        img: getImageURL(type, event, itemID)
      }
      if (type == 'sprays' && isSpecial) {
        Object.assign(out, { quality: 'common' })
      }
      updates[event][type].push(out)
    })
  })
})

// Sort that shit by hero or item name
Object.keys(updates).forEach(update => {
  Object.keys(updates[update]).forEach(type => {
    updates[update][type].sort((a, b) => {
      switch (type) {
        case 'voicelines':
        case 'sprays':
          if (a.hero < b.hero) return -1;
          if (a.hero > b.hero || !a.hero) return 1;
          return 0;
        default:
          if (a.name < b.name) return -1;
          if (a.name > b.name || !a.hero) return 1;
          return 0;
      }
    })
  })
})

function copyUpdates() { //eslint-disable-line
  copy(JSON.stringify(updates, null, 2))
}
function copyHeroes() { //eslint-disable-line
  copy(JSON.stringify(heroes, null, 2))
}

console.log("HEROES: ", heroes)
console.log("UPDATES:", updates)
