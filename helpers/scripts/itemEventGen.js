const fs = require('fs')
const _ = require('lodash')
const { EVENTS } = require('../dataMapper/EVENTDATA')

const events = require('../../data/events.json')
const event = 'ANNIVERSARY'
const newEvent = EVENTS.ANNIVERSARY_REMIX_VOL_1
const ignoreGroups = Object.values(EVENTS).filter(x => x !== newEvent)

const stuff = _.reduce(events[event].items, (res, items, type) => {
  type = type.includes('skins') ? 'skins' : type

  for (let item of items) {
    if (ignoreGroups.includes(item.group)) continue

    res.push(`${type}/${item.id}`)
  }

  return res
}, [])

fs.writeFileSync('./stuff.json', JSON.stringify(stuff, null, 2))
