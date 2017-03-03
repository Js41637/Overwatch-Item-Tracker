/* Datamapper.js
 * Maps item data provided from rawData.txt to each hero sorted by the item type
 * Items added in events are then mapped from this hero data.
 * Code on this page is synchronous, it works it's way down.
 */
const fs = require('fs')
const { forEach, sortBy } = require('lodash')
const { EVENTS, EVENTNAMES, EVENTTIMES, EVENTORDER, allClassEventItems } = require('./dataMapper/EVENTDATA.js')
const HERODATA = require('./dataMapper/HERODATA.js')
const { getCleanID, getItemType, getImageURL, sortObject, qualityOrder } = require('./dataMapper/utils.js')

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
  var heroData = Object.assign({
    name: hero,
    id: heroID,
  }, HERODATA[heroID], {
    items: {
      skins: [],
      emotes: [],
      intros: [],
      icons: [],
      sprays: [],
      voicelines: [],
      poses: []
    }
  })

  forEach(itemGroups, (items, group) => {
    items.forEach(item => {
      var [str, name, type] = item.match(/(.+) \((.+)\)/) //eslint-disable-line
      name = name.trim()
      if (name == 'RANDOM') return
      var id = getCleanID(name, heroID)
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
forEach(allClassEventItems, (types, type) => {
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
forEach(updates, update => forEach(update.items, (items, type) => {
  switch (type) {
    case 'icons':
      update.items[type] = sortBy(items, ['name'])
      break;
    default:
      update.items[type] = sortBy(items, ['hero', 'name'])
  }
}))

// Add allClassData (Sprays, Icons) to items.json file
// NOTE: This allClassData is seperate from the allClassEventItems
try {
  heroes["all"] = Object.assign({
    name: 'All Class',
    id: 'all'
  }, HERODATA['all'], {
    items: JSON.parse(allClassData)
  })
} catch (e) {
  console.error("Error parsing allClassItems")
  return
}

// Sorts Updates object by the order of events and heroes alphabetically.
updates = sortObject(updates, true)
heroes = sortObject(heroes)

// go through all hero items and sort items as they are sorted ingame
forEach(heroes, hero => forEach(hero.items, (items, type) => {
  hero.items[type] = sortBy(items, [
      'standardItem', // Standard items first
      (a => qualityOrder[a.quality]), // sort by quality. rare, epic, legendary
      (c => c.achievement ? 1 : 0), // achievement items (origins edition/blizzcon) go at the bottom
      (b => EVENTORDER[b.event]), // event items go below normal items
      'name' // everything in their respective groups is sorted by name
    ])
}))

var allData = {
  currentEvent: 'YEAR_OF_THE_ROOSTER_2017',
  prices: {
    'common': 25,
    'rare': 75,
    'epic': 250,
    'legendary': 1000
  },
  events: updates,
  heroes
}

// Write new items.json and updates.json files to disk
fs.writeFileSync(`${__dirname}/../data/items.json`, JSON.stringify(heroes, null, 2), 'utf8')
fs.writeFileSync(`${__dirname}/../data/events.json`, JSON.stringify(updates, null, 2), 'utf8')
fs.writeFileSync(`${__dirname}/../data/master.json`, JSON.stringify(allData, null, 2), 'utf8')
