const fs = require('fs')
const _ = require('lodash')

const events = require('../../data/events.json')
const event = 'ANNIVERSARY_2017'

const stuff = _.reduce(events[event].items, (res, items, type) => {
  type = type.includes('skins') ? 'skins' : type

  for (let item of items) {
    res.push(`${type}/${item.id}`)
  }

  return res
}, [])

fs.writeFileSync('./stuff.json', JSON.stringify(stuff, null, 2))
