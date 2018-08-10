const fs = require('fs')
const _ = require('lodash')

const events = require('../../data/events.json')
const event = 'WINTER_WONDERLAND'
const ignoreGroup = 'WINTER_WONDERLAND_2016'

const stuff = _.reduce(events[event].items, (res, items, type) => {
  type = type.includes('skins') ? 'skins' : type

  for (let item of items) {
    if (item.group === ignoreGroup) continue

    res.push(`${type}/${item.id}`)
  }

  return res
}, [])

fs.writeFileSync('./stuff.json', JSON.stringify(stuff, null, 2))
