const heroData = require('../data/items.json');
const { forEach } = require('lodash');
require('console.table');

const prices = {
  undefined: 25,
  'common': 25,
  'rare': 75,
  'epic': 250,
  'legendary': 1000
};

function isValidItem(item) {
  return !item.achievement && !item.standardItem && item.quality && (!item.event || (item.event && item.event !== 'SUMMER_GAMES_2016'));
}

console.table([{event: 'rooster', top: 'kek'}, {event: 'winter', top: 'kek'}]);

return;

var totalCounts = {};
var totalCount = 0;
var costs = {};
var totalCost = 0;
forEach(heroData, hero => {
  forEach(hero.items, (items, type) => {
    if (type == 'icons') return;
    if (!totalCounts[type]) totalCounts[type] = 0;
    if (!costs[type]) costs[type] = 0;
    forEach(items, item => {
      totalCount++;
      totalCounts[type]++;
      if (isValidItem(item)) {
        var price = prices[item.quality] * (item.event ? 3 : 1);
        costs[type] += price;
        totalCost += price;
      }
    }); 
  });
});

console.log(totalCounts, totalCount, costs, totalCost);