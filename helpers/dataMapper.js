/* Datamapper.js
 * Maps item data provided from rawData.txt to each hero sorted by the item type
 * Items added in events are then mapped from this hero data.
 * Code on this page is synchronous, it works it's way down.
 */
const fs = require('fs')
const { forEach, sortBy, find, reduce } = require('lodash')

const HERODATA = require('./dataMapper/HERODATA.js')
const { badNames, hiddenItems, defaultItems, achievementSprays, allClassEventItems } = require('./dataMapper/itemData.js')
const { EVENTS, EVENTNAMES, EVENTTIMES, EVENTORDER, CURRENTEVENT } = require('./dataMapper/EVENTDATA.js')
const { getCleanID, getItemType, getPreviewURL, sortObject, qualityOrder } = require('./dataMapper/utils.js')
var allClassData, rawData;
try {
  allClassData = require('../data/allClassItems.json')
  rawData = fs.readFileSync(`${__dirname}/rawData.txt`, "utf8")
} catch(e) {
  console.error("Failed to find allClassData or rawData!!")
  process.exit()
}

// Create object containing allclass item names by key so we can easily map event ids to items.
// also check if any items are in allClassEventItems and mark them as event items
var allClassDataKeys = {}
allClassData = reduce(allClassData, (result, items, type) => {
  if (!result[type]) {
    result[type] = []
    allClassDataKeys[type] = {}
  }
  items = reduce(items, (newItems = [], item) => {
    if (hiddenItems[type] && hiddenItems[type].includes(item.id)) return newItems
    allClassDataKeys[type][item.id] = item.name
    var { event = undefined } = reduce(allClassEventItems[type], (r, items, eventID) => {
      let match = find(items, id => id == item.id)
      Object.assign(r, match ? { event: eventID } : {})
      return r
    }, {})
    
    const isCompSpray = type == 'sprays' && item.id.match(/^season-.-competitor$/)
    const isStandard = defaultItems[type].includes(item.id) ? { standardItem: true } : undefined
    const isAchievement = ((type == 'sprays' && achievementSprays.includes(item.id)) || isCompSpray) ? { achievement: true } : undefined
    const quality = (type == 'sprays' && !isStandard && !isAchievement && !isCompSpray) ? { quality: 'common' } : undefined
    newItems.push(Object.assign(item, { event }, isAchievement, isStandard, quality))
    return newItems
  }, [])
  result[type] = items
  return result
}, {})

var data = []
const itemGroupRegex = /\t(.+)(\n\t{2}.+)*/g
const heroGroups = rawData.split('\n').filter(a => !a.includes("Error unknown")).join('\n').split('\n\n')
heroGroups.forEach(heroData => {
  const hero = heroData.split('\n')[0].split(' ').slice(2).join(' ') // name of hero
  let rawItems = heroData.split('\n').slice(1).join('\n') // remove the first line containing name of hero
  var items = {}, itemMatch;
  while ((itemMatch = itemGroupRegex.exec(rawItems)) !== null) { // Regex each group and it's items
    items[itemMatch[1].split(' ')[0]] = itemMatch[0].split('\n').slice(1).map(a => a.trim())
  }
  data.push({ hero, items })
})

