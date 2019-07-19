const fs = require('fs')
const _ = require('lodash')

const events = require('../../data/events.json')
const event = 'SUMMER_GAMES'
const ignoreGroups = ['SUMMER_GAMES_2016', 'SUMMER_GAMES_2017', 'SUMMER_GAMES_2018']

const stuff = _.reduce(events[event].items, (res, items, type) => {
  type = type.includes('skins') ? 'skins' : type

  for (let item of items) {
    if (ignoreGroups.includes(item.group)) continue

    res.push(`${type}/${item.id}`)
  }

  return res
}, [])

fs.writeFileSync('./stuff.json', JSON.stringify(stuff, null, 2))
