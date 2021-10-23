const fs = require('fs')
const _ = require('lodash')

const events = require('../../data/events.json')
const event = 'HALLOWEEN'
const ignoreGroups = ['HALLOWEEN_2016', 'HALLOWEEN_2017', 'HALLOWEEN_2018', 'HALLOWEEN_2019', 'HALLOWEEN_2020']

const stuff = _.reduce(events[event].items, (res, items, type) => {
  type = type.includes('skins') ? 'skins' : type

  for (let item of items) {
    if (ignoreGroups.includes(item.group)) continue

    res.push(`${type}/${item.id}`)
  }

  return res
}, [])

fs.writeFileSync('./stuff.json', JSON.stringify(stuff, null, 2))
