const qualityOrder = {
  'common': 0,
  'rare': 1,
  'epic': 2,
  'legendary': 3
}

const qualities = ['common', 'epic', 'rare', 'legendary']
const types = [
  { m: 'skin', name: 'skins' },
  { m: 'icon', name: 'icons' },
  { m: 'spray', name: 'sprays' },
  { m: 'emote', name: 'emotes' },
  { m: 'voice line', name: 'voicelines' },
  { m: 'victory pose', name: 'poses' },
  { m: 'heroic intro', name: 'intros' }
  //, { m: 'weapon skin', name: 'weapons' } // Golden
]
// Generate a match for each quality for every type of item
const matches = {}
types.forEach(t => {
  qualities.forEach(q => matches[`${q} ${t.m}`] = { quality: q, type: t.name })
})

// Returns the type of item, see above
const getItemType = type => {
  let m = matches[type.toLowerCase()]
  if (!m) {
    if (type !== 'Common Weapon Skin') console.warn("Unknown type?", type)
    return {}
  }
  return m
}

// Can't generate IDs off these names can we :)
const stupidNames = {
  "^_^": "joy",
  ">_<": "frustration",
  ">_\\<": "frustration",
  ";)": "winky-face",
  "^o^": "excited"
}

// Returns a cleanID, replacing all bad characters and replacing unicode ones
const getCleanID = (what, hero) => {
  what = stupidNames[what] || what;
  return (hero ? `${hero}-` : '') + what.toLowerCase().replace('ị', 'i').replace('é', 'e').replace(/[åäà]/g, 'a').replace(/[öôọ]/g, 'o').replace('ú', 'u').replace('çã', 'ca').replace(/[^a-zA-Z 0-9]/g, '').trim().replace(/ /g, '-')
}

// Returns the image or video URL for an item
const getImageURL = (type, event, id) => {
  const baseUrl = `./resources/updates/${event}/${type}/${id}`
  switch (type) {
    case 'emotes':
    case 'intros':
      return `${baseUrl}.webm`
    case 'sprays':
    case 'icons':
      return `${baseUrl}.png`
    case 'skins':
    case 'skinsEpic':
    case 'skinsLegendary':
    case 'poses':
      return `${baseUrl}.jpg`
  }
}

// http://stackoverflow.com/a/1359808
// Makes it so it JSON.stringify's in order
const sortObject = (o, update) => {
  var sorted = {}, key, a = []
  for (key in o) {
    if (o.hasOwnProperty(key)) a.push(key)
  }
  if (update) {
    a.sort((a, b) => {
      if (o[a].order < o[b].order) return -1;
      if (o[a].order > o[b].order) return 1;
      return 0;
    })
  } else {
    a.sort()
  }
  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]]
  }
  if (update) {
    Object.keys(sorted).forEach(update => {
      delete sorted[update].order
    })
  }
  return sorted
}

module.exports = { getCleanID, getItemType, getImageURL, sortObject, stupidNames, qualityOrder }
