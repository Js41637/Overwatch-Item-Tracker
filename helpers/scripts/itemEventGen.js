const fs = require('fs')
const _ = require('lodash')

const events = require('../../data/events.json')
const event = 'LUNAR_NEW_YEAR'
const ignoreGroups = ['LUNAR_NEW_YEAR_2016', 'LUNAR_NEW_YEAR_2017', 'LUNAR_NEW_YEAR_2018', 'LUNAR_NEW_YEAR_2019', 'LUNAR_NEW_YEAR_2020', 'LUNAR_NEW_YEAR_2021']

const stuff = _.reduce(events[event].items, (res, items, type) => {
  type = type.includes('skins') ? 'skins' : type

  for (let item of items) {
    if (ignoreGroups.includes(item.group)) continue

    res.push(`${type}/${item.id}`)
  }

  return res
}, [])

fs.writeFileSync('./stuff.json', JSON.stringify(stuff, null, 2))
