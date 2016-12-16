var rawData = `` // Raw data extracted using Overwatch Cosmetic Extractor

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
  { m: 'voice line', name: 'voice' },
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
  CHRISTMAS16: 'WINTER_WONDERLAND_2016'
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
      voice: [],
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
        case EVENTS.SUMMER16:
        case EVENTS.HALLOWEEN16:
        case EVENTS.CHRISTMAS16:
          out.event = group
          break;
        case 'ACHIEVEMENT':
          out.achievement = true
          break;
        case 'STANDARD_COMMON':
          out.standardItem = true
          break;
      }
      heroData.items[itemType].push(out)
    })
  })
  heroes[heroID] = heroData
})
heroes = sortObject(heroes)

var getImageURL = (type, event, id) => {
  var baseUrl = `./resources/${event}/${type}/${id}`
  switch (type) {
    case 'emotes':
    case 'intros':
      return `${baseUrl}.webm`
    case 'sprays':
      if (event === EVENTS.CHRISTMAS16) return `${baseUrl}.png`
      return `${baseUrl}.jpg`
    case 'skins':
    case 'skinsEpic':
    case 'skinsLegendary':
    case 'icons':
    case 'poses':
      return `${baseUrl}.jpg`
  }
}

var allClassItems = {
  'sprays': {
    [EVENTS.SUMMER16]: ['Summer Games'],
    [EVENTS.HALLOWEEN16]: ['...Never Die', 'Bats', 'Boo!', 'Boop!', 'Candyball', 'Fangs', 'Gummy Hog', 'Halloween Terror 2016', 'Pumpkins', 'Witch\'s Brew'],
    [EVENTS.CHRISTMAS16]: ['SnowCree', 'SnowHog', 'SnowMei', 'SnowReaper', 'Winter Wonderland']
  },
  icons: {
    [EVENTS.SUMMER16]: ["Summer Games","Australia", "Brazil", "China", "Egypt", "France", "Germany", "Greece", "Japan", "Mexico", "Nepal", "Numbani", "Russia", "South Korea", "Sweden", "Switzerland", "United Kingdom", "United States"],
    [EVENTS.HALLOWEEN16]: ["Halloween Terror", "...Never Die", "Bewitching", "Calavera", "Candle", "Eyeball", "Ghostymari", "Spider", "Superstition", "Tombstone", "Vampachimari", "Witch's Brew", "Witch's Hat", "Wolf"],
    [EVENTS.CHRISTMAS16]: ["Winter Wonderland", "Snowman", "Present", "Pachimerry", "Gingermari", "2017", "Holly", "Tannenbaum", "Bubbly", "Gingerbread", "Candy Cane", "Ornament", "Hot Cocoa", "Cheers!", "Wreath", "Mochi", "Dreidel", "Bells", "Peppermint", "Snow Globe", "Pachireindeer", "Stocking"]
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
      var url = getImageURL(type, event, item.id)
      var legend = (tKey != 'skins' && item.quality == 'legendary') ? { legendary: true } : {}
      var newItem = Object.assign({}, { hero: hero.name }, legend, item, type == 'voice' ? {} : ((type == 'emotes' || type == 'intros') ? { video: url } : { img: url }))
      delete newItem.event
      updates[event][type].push(newItem)
    })
  })
})

// Add allclass items (which aren't detected by item extrator) manually
Object.keys(allClassItems).forEach(type => {
  Object.keys(allClassItems[type]).forEach(event => {
    allClassItems[type][event].forEach(item => {
      var itemID = getCleanID(item)
      updates[event][type].push({
        name: item,
        id: itemID,
        img: getImageURL(type, event, itemID),
        allClass: true
      })
    })
  })
})

// Sort that shit by hero or item name
Object.keys(updates).forEach(update => {
  Object.keys(updates[update]).forEach(type => {
    updates[update][type].sort((a, b) => {
      switch (type) {
        case 'voice':
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

// Delete ornament sprays
updates[EVENTS.CHRISTMAS16].sprays = updates[EVENTS.CHRISTMAS16].sprays.map(spray => {
  return spray.name.toLowerCase() == 'ornament' ? null : spray
}).filter(Boolean)

console.log("HEROES: ", heroes)
console.log("UPDATES:", updates)
