/* Datamapper.js
 * Maps item data provided from rawData.txt to each hero sorted by the item type
 * Items added in events are then mapped from this hero data.
 * Code on this page is synchronous, it works it's way down.
 */
const fs = require('fs');
const { forEach, sortBy, find, reduce, merge, get, isEmpty, findKey, cloneDeep } = require('lodash');

const mode = process.argv.slice(2)[0];

console.log(`
╭━━━╮╱╱╭╮╱╱╱╭━╮╭━╮
╰╮╭╮┃╱╭╯╰╮╱╱┃┃╰╯┃┃
╱┃┃┃┣━┻╮╭╋━━┫╭╮╭╮┣━━┳━━┳━━┳━━┳━╮
╱┃┃┃┃╭╮┃┃┃╭╮┃┃┃┃┃┃╭╮┃╭╮┃╭╮┃┃━┫╭╯
╭╯╰╯┃╭╮┃╰┫╭╮┃┃┃┃┃┃╭╮┃╰╯┃╰╯┃┃━┫┃
╰━━━┻╯╰┻━┻╯╰┻╯╰╯╰┻╯╰┫╭━┫╭━┻━━┻╯
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱┃┃╱┃┃
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╰╯╱╰╯
`);

const consoleColors = require('./consoleColors');
consoleColors.load();

const HERODATA = require('./dataMapper/HERODATA.js');
const { badNames, hiddenItems, defaultItems, achievementSprays, specialItems, blizzardItems, allClassEventItems, itemNamesIFuckedUp, idsBlizzardChanged } = require('./dataMapper/itemData.js');
const { EVENTS, EVENTNAMES, EVENTTIMES, EVENTORDER, CURRENTEVENT, EVENT_ITEM_ORDER, EVENT_PREVIEWS, NEW_EVENTS } = require('./dataMapper/EVENTDATA.js');
const { EVENTITEMS } = require('./dataMapper/EVENTITEMS.js');
const { getCleanID, getItemType, getPreviewURL, sortObject, qualityOrder, getAchievementForItem, getOriginalItemsList } = require('./dataMapper/utils.js');
const originalData = require('../data/master.json')

var allClassData, missingAllClassData = {}, allClassDataKeys = {};
var raw = { rawData: '', newRawData: '' };
try {
  allClassData = require('../data/allClassItems.json');
  raw.rawData = fs.readFileSync(`${__dirname}/rawData.txt`, "utf8");
  
} catch(e) {
  console.error("Failed to find allClassData or rawData!!");
  process.exit();
}

try {
  raw.newRawData = fs.readFileSync(`${__dirname}/newRawData.txt`, "utf8");
} catch(e) {
  console.info("No newRawData??");
}

try {
  missingAllClassData = require('../data/missingAllClassData.json');
} catch(e) {
  console.log("missing data");
} // eslint-disable-line

var data = {};
var things = ['rawData', 'newRawData'];
things.forEach((thingy, i) => {
  console.info('Parsing', thingy);
  if (!raw[thingy]) return;
  const itemGroupRegex = /\t(.+)(\n\t{2}.+)*/g;
  const heroGroups = raw[thingy].replace(/\r\n/g, '\n').split('\n').filter(a => !a.includes("Error unknown")).join('\n').split('\n\n');

  heroGroups.forEach(heroData => {
    if (!heroData.length) return;
    const hero = heroData.split('\n')[0].split(' ').slice(2).join(' '); // name of hero
    let rawItems = heroData.split('\n').slice(1).join('\n'); // remove the first line containing name of hero
    var items = {}, itemMatch;
    while ((itemMatch = itemGroupRegex.exec(rawItems)) !== null) { // Regex each group and it's items
      const groupName = itemMatch[1].replace('Event/', '').split(' ')[0].toUpperCase().replace('STANDARD', 'STANDARD_COMMON').replace('DEFAULT', 'ACHIEVEMENT')
      items[groupName] = itemMatch[0].split(/\n\t\t(?!\t)/).slice(1).map(a => a.trim());
    }
    
    // Filter out Uprising bots
    if (!items.COMMON && i == 0) {
      console.warn(`Skipping ${hero} as it has no items`);
      return;
    }

    if (isEmpty(items)) {
      console.warn(`${hero} has no items`);
    }

    // if i == 1 we're on newRawData, add the new items on top of existing data
    if (i == 1) {
      for (var group in items) {
        for (var item of items[group]) {
          if (!data[hero]) {
            console.warn(hero, "doesn't exist in data");
            continue;
          }

          if (!data[hero].items[group]) {
            data[hero].items[group] = [item]
            continue
          }

          data[hero].items[group].push(item);
        }
      }
    } else {
      data[hero] = { hero, items };
    }
  });
});

