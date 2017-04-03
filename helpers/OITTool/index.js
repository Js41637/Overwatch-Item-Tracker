#! /usr/bin/env node
const { moveSpraysOrIcons } = require('./tools/heroSprayAndIconMover')
const { mapFilesToHeroes } = require('./tools/filesToHeroMapper')
const { convertFiles } = require('./tools/convertSprayAndIcons')
const { extractSounds, fetchVoicelines } = require('./tools/soundsExtractor')
const { mapAllClassData } = require('./tools/allClassItemsMapper')
const { handleErr } = require('./tools/utils')
var args = process.argv.slice(2)
var mode = args ? args[0] : ''
args = args.slice(1)
switch(mode) {
  case 'a':
  case 'allclass':
    mapAllClassData()
    break
  case 'c':
  case 'convert':
    convertFiles(args)
    break
  case "sprays":
    moveSpraysOrIcons('sprays')
    break
  case "icons":
    moveSpraysOrIcons('icons')
    break
  case "si":
  case "is":
  case 'images':
    moveSpraysOrIcons('both')
    break
  case 'f':
  case 'filestoheromapper':
  case 'toheroes':
    mapFilesToHeroes(args).catch(handleErr)
    break
  case 's':
  case 'sounds':
    extractSounds(args)
    break
  case 'fetchvoicelines':
  case 'v':
    fetchVoicelines()
    break
  default:
    console.log("YOU NEED TO ENTER A MODE")
}