var heroes = {}
// Goes through every hero and their item lists
data.forEach(({ hero, items: itemGroups }) => {
  const heroID = getCleanID(hero)
  const heroData = Object.assign({
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
      name = badNames[name.trim()] || name.trim()
      if (name == 'RANDOM') return
      const id = getCleanID(name, heroID)
      const { quality, type: itemType } = getItemType(type)
      if (!quality || !itemType) return
      const out = { name, id, quality }
      switch (group) {
        case 'COMMON':
          break;
        case 'ACHIEVEMENT':
          out.achievement = (itemType == 'sprays' && achievementSprays.includes(name.toLowerCase())) ? true : 'blizzard'
          break;
        case 'STANDARD_COMMON':
          out.standardItem = true
          break;
        default:
          out.event = group
          break;
      }
      heroData.items[itemType].push(out)
      // Icons are allclass so we can add them allClassData which doesn't include hero specific icons
      if (itemType == 'icons') {
        out.hero = heroID
        delete out.quality
        allClassData['icons'].push(out)
      }
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
      const event = item.event
      // Split legendary and epic skins up for events as they are displayed seperately.
      const type = tKey == 'skins' ? (item.quality == 'legendary' ? 'skinsLegendary' : (item.quality == 'epic' ? 'skinsEpic' : 'skins')) : tKey
      if (!event) return
      if (!updates[event]) updates[event] = {
        order: Object.keys(EVENTNAMES).indexOf(event),
        name: EVENTNAMES[event],
        id: event,
        dates: EVENTTIMES[event],
        items: {}
      }
      if (!updates[event].items[type]) updates[event].items[type] = []
      // if the item isnt a skin and is a legendary add a legendary tag, we do this because very few items for events
      // have had legendary items added outside of skins, this way we can mark them as special
      const legend = (tKey != 'skins' && item.quality == 'legendary') ? { legendary: true } : {}
      const u = getPreviewURL(type, event, item.id, hero.id)
      const url = type == 'voicelines' ? { audio: u } : ((type == 'emotes' || type == 'intros') ? { video: u } : { img: u })
      const newItem = Object.assign({}, { hero: hero.name, heroID: hero.id }, legend, item, url )
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
  if (spray.heroID) {
    var ornamentID = `${spray.heroID}-ornament`
    spray.ornamentID = ornamentID;
    spray.ornamentURL = getPreviewURL('sprays', EVENTS.CHRISTMAS16, ornamentID, spray.heroID);
    return spray
  } else return spray
}).filter(Boolean)

// Add dragon dance ids to normal sprays
updates[EVENTS.ROOSTER17].items.sprays = updates[EVENTS.ROOSTER17].items.sprays.map(spray => {
  if (spray.heroID) {
    var dragonID = `${spray.heroID}-dragon-dance`
    spray.dragonID = dragonID;
    spray.dragonURL = getPreviewURL('sprays', EVENTS.ROOSTER17, dragonID, spray.heroID);
    return spray
  } else return spray
}).filter(Boolean)

// Add allClassEventItems items (which aren't detected by item extrator) manually to events
forEach(allClassEventItems, (types, type) => {
  forEach(types, (events, event) => {
    events.forEach(itemID => {
      if (!allClassDataKeys[type][itemID]) {
        console.warn("Missing key for", itemID)
        return
      }
      var out = {
        heroID: 'all',
        name: allClassDataKeys[type][itemID].replace(/ \d{4}$/, ''),
        id: itemID,
        img: getPreviewURL(type, event, itemID, 'all')
      }
      const isAchivement = achievementSprays.includes(itemID)
      if (isAchivement) {
        Object.assign(out, { achievement: true })
      }
      // sprays have no quality by default but if it isn't an achievement it means it's purchaseable so add quality
      if (type == 'sprays' && !isAchivement) {
        Object.assign(out, { quality: 'common' })
      }
      updates[event].items[type].push(out)
    })
  })
})

// Sort event items by hero, name or name depending on type
forEach(updates, update => forEach(update.items, (items, type) => {
  switch (type) {
    case 'icons':
      update.items[type] = sortBy(items, ['name'])
      break;
    case 'sprays':
      update.items[type] = sortBy(items, ['hero', (c => c.achievement ? 1 : 0), 'name'])
      break;
    default:
      update.items[type] = sortBy(items, ['hero', 'name'])
  }
}))

// Add allClassData (Sprays, Icons) to items.json file
heroes["all"] = Object.assign({
  name: 'All Class',
  id: 'all'
}, HERODATA['all'], {
  items: allClassData
})


// Sorts Updates object by the order of events and heroes alphabetically.
updates = sortObject(updates, true)
heroes = sortObject(heroes)

// go through all hero items and sort items as they are sorted ingame
forEach(heroes, hero => forEach(hero.items, (items, type) => {
  if (hero.id == 'all') {
    hero.items[type] = sortBy(items, ['name'])
    return
  }
  hero.items[type] = sortBy(items, [
      'standardItem', // Standard items first
      (a => qualityOrder[a.quality]), // sort by quality. rare, epic, legendary
      (c => c.achievement ? 1 : 0), // achievement items (origins edition/blizzcon) go at the bottom
      (b => EVENTORDER[b.event]), // event items go below normal items
      'name' // everything in their respective groups is sorted by name
    ])
}))

var masterData = {
  currentEvent: CURRENTEVENT,
  prices: {
    undefined: 25,
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
fs.writeFileSync(`${__dirname}/../data/master.json`, JSON.stringify(masterData), 'utf8')