// AllClassData that isn't automatically generated can be manually added in missingAllClassData.json
// parsing missing items and if they have a name, add them to an object similar to allClassData
console.info('Parsing missingAllClassData');
var noLongerMissingAllClassData = reduce(missingAllClassData, (result, items, type) => {
  if (!result[type]) result[type] = [];
  items = reduce(items, (newItems = [], item) => {
    if (item.name.length) newItems.push(item);
    return newItems;
  }, []);
  result[type] = items;
  return result;
}, {});

// Add no longer missing allclass data onto allClassData
forEach(noLongerMissingAllClassData, (items, type) => allClassData[type] = [...allClassData[type], ...items]);

var shit = false

// Create object containing allclass item names by key so we can easily map event ids to items.
// also check if any items are in allClassEventItems and mark them as event items
console.info('Generating allClass data');
allClassData = reduce(allClassData, (result, items, type) => {
  let idCache = {};
  if (!result[type]) {
    result[type] = [];
    allClassDataKeys[type] = {};
  }

  items = reduce(items, (newItems = [], item) => {
    if (hiddenItems[type] && hiddenItems[type].includes(item.id)) return newItems;
    item.name = itemNamesIFuckedUp[`${type}/${item.id}`] || item.name;
    item.id = idsBlizzardChanged[`${type}/${item.id}`] || item.id;
    allClassDataKeys[type][item.id] = item.name;
    var { event = undefined } = reduce(allClassEventItems[type], (r, items, eventID) => {
      let match = find(items, id => id == item.id);
      Object.assign(r, match ? { event: eventID } : {});
      return r;
    }, {});

    if (idCache[item.id]) console.warn("Duplicate allClassData detected", item.id);
    idCache[item.id] = true;

    // Check if the spray or icon is a Competitive reward
    const isSeasonCompItem = item.id.match(/^season-(\d+)-(competitor|hero)$/);
    const isOtherCompItem = item.id.match(/^(top-500|inaugural-season|(copa-lucioball|competitive-ctf|competitive-6v6-elimination)-\w+)$/)
    const isCompItem =  isSeasonCompItem || isOtherCompItem ? { group: 'competitive' } : undefined;
    const isPachiItem = item.id.startsWith('pachi') || item.id.endsWith('mari') ? { group: 'pachi' } : undefined;
    const isStandard = defaultItems[type].includes(item.id) ? { standardItem: true } : undefined;
    const isAchievement = ((type == 'sprays' && achievementSprays.includes(item.id)) || isCompItem) ? { achievement: true } : blizzardItems[type].includes(item.id) ? { achievement: 'blizzard' } : undefined;
    
    // Only purchasable items need a quality
    const quality = (type == 'sprays' && !isStandard && !isAchievement && !isCompItem) ? { quality: 'common' } : undefined;
    const url = getPreviewURL(type, item.id, 'all');

    // Check if we have an achievement description for an achievement
    let description;
    if (isAchievement) {
      const desc = getAchievementForItem(item.id);
      if (desc) {
        description = { description: desc };
      }
    }
    
    // Check for specific item groups
    var group = undefined;
    for (let g in specialItems) {
      if (specialItems[g][type] && specialItems[g][type].includes(item.id)) group = { group: g };
    }

    newItems.push(Object.assign(item, { event, url }, isAchievement, isStandard, quality, group, isPachiItem, isCompItem, description));
    if (isSeasonCompItem && type == 'sprays') {
      const id = `season-${isSeasonCompItem[1]}-hero`;
      const desc2 = getAchievementForItem(item.id);
      newItems.push(Object.assign({}, { 
        name: `Season ${isSeasonCompItem[1]} Hero`, 
        id: id,
        url: getPreviewURL(type, id, 'all'),
        achievement: true, 
        group: 'competitive' 
      }, desc2 ? { description: desc2 } : undefined));
    }
    return newItems;
  }, []);
  result[type] = items;
  return result;
}, {});

