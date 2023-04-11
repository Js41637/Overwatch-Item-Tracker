/* Datamapper.js
 * Maps item data provided from rawData.txt to each hero sorted by the item type
 * Items added in events are then mapped from this hero data.
 * Code on this page is synchronous, it works it's way down.
 */
const fs = require('fs');
const _ = require('lodash');
const alphaNumSort = require('./dataMapper/alphaNumSort')

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


const HERODATA = require('./dataMapper/HERODATA.js');
const {
  badNames, hiddenItems, defaultItems, achievementSprays, specialItems,
  specialAchievementItems, blizzardItems, allClassEventItems, itemNamesIFuckedUp,
  idsBlizzardChanged, noLongerPurchaseableItems, eventItemOverrides, owlTeams
} = require('./dataMapper/itemData.js');
const { EVENTS, EVENTNAMES, EVENTTIMES, EVENTORDER, CURRENTEVENT, EVENT_ITEM_ORDER, EVENT_PREVIEWS, LATEST_EVENTS, EVENT_CONFIG } = require('./dataMapper/EVENTDATA.js');
const { EVENTITEMS } = require('./dataMapper/EVENTITEMS.js');
const { getCleanID, getCleanHeroId, getItemType, getPreviewURL, sortObject, qualityOrder, getAchievementForItem, getOriginalItemsList } = require('./dataMapper/utils.js');
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
  const heroGroups = raw[thingy].split('\n\n');

  heroGroups.forEach(heroData => {
    if (!heroData.length) return;
    const hero = heroData.split('\n')[0].split(' ').slice(2).join(' '); // name of hero
    let rawItems = heroData.split('\n').slice(1).join('\n'); // remove the first line containing name of hero
    var items = {}, itemMatch;
    while ((itemMatch = itemGroupRegex.exec(rawItems)) !== null) { // Regex each group and it's items
      const groupName = itemMatch[1]
        .replace('Unlocks', '')
        .trim()
        .replace(/ /g, '_')
        .toUpperCase()
        .replace('ARCHIVES', 'UPRISING')
        .replace('WINTER', 'WINTER_WONDERLAND')

      items[groupName] = itemMatch[0].split(/\n\t\t(?!\t)/).slice(1).map(a => a.trim());
    }

    // Filter out Uprising bots
    if (!items.BASE && i == 0) {
      console.warn(`Skipping ${hero} as it has no items`);
      return;
    }

    if (_.isEmpty(items)) {
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
var noLongerMissingAllClassData = _.reduce(missingAllClassData, (result, items, type) => {
  if (!result[type]) result[type] = [];
  items = _.reduce(items, (newItems = [], item) => {
    if (item.name.length) newItems.push(item);
    return newItems;
  }, []);
  result[type] = items;
  return result;
}, {});

// Add no longer missing allclass data onto allClassData
_.forEach(noLongerMissingAllClassData, (items, type) => allClassData[type] = [...allClassData[type], ...items]);

// Create object containing allclass item names by key so we can easily map event ids to items.
// also check if any items are in allClassEventItems and mark them as event items
console.info('Generating allClass data');
allClassData = _.reduce(allClassData, (result, items, type) => {
  let idCache = {};
  if (!result[type]) {
    result[type] = [];
    allClassDataKeys[type] = {};
  }

  items = _.reduce(items, (newItems = [], item) => {
    if (hiddenItems[type] && hiddenItems[type].includes(item.id)) return newItems;

    item.name = itemNamesIFuckedUp[`${type}/${item.id}`] || item.name;
    item.id = idsBlizzardChanged[`${type}/${item.id}`] || item.id;
    allClassDataKeys[type][item.id] = item.name;

    var { event = undefined } = _.reduce(allClassEventItems[type], (r, items, eventID) => {
      let match = _.find(items, id => id == item.id);
      Object.assign(r, match ? { event: eventID } : {});
      return r;
    }, {});

    if (idCache[item.id]) {
      console.warn("Duplicate allClassData detected", item.id);
      item.id += '-1'
    }
    idCache[item.id] = true;

    // Check if the spray or icon is a Competitive reward
    const isSeasonCompItem = item.id.match(/^season-(\d+)-(competitor|hero)$/);
    const isOpenQueueCompItem = item.id.match(/^open-queue-season-(\d+)-(competitor|hero)$/);
    const isOtherCompItem = item.id.match(/^(top-500|(copa-lucioball|competitive-ctf|competitive-no-limits|competitive-(6v6|3v3)-(group-)?elimination|competitive-(team-)?deathmatch|competitive-open-queue)-\w+(-\d+)?)$/)
    const isCompItem =  isSeasonCompItem || isOtherCompItem || isOpenQueueCompItem ? { group: 'competitive' } : undefined;
    const isOWLItem = item.id.match(/^(inaugural-season)$/)
    const isPachiItem = item.id.includes('pachi') || item.id.endsWith('mari') ? { group: 'pachi' } : undefined;
    let isStandard = defaultItems[type].includes(item.id) ? { standardItem: true } : undefined;
    let isAchievement = ((type == 'sprays' && achievementSprays.includes(item.id)) || isCompItem)
      ? { achievement: true }
      : blizzardItems[type].includes(item.id)
        ? { achievement: 'blizzard' }
        : isOWLItem
          ? { achievement: 'owl' }
          : undefined;

    var group = undefined;

    const owlTeamName = item.id.replace(/(-\d{4}-logo|-logo|-\d{4})$/, '')
    if (owlTeams.includes(owlTeamName)) {
      isStandard = { standardItem: true }
      group = { group: 'overwatch league' }
    }

    const owlTeamName2 = item.id.replace(/(-homestand-\d{4})$/, '')
    if (owlTeams.includes(owlTeamName2)) {
      isAchievement = { achievement: 'owl' }
      group = { group: 'overwatch league' }
    }

    // Only purchasable items need a quality
    const isNoLongerPurchasble = noLongerPurchaseableItems[type] && noLongerPurchaseableItems[type].includes(item.id)
    const quality = (type == 'sprays' && !isStandard && !isAchievement && !isCompItem && !isNoLongerPurchasble) ? { quality: 'common' } : undefined;
    const url = getPreviewURL(type, item.id, 'all');

    // Check if we have an achievement description for an achievement
    let description;
    const desc = getAchievementForItem(item.id);

    if (desc && (type !== 'icons' || (type === 'icons' && !event) || (type === 'icons' && event && _.get(allClassEventItems, [type, event], []).includes(item.id)))) {
      description = { description: desc };
    }

    // Check for specific item groups
    if (!group) {
      for (let g in specialItems) {
        if (specialItems[g][type] && specialItems[g][type].includes(item.id)) {
          group = { group: g };
        }
      }
    }

    if (group && group.group === 'overwatch league') {
      isAchievement = { achievement: 'owl' }
    }

    if (type === 'sprays') {
      const actualEvent = _.findKey(EVENTITEMS[event], e => e.includes(`${type}/${item.id}`));
      if (actualEvent) {
        group = { group: actualEvent };
      }
    }

    newItems.push(Object.assign(item, { event, url }, isAchievement, isStandard, quality, group, isPachiItem, isCompItem, description));

    if (isSeasonCompItem && type == 'sprays') {
      const id = `season-${isSeasonCompItem[1]}-hero`;
      const desc2 = getAchievementForItem(id);
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

const duplicateNames = [['sprays', 'tracer-blink'], ['sprays', 'reinhardt-crusader'], ['voicelines', 'baptiste-some-kind-of-angel'], ['sprays', 'doomfist-thumbs-down']]
const seenDupes = {}

// Goes through every hero and their item lists
console.info('Generating hero data');
var heroes = {};
for (var hero in data) {
  const itemGroups = data[hero].items;
  const heroID = getCleanHeroId(hero);
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

  // Jank hack to make sure we process DEFAULT items and BASE items before the event items
  const { DEFAULT, BASE, ...others } = itemGroups
  const newGroup = { DEFAULT, BASE, ...others }

  _.forEach(newGroup, (items, group) => {
    items.forEach(item => {
      var [, name, itemType] = item.match(/(.+) \((.+)\)/);
      name = badNames[name.trim()] || name.trim();
      if (name == 'RANDOM' || name === 'DEFAULT') return; // das not an item

      const { quality, type } = getItemType(itemType);
      if (!quality || !type) return;

      // Generate ID of the item and check if we need to manually override it.
      var id = getCleanID(name, heroID);
      let uniqueId = `${type}/${id}`
      id = idsBlizzardChanged[uniqueId] || id;
      uniqueId = `${type}/${id}`
      name = itemNamesIFuckedUp[uniqueId] || name;

      for (const dupeSet of duplicateNames) {
        if (type == dupeSet[0] && id === dupeSet[1]) {
          const seen = seenDupes[uniqueId]

          if (seen) {
            console.log('Found dupe', uniqueId)
            id = `${id}-1`
          } else {
            seenDupes[uniqueId] = true
          }
        }
      }

      const url = getPreviewURL(type, id, heroID);
      const out = { name, id, quality, url };

      // Check if item has a description
      const descStr = (item.split('\n')[1] || '').trim();
      if (descStr.length !== 0) {
        if (descStr === 'IS_STANDARD') {
          out.standardItem = true
        } else if (!descStr.match(/available (in|for)/i)) {
          out.description = descStr
        }
      }

      switch (group) {
        case 'BASE':
          break;
        case 'OWL':
          out.achievement = 'owl'
          return
        case 'OTHER':
          if (type === 'weapons') {
            out.quality = 'golden'
            break;
          }

          var achievementId = id.match(/-(cute|pixel)$/) ? 'cute' : id
          out.achievement = (type == 'sprays' && achievementSprays.includes(achievementId.toLowerCase())) ? true : 'blizzard';
          var desc = getAchievementForItem(id);
          if (desc) {
            out.description = desc;
          }

          for (let g in specialAchievementItems) {
            if (specialAchievementItems[g][type] && specialAchievementItems[g][type].includes(id)) {
              out.achievement = g
            }
          }

          if (uniqueId in eventItemOverrides) {
            out.event = eventItemOverrides[uniqueId]
            out.achievement = 'limited'
          }
          break;
        case 'DEFAULT':
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
_.forEach(heroes, hero => {
  _.forEach(hero.items, (items, tKey) => {
    items.forEach(item => {
      const event = item.event;
      if (!item.event) return

      const actualEvent = _.findKey(EVENTITEMS[event], event => event.includes(`${tKey}/${item.id}`));

      if (actualEvent) {
        item.group = actualEvent // we do this because it mutates the original item, super fucking jank but it works
      }

      // If the item to a new event. e.g. summergames 2017 instead of 2016
      if (LATEST_EVENTS[event] === actualEvent || !actualEvent || EVENT_CONFIG[event]?.latest_event === actualEvent) {
        item.isNew = true // we do this because it mutates the original item, super fucking jank but it works
      }

      let type = (tKey === 'skins' && item.isNew && item.quality == 'legendary') ? 'skinsLegendary' : tKey
      if (type === 'skinsLegendary' && EVENT_CONFIG[event]?.disable_seperate_legendary_skins) {
        type = 'skins'
      }

      if (!updates[event]) {
        updates[event] = {
          order: EVENTORDER[event],
          name: EVENTNAMES[event],
          id: event,
          dates: EVENTTIMES[event],
          event_ids: [],
          items: {}
        };
      }

      if (!updates[event].event_ids.includes(actualEvent)) {
        updates[event].event_ids.push(actualEvent)
      }

      if (!updates[event].items[type]) {
        updates[event].items[type] = []
      }

      // if the item isnt a skin and is a legendary add a legendary tag, we do this because very few items for events
      // have had legendary items added outside of skins, this way we can mark them as special
      const legend = (tKey != 'skins' && item.quality == 'legendary') ? { legendary: true } : {};
      const url = getPreviewURL(type, item.id, hero.id, event);

      const newItem = Object.assign({},
        { heroName: hero.name, hero: hero.id },
        legend,
        item,
        { url },
        item.group && { group: item.group },
        item.isNew && { isNew: true }
      );

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
_.forEach(allClassEventItems, (types, type) => {
  _.forEach(types, (events, event) => {
    events.forEach(itemID => {
      if (!allClassDataKeys[type][itemID]) {
        console.warn("Missing key for", itemID);
        missingKeys.push({ type, itemID });
        return;
      }

      let name = allClassDataKeys[type][itemID];

      const out = {
        hero: 'all',
        name: name,
        id: itemID,
        url: getPreviewURL(type, itemID, 'all', event)
      };

      const actualEvent = _.findKey(EVENTITEMS[event], e => e.includes(`${type}/${itemID}`));
      if (actualEvent) {
        out.group = actualEvent;
      }

      // If the item to a new event. e.g. summergames 2017 instead of 2016
      if (actualEvent && (LATEST_EVENTS[event] === actualEvent || EVENT_CONFIG[event]?.latest_event === actualEvent)) {
        out.isNew = true;
      }

      const isAchivement = achievementSprays.includes(itemID);
      if (isAchivement && type === 'sprays') {
        Object.assign(out, { achievement: true });
      }

      var desc = getAchievementForItem(itemID);
      if (desc) {
        Object.assign(out, { description: desc });
      }

      const isNoLongerPurchasble = noLongerPurchaseableItems[type] && noLongerPurchaseableItems[type].includes(itemID)

      // sprays have no quality by default but if it isn't an achievement it means it's purchaseable so add quality
      if (type === 'sprays' && !isAchivement && !isNoLongerPurchasble) {
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
    missingAllClassData = _.merge(missingAllClassData, out);
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
_.forEach(updates, update => _.forEach(update.items, (items, type) => {
  switch (type) {
    case 'icons':
      update.items[type] = _.sortBy(items, _.get(EVENT_ITEM_ORDER, [update.id, type]) || ['name']);
      break;
    case 'sprays':
      update.items[type] = _.sortBy(items, ['heroName', (c => c.achievement ? 1 : 0), 'name']);
      break;
    default:
      update.items[type] = _.sortBy(items, _.get(EVENT_ITEM_ORDER, [update.id, type]) || ['heroName', 'name']);
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

// Go through all hero items and sort items as they are sorted in-game
console.info('Sorting hero items');
_.forEach(heroes, hero => _.forEach(hero.items, (items, type) => {
  delete hero.sortName

  if (hero.id == 'all') {
    if (type == 'sprays') {
      hero.items[type] = _.sortBy(alphaNumSort(items), [
        (b => EVENTORDER[b.event]) // event items go below normal items
      ]);
    } else {
      hero.items[type] = alphaNumSort(items)
    }
    return;
  }

  hero.items[type] = _.sortBy(items, [
    (a => a.standardItem && a.event ? 1 : a.standardItem ? 0 : 1), // Standard items at top (if they're not in an event)
    (b => qualityOrder[b.quality]), // sort by quality. rare, epic, legendary
    (c => !c.achievement && !c.event ? 0 : 1), // non achievement/event items on top
    (d => d.achievement ? 1 : 0), // achievement items below event items
    (e => _.isString(e.achievement)), // Put special achievements below normal achievments (cute/pixel)
    (d => d.achievement === 'owl' ? 0 : 1), // owl items above blizzard quality
    (d => d.achievement === 'blizzard' ? 0 : 1), // put blizzard special items above SUPER special items (pink mercy stuff)
    (f => EVENTORDER[EVENTORDER[f.group] ? f.group : f.event]), // sort events by event order
    (g => g.name.toLowerCase()), // everything in their respective groups is sorted by name
    (g => g.hero)
  ]);
}));

var masterData = {
  currentEvent: CURRENTEVENT,
  prices: {
    undefined: 25,
    common: 25,
    rare: 75,
    epic: 250,
    legendary: 1000,
    golden: 0 // golden weapons
  },
  event_config: EVENT_CONFIG,
  latest_events: LATEST_EVENTS,
  events: updates,
  heroes
};

// Write new items.json and updates.json files to disk
fs.writeFileSync(`${__dirname}/../data/items.json`, JSON.stringify(heroes, null, 2), 'utf8');
fs.writeFileSync(`${__dirname}/../data/events.json`, JSON.stringify(updates, null, 2), 'utf8');
fs.writeFileSync(`${__dirname}/../data/master.json`, JSON.stringify(masterData), 'utf8');

console.info("Finished");
