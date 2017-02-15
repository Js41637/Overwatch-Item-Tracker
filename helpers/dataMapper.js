const fs = require('fs')
const { forEach } = require('lodash')
const { EVENTS, EVENTNAMES, EVENTTIMES } = require('./dataMapper/EVENTDATA.js')
const { getCleanID, getClassForHero, getItemType, getImageURL, sortObject } = require('./dataMapper/helpers.js')

var rawData
try {
  rawData = fs.readFileSync(`${__dirname}/rawData.txt`, "utf8")
} catch (e) {
  console.error("Error reading ./rawData.txt")
  return
}

// Load allClassItems data
var allClassData
try {
  allClassData = fs.readFileSync(`${__dirname}/../data/allClassItems.json`, 'utf8')
} catch (e) {
  console.error("Error reading ../data/allClassItems.json")
  return
}

var data = []
const itemGroupRegex = /\t(.+)(\n\t{2}.+)*/g
const heroGroups = rawData.split('\n').filter(a => !a.includes("Error unknown")).join('\n').split('\n\n')
heroGroups.forEach(heroData => {
  let hero = heroData.split('\n')[0].split(' ').slice(2).join(' ') // name of hero
  let rawItems = heroData.split('\n').slice(1).join('\n') // remove the first line containing name of hero
  var items = {}, itemMatch;
  while ((itemMatch = itemGroupRegex.exec(rawItems)) !== null) { // Regex each group and it's items
    items[itemMatch[1].split(' ')[0]] = itemMatch[0].split('\n').slice(1).map(a => a.trim())
  }
  data.push({ hero, items })
})

// Can't generate IDs off these names can we :)
const stupidNames = {
  "^_^": "joy",
  ">_\\<": "frustration",
  ";)": "winky-face"
}

// Blizzard changed the names of these items thus changing their IDs,
// I will eventually run a migration that fixes these but for now I will manually fix
// NOTE: the reason these two IDs changed is because they are dupes of existing items
const originalIDs = {
  "skins/mercy-fortune": "mercy-golden",
  "icons/roadhog-pigsy": "roadhog-piggy"
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

  forEach(itemGroups, (items, group) => {
    items.forEach(item => {
      var [str, name, type] = item.match(/(.+) \((.+)\)/) //eslint-disable-line
      name = name.trim()
      if (name == 'RANDOM') return
      var id = getCleanID(stupidNames[name] || name, heroID)
      var { quality, type: itemType } = getItemType(type)
      id = originalIDs[`${itemType}/${id}`] || id
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

// allClassItems need to be manually added as allClass data isnt included in the rawData
// Items surrounded by [] means they are not purchasable
var allClassItems = {
  'sprays': {
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

// Go through every heros items and create a seperate object containing every item added in events
var updates = {}
forEach(heroes, hero => {
  forEach(hero.items, (items, tKey) => {
    items.forEach(item => {
      var event = item.event
      var type = tKey == 'skins' ? (item.quality == 'legendary' ? 'skinsLegendary' : (item.quality == 'epic' ? 'skinsEpic' : 'skins')) : tKey
      if (!event) return
      if (!updates[event]) updates[event] = {
        order: Object.keys(EVENTNAMES).indexOf(event),
        name: EVENTNAMES[event],
        id: event,
        dates: EVENTTIMES[event],
        items: {}
      }
      if (!updates[event].items[type]) updates[event].items[type] = []
      var legend = (tKey != 'skins' && item.quality == 'legendary') ? { legendary: true } : {}
      var u = getImageURL(type, event, item.id)
      var url = type == 'voice' ? {} : ((type == 'emotes' || type == 'intros') ? { video: u } : { img: u })
      var newItem = Object.assign({}, { hero: hero.name }, legend, item, url )
      if (type == 'icons') {
        delete newItem.hero
        delete newItem.quality
      }
      delete newItem.event
      updates[event].items[type].push(newItem)
    })
  })
})

// Add ornament ids to normal sprays
updates[EVENTS.CHRISTMAS16].items.sprays = updates[EVENTS.CHRISTMAS16].items.sprays.map(spray => {
  if (spray.hero) {
    var ornamentID = `${getCleanID(spray.hero)}-ornament`
    spray.ornamentID = ornamentID;
    spray.ornamentURL = getImageURL('sprays', EVENTS.CHRISTMAS16, ornamentID);
    return spray
  } else return spray
}).filter(Boolean)

// Add dragon dance ids to normal sprays
updates[EVENTS.ROOSTER17].items.sprays = updates[EVENTS.ROOSTER17].items.sprays.map(spray => {
  if (spray.hero) {
    var dragonID = `${getCleanID(spray.hero)}-dragon-dance`
    spray.dragonID = dragonID;
    spray.dragonURL = getImageURL('sprays', EVENTS.ROOSTER17, dragonID);
    return spray
  } else return spray
}).filter(Boolean)

// Add allclass items (which aren't detected by item extrator) manually
forEach(allClassItems, (types, type) => {
  forEach(types, (events, event) => {
    events.forEach(item => {
      var isSpecial = typeof item == 'object'
      var itemID = getCleanID(isSpecial ? item[0] : item)
      var out = {
        name: isSpecial ? item[0] : item,
        id: itemID,
        img: getImageURL(type, event, itemID)
      }
      if (type == 'sprays' && !isSpecial) {
        Object.assign(out, { quality: 'common' })
      }
      updates[event].items[type].push(out)
    })
  })
})

// Sort that shit by hero or item name
Object.keys(updates).forEach(update => {
  Object.keys(updates[update].items).forEach(type => {
    updates[update].items[type].sort((a, b) => {
      switch (type) {
        case 'icons':
          if (a.name < b.name) return -1;
          if (a.name > b.name || !a.hero) return 1;
          return 0;
        default:
          if (a.hero < b.hero) return -1;
          if (a.hero > b.hero || !a.hero) return 1;
          return 0;
      }
    })
  })
})

// Add allClassItems (Sprays, Icons) to items.json file
try {
  heroes["all"] = JSON.parse(allClassData)
} catch (e) {
  console.error("Error parsing allClassItems")
  return
}

updates = sortObject(updates, true)
heroes = sortObject(heroes)

fs.writeFileSync(`${__dirname}/../data/items.json`, JSON.stringify(heroes, null, 2), 'utf8')
fs.writeFileSync(`${__dirname}/../data/updates.json`, JSON.stringify(updates, null, 2), 'utf8')