// Goes through every hero and their item lists
console.info('Generating hero data');
var heroes = {};
for (var hero in data) {
  const itemGroups = data[hero].items;
  const heroID = getCleanID(hero);
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
      poses: [],
      weapons: []
    }
  });

  forEach(itemGroups, (items, group) => {
    items.forEach(item => {
      var [, name, itemType] = item.match(/(.+) \((.+)\)/);
      name = badNames[name.trim()] || name.trim();
      if (name == 'RANDOM' || name === 'DEFAULT') return; // das not an item

      const { quality, type } = getItemType(itemType);
      if (!quality || !type) return;

      // Generate ID of the item and check if we need to manually override it.
      var id = getCleanID(name, heroID);

      if (id === 'reinhardt-crusader' && type === 'sprays') {
        if (shit) {
          id = 'reinhardt-crusader-1'
        } else {
          shit = true
        }
      }

      id = idsBlizzardChanged[`${type}/${id}`] || id;
      name = itemNamesIFuckedUp[`${type}/${id}`] || name;

      const url = getPreviewURL(type, id, heroID);
      const out = { name, id, quality, url };

      // Check if item has a description
      const descStr = (item.split('\n')[1] || '').trim();
      if (descStr.length !== 0) {
        if (descStr === 'IS_STANDARD') {
          out.standardItem = true
        } else {
          out.description = descStr;
        }
      }

      switch (group) {
        case 'COMMON':
          break;
        case 'OWL':
          return
        case 'ACHIEVEMENT':
          if (type === 'weapons') {
            out.quality = 'golden'
            break;
          }

          out.achievement = (type == 'sprays' && achievementSprays.includes(name.toLowerCase())) ? true : 'blizzard';
          var desc = getAchievementForItem(id);
          if (desc) {
            out.description = desc;
          }
          break;
        case 'STANDARD_COMMON':
          out.standardItem = true;
          break;
        default:
          out.event = group;
          break;
      }

      // If we store the preview for this item on an event, link to it instead.
      if (EVENT_PREVIEWS[out.event] && EVENT_PREVIEWS[out.event].includes(type)) {
        out.url = getPreviewURL(type, id, heroID, out.event);
      }

      heroData.items[type].push(out);
      // Icons are allclass so we can add them allClassData which doesn't include hero specific icons
      if (type == 'icons') {
        out.hero = heroID;
        delete out.quality;
        allClassData['icons'].push(out);
      }
    });
  });

  heroes[heroID] = heroData;
}

heroes = sortObject(heroes);

