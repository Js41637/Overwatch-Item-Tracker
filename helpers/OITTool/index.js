#! /usr/bin/env node
const { moveSpraysOrIcons } = require('./tools/heroSprayAndIconMover')
const { mapFilesToHeroes } = require('./tools/filesToHeroMapper')
const { convertFiles } = require('./tools/convertSprayAndIcons')
const { extractSounds } = require('./tools/soundsExtractor')
var args = process.argv.slice(2)
var mode = args ? args[0] : ''
args = args.slice(1)
switch(mode) {
  case 'c':
  case 'convert':
    convertFiles(args)
    break
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
  case 'move':
    moveSpraysOrIcons('both')
    break
  case 'f':
  case 'filestoheromapper':
  case 'toheroes':
    mapFilesToHeroes(args)
    break;
  case 'sounds':
    extractSounds(args)
    break
  default:
    console.log("YOU NEED TO ENTER A MODE")
}