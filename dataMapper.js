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

var getCleanID = name => name.toLowerCase().replace(/[öô]/g, 'o').replace('ú', 'u').replace('çã', 'ca').replace(/[^a-zA-Z 0-9]/g, '').replace(/ /g, '-')

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
      var id = getCleanID(name)
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

var getImageExtension = (type, event) => {
  switch (type) {
    case 'emotes':
    case 'intros':
      return '.webm'
    case 'sprays':
      if (event === EVENTS.CHRISTMAS16) return '.png'
      return '.jpg'
    case 'skins':
    case 'icons':
    case 'poses':
      return '.jpg'
  }
}

var updates = {}
Object.keys(heroes).forEach(hKey => {
  var hero = heroes[hKey]
  Object.keys(hero.items).forEach(tKey => {
    var items = hero.items[tKey]
    items.forEach(item => {
      var event = item.event
      if (!event) return
      if (!updates[event]) updates[event] = {}
      if (!updates[event][tKey]) updates[event][tKey] = []
      var url = `./resources/${event}/${tKey}/${item.id}${getImageExtension(tKey, event)}`
      var newItem = Object.assign({}, { hero: hKey }, item, tKey == 'voice' ? {} : ((tKey == 'emotes' || tKey == 'intros') ? { video: url } : { img: url }))
      delete newItem.event
      updates[event][tKey].push(newItem)
    })
  })
})

console.log("HEROES: ", heroes)
console.log("UPDATES:", updates)
