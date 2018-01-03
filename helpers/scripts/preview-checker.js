const itemData = require('../../data/items.json')
const eventData = require('../../data/events.json')
const path = require('path')
const fs = require('fs')

const consoleColors = require('../consoleColors');
consoleColors.load();

const cache = []

for (let hero in itemData) {
  for (let type in itemData[hero].items) {
    for (let item of itemData[hero].items[type]) {
      if (cache.includes(item.url) || !item.url) continue
      cache.push(item.url)
    
      const url = path.resolve(__dirname, '../../resources', `.${item.url}`)
      
      if (!fs.existsSync(url)) {
        console.warn('Missing', item.url)
      }
    }
  }
}

for (let event in eventData) {
  for (let type in eventData[event].items) {
    for (let item of eventData[event].items[type]) {
      if (cache.includes(item.url) || !item.url) continue
      cache.push(item.url)
    
      const url = path.resolve(__dirname, '../../resources', `.${item.url}`)
      
      if (!fs.existsSync(url)) {
        console.warn('Missing', item.url)
      }
    }
  }
}
