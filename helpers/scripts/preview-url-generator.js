const _ = require('lodash')
const { EVENTS } = require('../dataMapper/EVENTDATA')
const eventItems = require('../../data/events.json')

const baseUrl = 'https://overwatchitemtracker.com/resources'
const items = [
  ...eventItems[EVENTS.WINTER].items.emotes,
  ...eventItems[EVENTS.WINTER].items.intros
]

_.chunk(items, 30).forEach(chunk => {
  chunk.forEach(item => console.log(baseUrl + item.url.replace('.webm', '-hd.webm')))
  console.log('\n')
})