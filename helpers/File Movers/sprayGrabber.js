// sprayGrabber.js
// Run this script after sprayRenamer.js which moves all sprays into ./converted
// This script will find specific sprays for each hero matching a spray in spraysToGrab
// e.g. add spray data for YEAR_OF_THE_ROOSTER_2017 and it will move every roster spray to the root ./convert directory
// array of sprays from updates.json
var spraysToGrab = []

const fs = require('fs')

fs.readdir('./', (err, files) => {
  files = files.map(f => !f.startsWith('!') ? f : null).filter(Boolean)
  files.forEach(file => {
    fs.readdir(`./${file}/Sprays`, (err, sprays) => {
      sprays.forEach(spray => {
        var thing = spraysToGrab.find(s => s.id == spray.slice(0, -4))
		if (thing) {
			fs.rename(`./${file}/Sprays/${thing.id}.dds`, `./${thing.id}.dds`)
		}
      })
    })
  })
})
