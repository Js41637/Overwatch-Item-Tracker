#! /usr/bin/env node
const { extractImages } = require('./tools/imageExtractor');
const { mapFilesToHeroes } = require('./tools/filesToHeroMapper');
const { extractSounds } = require('./tools/soundsExtractor');
const { fetchVoicelines } = require('./tools/voicelineFetcher');
const { mapAllClassData } = require('./tools/allClassItemsMapper');
const { handleErr } = require('./tools/utils');

var args = process.argv.slice(2);
var mode = args ? args[0] : '';
args = args.slice(1);
switch(mode) {
  case 'allclass':
    mapAllClassData();
    break;
  case 'f':
  case 'filestoheroes':
    mapFilesToHeroes(args).catch(handleErr);
    break;
  case 's':
  case 'sounds':
    extractSounds(args);
    break;
  case 'V':
    require('./tools/soundDumpParser').parseSoundDump(args);
    break;
  case 'v':
  case 'fetchvoicelines':
    fetchVoicelines();
    break;
  case 'i':
    extractImages(args);
    break;
  case 'achievements':
    require('./tools/achievementParser');
    break;
  default:
    console.log("YOU NEED TO ENTER A MODE");
}