// Go through every heros items and create a seperate object containing every item added in events
console.info('Generating event data');
var updates = {};
forEach(heroes, hero => {
  forEach(hero.items, (items, tKey) => {
    items.forEach(item => {
      const event = item.event;
      const actualEvent = findKey(EVENTITEMS, event => event.includes(`${tKey}/${item.id}`));

      if (actualEvent) {
        item.group = actualEvent;
      }

      // If the item to a new event. e.g. ummergames 2017 instead of 2016
      if (NEW_EVENTS.includes(event) && !actualEvent) {
        item.isNew = true;
      }

      let type;
      if (NEW_EVENTS.includes(event)) {
        type = (tKey == 'skins' && item.quality == 'legendary' && !actualEvent) ? 'skinsLegendary' : tKey;
      } else {
        // Split legendary and epic skins up for events as they are displayed seperately.
        type = tKey == 'skins' ? (item.quality == 'legendary' ? 'skinsLegendary' : (item.quality == 'epic' ? 'skinsEpic' : 'skins')) : tKey;
      }

      if (!event) return;
      if (!updates[event]) updates[event] = {
        order: EVENTORDER[event],
        name: EVENTNAMES[event],
        id: event,
        dates: EVENTTIMES[event],
        items: {}
      };
      if (!updates[event].items[type]) updates[event].items[type] = [];
      // if the item isnt a skin and is a legendary add a legendary tag, we do this because very few items for events
      // have had legendary items added outside of skins, this way we can mark them as special
      const legend = (tKey != 'skins' && item.quality == 'legendary') ? { legendary: true } : {};
      const url = getPreviewURL(type, item.id, hero.id, event);
      const newItem = Object.assign({}, { heroName: hero.name, hero: hero.id }, legend, item, { url } );
      if (type == 'icons') {
        delete newItem.quality;
      }
      delete newItem.event;
      updates[event].items[type].push(newItem);
    });
  });
});

// Add ornament ids to normal sprays
updates[EVENTS.WINTER].items.sprays = updates[EVENTS.WINTER].items.sprays.map(spray => {
  if (spray.heroName) {
    if (spray.id.endsWith('-ornament')) {
      return  {
        hidden: true,
        hero: spray.hero,
        id: spray.id,
        group: spray.group,
        quality: spray.quality
      }
    }

    const secondID = `${spray.hero}-ornament`;
    spray.secondId = secondID;
    spray.secondUrl = getPreviewURL('sprays', secondID, spray.hero, EVENTS.WINTER);
    return spray;
  } else return spray;
}).filter(Boolean);

// Add dragon dance ids to normal sprays
updates[EVENTS.LUNAR].items.sprays = updates[EVENTS.LUNAR].items.sprays.map(spray => {
  if (spray.heroName) {
    if (spray.id.endsWith('-dragon-dance')) {
      return  {
        hidden: true,
        hero: spray.hero,
        id: spray.id,
        group: spray.group,
        quality: spray.quality
      }
    }

    const secondID = `${spray.hero}-dragon-dance`;
    spray.secondId = secondID;
    spray.secondUrl = getPreviewURL('sprays', secondID, spray.hero, EVENTS.LUNAR);
    return spray;
  } else return spray;
}).filter(Boolean);

// Add allClassEventItems items (which aren't detected by item extrator) manually to events
console.info('Mapping allClassEventItems to events data');
const missingKeys = [];
forEach(allClassEventItems, (types, type) => {
  forEach(types, (events, event) => {
    events.forEach(itemID => {
      if (!allClassDataKeys[type][itemID]) {
        console.warn("Missing key for", itemID);
        missingKeys.push({ type, itemID });
        return;
      }

      let name = allClassDataKeys[type][itemID];

      if (!NEW_EVENTS.includes(event)) {
        name = name.replace(/ \d{4}$/, '');
      }

      const out = {
        hero: 'all',
        name: name,
        id: itemID,
        url: getPreviewURL(type, itemID, 'all', event)
      };

      const actualEvent = findKey(EVENTITEMS, event => event.includes(`${type}/${itemID}`));
      if (actualEvent && type !== 'icons') {
        out.group = actualEvent;
      }


      const isAchivement = achievementSprays.includes(itemID);
      if (isAchivement) {
        Object.assign(out, { achievement: true });
        var desc = getAchievementForItem(itemID);
        if (desc) {
          Object.assign(out, { description: desc });
        }
      }
      // sprays have no quality by default but if it isn't an achievement it means it's purchaseable so add quality
      if (type == 'sprays' && !isAchivement) {
        Object.assign(out, { quality: 'common' });
      }
      if (!updates[event]) {
        console.warn("Missing event!!", event);
        return;
      }
      if (!updates[event].items[type]) updates[event].items[type] = [];
      updates[event].items[type].push(out);
    });
  });
});

