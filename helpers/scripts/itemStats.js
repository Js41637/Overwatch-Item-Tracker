const heroData = require('../../data/items.json')
const _ = require('lodash')

const prices = {
  undefined: 25,
  common: 25,
  rare: 75,
  epic: 250,
  legendary: 1000
}

function isValidItem(item) {
  return !item.achievement && !item.standardItem && item.quality && (!item.event || (item.event && item.event !== 'SUMMER_GAMES_2016'))
}

const heroCounts = {

}

var totalCounts = {}
var totalCount = 0
var costs = {}
var totalCost = 0
_.forEach(heroData, hero => {
  if (!heroCounts[hero.id]) heroCounts[hero.id] = {}
  _.forEach(hero.items, (items, type) => {
    if (!totalCounts[type]) totalCounts[type] = 0
    if (!heroCounts[hero.id][type]) heroCounts[hero.id][type] = 0
    if (!costs[type]) costs[type] = 0
    _.forEach(items, item => {
      totalCount++
      totalCounts[type]++

      if (!item.standardItem) {
        heroCounts[hero.id][type]++
      }

      if (isValidItem(item)) {
        var price = prices[item.quality] * (item.event ? 3 : 1)
        costs[type] += price
        totalCost += price
      }
    })
  })
})

const bottomHeroes = _.reduce(heroCounts, (res, counts, hero) => {
  if (hero === 'all' || hero === 'echo' || hero === 'sigma' || hero === 'baptiste' || hero === 'ashe' || hero === 'wrecking-ball' || hero === 'brigitte' || hero === 'orisa' || hero === 'moira') return res

  _.forEach(counts, (val, type) => {
    if (type === 'weapons') return
    if (!res[type]) res[type] = { total: 0, heroes: [] }

    if (res[type].total === val) {
      res[type].heroes.push(hero)
    }

    if (res[type].total > val || res[type].total === 0) {
      res[type].heroes = [hero]
      res[type].total = val
    }
  })

  return res
}, {})

const topHeroes = _.reduce(heroCounts, (res, counts, hero) => {
  if (hero === 'all') return res

  _.forEach(counts, (val, type) => {
    if (type === 'weapons') return
    if (!res[type]) res[type] = { total: 0, heroes: [] }

    if (res[type].total === val) {
      res[type].heroes.push(hero)
    }

    if (res[type].total < val) {
      res[type].heroes = [hero]
      res[type].total = val
    }
  })

  return res
}, {})

console.log(topHeroes)
console.log(bottomHeroes)
