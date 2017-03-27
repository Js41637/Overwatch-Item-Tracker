#! /usr/bin/env node
const { moveSpraysOrIcons } = require('./tools/heroSprayAndIconMover')
const { mapFilesToHeroes } = require('./tools/filesToHeroMapper')
var args = process.argv.slice(2)
var mode = args ? args[0] : ''
args = args.slice(1)
switch(mode) {
  case "s":
  case "sprays":
    moveSpraysOrIcons('sprays')
    break
  case "i":
  case "icons":
    moveSpraysOrIcons('icons')
    break
  case "si":
  case "is":
    moveSpraysOrIcons('both')
    break
  case 'f':
  case 'filestoheromapper':
    mapFilesToHeroes(args)
    break
  default:
    console.log("YOU NEED TO ENTER A MODE")
}