if (missingKeys.length) {
  if (!mode || mode !== 'missing') {
    console.warn("Missing itemIDs detected, run 'gen-missing-data' to generate a template of missing items");
  } else {
    const out = {};
    missingKeys.forEach(item => {
      if (!out[item.type]) out[item.type] = {};
      out[item.type][item.itemID] = { id: item.itemID };
    });
    missingAllClassData = merge(missingAllClassData, out);
    for (var type in missingAllClassData) {
      for (var itemID in missingAllClassData[type]) {
        let item = missingAllClassData[type][itemID];
        if (item.name) break;
        missingAllClassData[type][itemID].name = "";
      }
    }
    fs.writeFileSync(`${__dirname}/../data/missingAllClassData.json`, JSON.stringify(missingAllClassData, null, 2));
    console.info("Wrote missing data to data dir");
  }
}

// Sort event items by hero, name or name depending on type
console.info('Sorting event items');
forEach(updates, update => forEach(update.items, (items, type) => {
  switch (type) {
    case 'icons':
      update.items[type] = sortBy(items, get(EVENT_ITEM_ORDER, [update.id, type]) || ['name']);
      break;
    case 'sprays':
      update.items[type] = sortBy(items, ['heroName', (c => c.achievement ? 1 : 0), 'name']);
      break;
    default:
      update.items[type] = sortBy(items, get(EVENT_ITEM_ORDER, [update.id, type]) || ['heroName', 'name']);
  }
}));

// Add allClassData (Sprays, Icons) to items.json file
heroes["all"] = Object.assign({
  name: 'All Class',
  id: 'all'
}, HERODATA['all'], {
  items: allClassData
});


// Sorts Updates object by the order of events and heroes alphabetically.
updates = sortObject(updates, true);
heroes = sortObject(heroes);

// Go through everything and check old ids vs new ids to detect changes
const originalItemsMapping = getOriginalItemsList(originalData)
for (let hero in heroes) {
  if (!originalItemsMapping[hero]) continue
  for (let type in heroes[hero].items) {
    if (!originalItemsMapping[hero][type]) continue
    for (let item of heroes[hero].items[type]) {
      if (!originalItemsMapping[hero][type].includes(item.id)) {
        console.warn(`Changed/New item detected - [${hero}/${type}] ${item.id}`)
      }
    }
  }
}

// go through all hero items and sort items as they are sorted ingame
console.info('Sorting hero items');
forEach(heroes, hero => forEach(hero.items, (items, type) => {
  if (hero.id == 'all') {
    if (type == 'sprays') {
      hero.items[type] = sortBy(items, [
        (b => EVENTORDER[b.event]), // event items go below normal items
        (d => d.name.toLowerCase()) // everything in their respective groups is sorted by name
      ]);
    } else {
      hero.items[type] = sortBy(items, [a => a.name.toLowerCase()]); // sort alphabetically
    }
    return;
  }
  hero.items[type] = sortBy(items, [
    (a => a.standardItem && a.event ? 1 : a.standardItem ? 0 : 1), // Standard items at top (if they're not in an event)
    (b => qualityOrder[b.quality]), // sort by quality. rare, epic, legendary
    (c => !c.achievement && !c.event ? 0 : 1), // non achievement/event items on top
    (d => d.achievement ? 0 : 1), // achievement items above event items
    (e => EVENTORDER[EVENTORDER[e.group] ? e.group : e.event]), // sort events by event order
    (f => f.name.toLowerCase()) // everything in their respective groups is sorted by name
  ]);
}));

var masterData = {
  currentEvent: CURRENTEVENT,
  prices: {
    undefined: 25,
    'common': 25,
    'rare': 75,
    'epic': 250,
    'legendary': 1000,
    'golden': 0 // golden weapons
  },
  events: updates,
  heroes
};

// Write new items.json and updates.json files to disk
fs.writeFileSync(`${__dirname}/../data/items.json`, JSON.stringify(heroes, null, 2), 'utf8');
fs.writeFileSync(`${__dirname}/../data/events.json`, JSON.stringify(updates, null, 2), 'utf8');
fs.writeFileSync(`${__dirname}/../data/master.json`, JSON.stringify(masterData), 'utf8');

console.info("Finished");
