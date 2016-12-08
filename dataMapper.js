var rawData = ``

var rawDataRegex = /Cosmetics for (.+)\.\.\.(\n.+)*/gm
var itemGroupRegex = / {8}(.+)(\n {16}(.+))*/gm
var data = []
var heroMatch
while ((heroMatch = rawDataRegex.exec(rawData)) !== null) {
  var rawItems = heroMatch[0].split('\n').slice(1).join('\n')
  var items = []
  var itemMatch
  while ((itemMatch = itemGroupRegex.exec(rawItems)) !== null) {
    items.push({
      group: itemMatch[1].split(' ')[0],
      items: itemMatch[0].split('\n').slice(1).map(a => a.trim())
    })
  }
  data.push({ hero: heroMatch[1], items })
}

var getClassForHero = hero => {
  switch (hero) {
    case "genji":
    case "mccree":
    case "pharah":
    case "reaper":
    case "soldier: 76":
    case "sombra":
    case "tracer":
      return "Assault"
    case "bastion":
    case "hanzo":
    case "junkrat":
    case "mei":
    case "torbjörn":
    case "widowmaker":
      return "Defence"
    case "d.va":
    case "reinhardt":
    case "roadhog":
    case "winston":
    case "zarya":
      return "Tank"
    case "ana":
    case "lúcio":
    case "mercy":
    case "symmetra":
    case "zenyatta":
      return "Support"
    default:
      return "Unknown"
  }
}

var getCleanID = name => name.toLowerCase().replace(/[öô]/g, 'o').replace('ú', 'u').replace('çã', 'ca').replace(/[^a-zA-Z 0-9]/g, '').replace(/ /g, '-')

var stupidNames = {
  "^_^": "joy",
  ">_<": "frustration",
  ";)": "winky-face"
}

var getType = type => {
  switch (type.toLowerCase().trim()) {
    case 'common voice line':
      return { quality: 'common', type: 'voice' }
    case 'legendary skin':
      return { quality: 'legendary', type: 'skins' }
    case 'rare skin':
      return { quality: 'rare', type: 'skins' }
    case 'epic skin':
      return { quality: 'epic', type: 'skins' }
    case 'common skin':
      return { quality: 'common', type: 'skins' }
    case 'common spray':
      return { quality: 'common', type: 'sprays' }
    case 'rare victory pose':
      return { quality: 'rare', type: 'poses' }
    case 'common victory pose':
      return { quality: 'common', type: 'poses' }
    case 'epic emote':
      return { quality: 'epic', type: 'emotes' }
    case 'common emote':
      return { quality: 'common', type: 'emotes' }
    case 'legendary emote':
      return { quality: 'legendary', type: 'emotes' }
    case 'rare icon':
      return { quality: 'rare', type: 'icons' }
    case 'epic heroic intro':
      return { quality: 'epic', type: 'intros' }
    case 'common heroic intro':
      return { quality: 'common', type: 'intros' }
    default:
      console.log("Unknown type?", type)
      return {}
  }
}

var heroes = {}
data.forEach(({ hero, items: itemGroups }) => {
  var heroID = getCleanID(hero)
  var heroData = {
    name: hero,
    class: getClassForHero(hero.toLowerCase()),
    id: heroID,
    items: {
      skins: [],
      emotes: [],
      intros: [],
      icons: [],
      sprays: [],
      voice: [],
      poses: []
    }
  }
  itemGroups.forEach(({ group, items }) => {
    items.forEach(item => {
      var [str, name, type] = item.match(/(.+) \((.+)\)/) //eslint-disable-line
      name = name.trim()
      if (name == 'RANDOM') return
      var id = getCleanID(name)
      id = id && id.length ? id : stupidNames[name] || "UNDEFINED"
      var { quality, type: itemType } = getType(type)
      if (!quality || !itemType) return
      var out = { name, id, quality: quality }
      switch (group) {
        case 'SUMMER_GAMES_2016':
        case 'HALLOWEEN_2016':
          out.event = group
          break;
        case 'ACHIEVEMENT':
          out.achievement = true
          break;
        case 'STANDARD_COMMON':
          out.standardItem = true
          break;
      }
      heroData.items[itemType].push(out)
    })
  })
  heroes[heroID] = heroData
})
