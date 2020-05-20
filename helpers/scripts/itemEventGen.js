const fs = require('fs')
const _ = require('lodash')

const events = require('../../data/events.json')
const event = 'ANNIVERSARY'
const ignoreGroups = ['ANNIVERSARY_2019', 'ANNIVERSARY_2017', 'ANNIVERSARY_2018']

const stuff = _.reduce(events[event].items, (res, items, type) => {
  type = type.includes('skins') ? 'skins' : type

  for (let item of items) {
    if (ignoreGroups.includes(item.group)) continue

    res.push(`${type}/${item.id}`)
  }

  return res
}, [])

fs.writeFileSync('./stuff.json', JSON.stringify(stuff, null, 2))
