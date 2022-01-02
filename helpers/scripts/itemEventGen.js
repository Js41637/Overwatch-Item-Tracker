const fs = require('fs')
const _ = require('lodash')

const events = require('../../data/events.json')
const event = 'WINTER_WONDERLAND'
const ignoreGroups = ['WINTER_WONDERLAND_2016', 'WINTER_WONDERLAND_2017', 'WINTER_WONDERLAND_2018', 'WINTER_WONDERLAND_2019', 'WINTER_WONDERLAND_2020']

const stuff = _.reduce(events[event].items, (res, items, type) => {
  type = type.includes('skins') ? 'skins' : type

  for (let item of items) {
    if (ignoreGroups.includes(item.group)) continue

    res.push(`${type}/${item.id}`)
  }

  return res
}, [])

fs.writeFileSync('./stuff.json', JSON.stringify(stuff, null, 2))
