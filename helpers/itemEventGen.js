const fs = require('fs');
const _ = require('lodash');

const events = require('./events.json')
const event = 'HALLOWEEN_2016'

const stuff = _.reduce(events[event].items, (res, items, type) => {
  type = type.includes('skins') ? 'skins' : type

  for (let item of items) {
    res.push(`${type}/${item.id}`)
  }

  return res
}, [])

fs.writeFileSync('./stuff.json', JSON.stringify(stuff, null, 2))