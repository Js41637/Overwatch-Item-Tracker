OWI.factory('Data', function() {
  var items = {
    legendary: {},
    epic: {},
    emotes: {},
    intros: {},
    sprays: {},
    voicelines: {},
    victoryposes: {},
    icons: {}
  }
  return {
    checked: {
      summergames2016: items,
      halloween2016: items,
      winterwonderland2016: items
    },
    updates: [{
      name: 'Summer Games 2016',
      id: 'summergames2016',
      items: {
        skinsLegendary: [{
          name: "Selecao",
          img: "./resources/summergames2016/skins/legendary/lucio.jpg"
        }, {
          name: "Striker",
          img: "./resources/summergames2016/skins/legendary/lucio2.jpg"
        }, {
          name: "Sprinter",
          img: "./resources/summergames2016/skins/legendary/tracer.jpg"
        }, {
          name: "Track & Field",
          img: "./resources/summergames2016/skins/legendary/tracer2.jpg"
        }, {
          name: "Champion",
          img: "./resources/summergames2016/skins/legendary/zarya.jpg"
        }, {
          name: "Weightifter",
          img: "./resources/summergames2016/skins/legendary/zarya2.jpg"
        }],
        skinsEpic: [{
          name: "Taegeukgi D.Va",
          img: "./resources/summergames2016/skins/epic/dva.jpg"
        }, {
          name: "Nihon Genji",
          img: "./resources/summergames2016/skins/epic/genji.jpg"
        }, {
          name: "American Mccree",
          img: "./resources/summergames2016/skins/epic/mccree.jpg"
        }, {
          name: "Edigenossin Mercy",
          img: "./resources/summergames2016/skins/epic/mercy.jpg"
        }, {
          name: "Tre Kronor Torbj\u00D6rn",
          img: "./resources/summergames2016/skins/epic/torbjorn.jpg"
        }, {
          name: "Tricolore Widowmaker",
          img: "./resources/summergames2016/skins/epic/widowmaker.jpg"
        }],
        intros: [{
          name: "Shotput Junkrat",
          video: "./resources/summergames2016/intros/junkrat.webm"
        }, {
          name: "Bicycle Kick L\u00DAcio",
          video: "./resources/summergames2016/intros/lucio.webm"
        }, {
          name: "Hurdle Tracer",
          video: "./resources/summergames2016/intros/tracer.webm"
        }],
        emotes: [{
          name: "Boxing Bastion",
          video: "./resources/summergames2016/emotes/bastion.webm"
        }, {
          name: "Juggle L\u00DAcio",
          video: "./resources/summergames2016/emotes/lucio.webm"
        }, {
          name: "Ribbon Symmetra",
          video: "./resources/summergames2016/emotes/symmetra.webm"
        }],
        voicelines: [
          "Ana", "Bastion", "D.Va", "Genji", "Hanzo",
          "Junkrat", "L\u00DAcio", "McCree", "Mei", "Mercy",
          "Pharah", "Reaper", "Reinhardt", "Roadhog",
          "Soldier: 76", "Symmetra", "Torbj\u00D6rn", "Tracer",
          "Widowmaker", "Winston", "Zarya", "Zenyatta"
        ],
        victoryposes: [{
          name: "Mei",
          img: "./resources/summergames2016/poses/mei.jpg"
        }, {
          name: "Pharah",
          img: "./resources/summergames2016/poses/pharah.jpg"
        }, {
          name: "Reaper",
          img: "./resources/summergames2016/poses/reaper.jpg"
        }, {
          name: "Roadhog",
          img: "./resources/summergames2016/poses/roadhog.jpg"
        }, {
          name: "Soldier: 76",
          img: "./resources/summergames2016/poses/soldier76.jpg"
        }, {
          name: "Torbj\u00D6rn",
          img: "./resources/summergames2016/poses/torbjorn.jpg"
        }, {
          name: "Widowmaker",
          img: "./resources/summergames2016/poses/widowmaker.jpg"
        }, {
          name: "Winston",
          img: "./resources/summergames2016/poses/winston.jpg"
        }, {
          name: "Zenyatta",
          img: "./resources/summergames2016/poses/zenyatta.jpg"
        }],
        sprays: [{
          name: "Ana",
          img: "./resources/summergames2016/sprays/ana.jpg"
        }, {
          name: "Bastion",
          img: "./resources/summergames2016/sprays/bastion.jpg"
        }, {
          name: "D.Va",
          img: "./resources/summergames2016/sprays/dva.jpg"
        }, {
          name: "Genji",
          img: "./resources/summergames2016/sprays/genji.jpg"
        }, {
          name: "Hanzo",
          img: "./resources/summergames2016/sprays/hanzo.jpg"
        }, {
          name: "Junkrat",
          img: "./resources/summergames2016/sprays/junkrat.jpg"
        }, {
          name: "L\u00DAcio",
          img: "./resources/summergames2016/sprays/lucio.jpg"
        }, {
          name: "McCree",
          img: "./resources/summergames2016/sprays/mccree.jpg"
        }, {
          name: "Mei",
          img: "./resources/summergames2016/sprays/mei.jpg"
        }, {
          name: "Mercy",
          img: "./resources/summergames2016/sprays/mercy.jpg"
        }, {
          name: "Pharah",
          img: "./resources/summergames2016/sprays/pharah.jpg"
        }, {
          name: "Reaper",
          img: "./resources/summergames2016/sprays/reaper.jpg"
        }, {
          name: "Reinhardt",
          img: "./resources/summergames2016/sprays/reinhardt.jpg"
        }, {
          name: "Roadhog",
          img: "./resources/summergames2016/sprays/roadhog.jpg"
        }, {
          name: "Soldier: 76",
          img: "./resources/summergames2016/sprays/soldier76.jpg"
        }, {
          name: "Symmetra",
          img: "./resources/summergames2016/sprays/symmetra.jpg"
        }, {
          name: "Torbj\u00D6rn",
          img: "./resources/summergames2016/sprays/torbjorn.jpg"
        }, {
          name: "Tracer",
          img: "./resources/summergames2016/sprays/tracer.jpg"
        }, {
          name: "Widowmaker",
          img: "./resources/summergames2016/sprays/widowmaker.jpg"
        }, {
          name: "Winston",
          img: "./resources/summergames2016/sprays/winston.jpg"
        }, {
          name: "Zarya",
          img: "./resources/summergames2016/sprays/zarya.jpg"
        }, {
          name: "Zenyatta",
          img: "./resources/summergames2016/sprays/zenyatta.jpg"
        }, {
          name: "Summer Games 2016",
          img: "./resources/summergames2016/sprays/summergames2016.jpg"
        }],
        icons: [{
          name: "Archery",
          img: "./resources/summergames2016/icons/archery.png"
        }, {
          name: "Badminton",
          img: "./resources/summergames2016/icons/badminton.png"
        }, {
          name: "Basketball",
          img: "./resources/summergames2016/icons/basketball.png"
        }, {
          name: "Boxing",
          img: "./resources/summergames2016/icons/boxing.png"
        }, {
          name: "Cycling",
          img: "./resources/summergames2016/icons/cycling.png"
        }, {
          name: "Dirt Biking",
          img: "./resources/summergames2016/icons/dirtbiking.png"
        }, {
          name: "Equestrian",
          img: "./resources/summergames2016/icons/equestrian.png"
        }, {
          name: "Diving",
          img: "./resources/summergames2016/icons/diving.png"
        }, {
          name: "Fencing",
          img: "./resources/summergames2016/icons/fencing.png"
        }, {
          name: "Football",
          img: "./resources/summergames2016/icons/football.png"
        }, {
          name: "Golf",
          img: "./resources/summergames2016/icons/golf.png"
        }, {
          name: "Gymnastics",
          img: "./resources/summergames2016/icons/gymnastics.png"
        }, {
          name: "Martial Arts",
          img: "./resources/summergames2016/icons/martialarts.png"
        }, {
          name: "Rhythmic Gymnastics",
          img: "./resources/summergames2016/icons/rhythmicgymnastics.png"
        }, {
          name: "Shooting",
          img: "./resources/summergames2016/icons/shooting.png"
        }, {
          name: "Table Tennis",
          img: "./resources/summergames2016/icons/tabletennis.png"
        }, {
          name: "Tennis",
          img: "./resources/summergames2016/icons/tennis.png"
        }, {
          name: "Track",
          img: "./resources/summergames2016/icons/track.png"
        }, {
          name: "Volleyball",
          img: "./resources/summergames2016/icons/volleyball.png"
        }, {
          name: "Water Polo",
          img: "./resources/summergames2016/icons/waterpolo.png"
        }, {
          name: "Weightlifting",
          img: "./resources/summergames2016/icons/weightlifting.png"
        }, {
          name: "Wrestling",
          img: "./resources/summergames2016/icons/wrestling.png"
        }, {
          name: "Summer Games",
          img: "./resources/summergames2016/icons/summergames.png"
        }, {
          name: "Australia",
          img: "./resources/summergames2016/icons/flags/australia.png"
        }, {
          name: "Brazil",
          img: "./resources/summergames2016/icons/flags/brazil.png"
        }, {
          name: "China",
          img: "./resources/summergames2016/icons/flags/china.png"
        }, {
          name: "Egypt",
          img: "./resources/summergames2016/icons/flags/egypt.png"
        }, {
          name: "France",
          img: "./resources/summergames2016/icons/flags/france.png"
        }, {
          name: "Germany",
          img: "./resources/summergames2016/icons/flags/germany.png"
        }, {
          name: "Greece",
          img: "./resources/summergames2016/icons/flags/greece.png"
        }, {
          name: "Japan",
          img: "./resources/summergames2016/icons/flags/japan.png"
        }, {
          name: "Mexico",
          img: "./resources/summergames2016/icons/flags/mexico.png"
        }, {
          name: "Nepal",
          img: "./resources/summergames2016/icons/flags/nepal.png"
        }, {
          name: "Numbani",
          img: "./resources/summergames2016/icons/flags/numbani.png"
        }, {
          name: "Russia",
          img: "./resources/summergames2016/icons/flags/russia.png"
        }, {
          name: "South Korea",
          img: "./resources/summergames2016/icons/flags/southkorea.png"
        }, {
          name: "Sweden",
          img: "./resources/summergames2016/icons/flags/sweden.png"
        }, {
          name: "Switzerland",
          img: "./resources/summergames2016/icons/flags/switzerland.png"
        }, {
          name: "United Kingdom",
          img: "./resources/summergames2016/icons/flags/unitedkingdom.png"
        }, {
          name: "United States",
          img: "./resources/summergames2016/icons/flags/unitedstates.png"
        }],
      }
    }, {
      name: 'Halloween 2016',
      id: 'halloween2016',
      items: {
        skinsLegendary: [{
          name: "Junkenstein Junkrat",
          img: "./resources/halloween2016/skins/legendary/junkrat.jpg"
        }, {
          name: "Monster Roadhog",
          img: "./resources/halloween2016/skins/legendary/roadhog.jpg"
        }, {
          name: "Witch Mercy",
          img: "./resources/halloween2016/skins/legendary/mercy.jpg"
        }, {
          name: "Pumpkin Reaper",
          img: "./resources/halloween2016/skins/legendary/reaper.jpg"
        }],
        skinsEpic: [{
          name: "Ghoul Ana",
          img: "./resources/halloween2016/skins/epic/ana.jpg"
        }, {
          name: "Tombstone Bastion",
          img: "./resources/halloween2016/skins/epic/bastion.jpg"
        }, {
          name: "Demon Hanzo",
          img: "./resources/halloween2016/skins/epic/hanzo.jpg"
        }, {
          name: "Possessed Pharah",
          img: "./resources/halloween2016/skins/epic/pharah.jpg"
        }, {
          name: "Coldhardt Reinhardt",
          img: "./resources/halloween2016/skins/epic/reinhardt.jpg"
        }, {
          name: "Immortal Soldier: 76",
          img: "./resources/halloween2016/skins/epic/soldier76.jpg"
        }, {
          name: "Vampire Symmetra",
          img: "./resources/halloween2016/skins/epic/symmetra.jpg"
        }, {
          name: "Skullyata Zenyatta",
          img: "./resources/halloween2016/skins/epic/zenyatta.jpg"
        }],
        intros: [{
          name: "Pumpkin Carving Genji",
          video: "./resources/halloween2016/intros/genji.webm"
        }, {
          name: "Ice Scream Mei",
          video: "./resources/halloween2016/intros/mei.webm"
        }, {
          name: "Eternal Rest Reaper",
          video: "./resources/halloween2016/intros/reaper.webm"
        }],
        emotes: [{
          name: "Candy Ana",
          video: "./resources/halloween2016/emotes/ana.webm"
        }, {
          name: "Pumpkin Smashing Reinhardt",
          video: "./resources/halloween2016/emotes/reinhardt.webm"
        }, {
          name: "Shadow Puppets Winston",
          video: "./resources/halloween2016/emotes/winston.webm"
        }],
        voicelines: [
          "Ana", "Bastion", "D.Va", "Genji", "Hanzo",
          "Junkrat", "L\u00DAcio", "McCree", "Mei", "Mercy",
          "Pharah", "Reaper", "Reinhardt", "Roadhog",
          "Soldier: 76", "Symmetra", "Torbj\u00D6rn", "Tracer",
          "Widowmaker", "Winston", "Zarya", "Zenyatta"
        ],
        victoryposes: [{
          name: "Ana",
          img: "./resources/halloween2016/poses/ana.jpg"
        }, {
          name: "Bastion",
          img: "./resources/halloween2016/poses/bastion.jpg"
        }, {
          name: "D.Va",
          img: "./resources/halloween2016/poses/dva.jpg"
        }, {
          name: "Genji",
          img: "./resources/halloween2016/poses/genji.jpg"
        }, {
          name: "Hanzo",
          img: "./resources/halloween2016/poses/hanzo.jpg"
        }, {
          name: "Junkrat",
          img: "./resources/halloween2016/poses/junkrat.jpg"
        }, {
          name: "L\u00DAcio",
          img: "./resources/halloween2016/poses/lucio.jpg"
        }, {
          name: "McCree",
          img: "./resources/halloween2016/poses/mccree.jpg"
        }, {
          name: "Mei",
          img: "./resources/halloween2016/poses/mei.jpg"
        }, {
          name: "Mercy",
          img: "./resources/halloween2016/poses/mercy.jpg"
        }, {
          name: "Pharah",
          img: "./resources/halloween2016/poses/pharah.jpg"
        }, {
          name: "Reaper",
          img: "./resources/halloween2016/poses/reaper.jpg"
        }, {
          name: "Reinhardt",
          img: "./resources/halloween2016/poses/reinhardt.jpg"
        }, {
          name: "Roadhog",
          img: "./resources/halloween2016/poses/roadhog.jpg"
        }, {
          name: "Soldier: 76",
          img: "./resources/halloween2016/poses/soldier76.jpg"
        }, {
          name: "Symmetra",
          img: "./resources/halloween2016/poses/symmetra.jpg"
        }, {
          name: "Torbj\u00D6rn",
          img: "./resources/halloween2016/poses/torbjorn.jpg"
        }, {
          name: "Tracer",
          img: "./resources/halloween2016/poses/tracer.jpg"
        }, {
          name: "Widowmaker",
          img: "./resources/halloween2016/poses/widowmaker.jpg"
        }, {
          name: "Winston",
          img: "./resources/halloween2016/poses/winston.jpg"
        }, {
          name: "Zarya",
          img: "./resources/halloween2016/poses/zarya.jpg"
        }, {
          name: "Zenyatta",
          img: "./resources/halloween2016/poses/zenyatta.jpg"
        }],
        sprays: [{
          name: "Ana",
          img: "./resources/halloween2016/sprays/ana.jpg"
        }, {
          name: "Bastion",
          img: "./resources/halloween2016/sprays/bastion.jpg"
        }, {
          name: "D.Va",
          img: "./resources/halloween2016/sprays/dva.jpg"
        }, {
          name: "Genji",
          img: "./resources/halloween2016/sprays/genji.jpg"
        }, {
          name: "Hanzo",
          img: "./resources/halloween2016/sprays/hanzo.jpg"
        }, {
          name: "Junkrat",
          img: "./resources/halloween2016/sprays/junkrat.jpg"
        }, {
          name: "L\u00DAcio",
          img: "./resources/halloween2016/sprays/lucio.jpg"
        }, {
          name: "McCree",
          img: "./resources/halloween2016/sprays/mccree.jpg"
        }, {
          name: "Mei",
          img: "./resources/halloween2016/sprays/mei.jpg"
        }, {
          name: "Mercy",
          img: "./resources/halloween2016/sprays/mercy.jpg"
        }, {
          name: "Pharah",
          img: "./resources/halloween2016/sprays/pharah.jpg"
        }, {
          name: "Reaper",
          img: "./resources/halloween2016/sprays/reaper.jpg"
        }, {
          name: "Reinhardt",
          img: "./resources/halloween2016/sprays/reinhardt.jpg"
        }, {
          name: "Roadhog",
          img: "./resources/halloween2016/sprays/roadhog.jpg"
        }, {
          name: "Soldier: 76",
          img: "./resources/halloween2016/sprays/soldier76.jpg"
        }, {
          name: "Symmetra",
          img: "./resources/halloween2016/sprays/symmetra.jpg"
        }, {
          name: "Torbj\u00D6rn",
          img: "./resources/halloween2016/sprays/torbjorn.jpg"
        }, {
          name: "Tracer",
          img: "./resources/halloween2016/sprays/tracer.jpg"
        }, {
          name: "Widowmaker",
          img: "./resources/halloween2016/sprays/widowmaker.jpg"
        }, {
          name: "Winston",
          img: "./resources/halloween2016/sprays/winston.jpg"
        }, {
          name: "Zarya",
          img: "./resources/halloween2016/sprays/zarya.jpg"
        }, {
          name: "Zenyatta",
          img: "./resources/halloween2016/sprays/zenyatta.jpg"
        }, {
          name: "...Never Die",
          img: "./resources/halloween2016/sprays/neverdie.jpg"
        }, {
          name: "Bats",
          img: "./resources/halloween2016/sprays/bats.jpg"
        }, {
          name: "Boo!",
          img: "./resources/halloween2016/sprays/boo.jpg"
        }, {
          name: "Boop!",
          img: "./resources/halloween2016/sprays/boop.jpg"
        }, {
          name: "Candyball",
          img: "./resources/halloween2016/sprays/candyball.jpg"
        }, {
          name: "Fangs",
          img: "./resources/halloween2016/sprays/fangs.jpg"
        }, {
          name: "Gummy Hog",
          img: "./resources/halloween2016/sprays/gummyhog.jpg"
        }, {
          name: "Halloween Terror",
          img: "./resources/halloween2016/sprays/halloweenterror.jpg"
        }, {
          name: "Pumpkins",
          img: "./resources/halloween2016/sprays/pumpkins.jpg"
        }, {
          name: "Witch's Brew",
          img: "./resources/halloween2016/sprays/witchsbrew.jpg"
        }],
        icons: [{
          name: "...Never Die",
          img: "./resources/halloween2016/icons/neverdie.png"
        }, {
          name: "Bewitching",
          img: "./resources/halloween2016/icons/bewitching.png"
        }, {
          name: "Calavera",
          img: "./resources/halloween2016/icons/calavera.png"
        }, {
          name: "Candle",
          img: "./resources/halloween2016/icons/candle.png"
        }, {
          name: "Eyeball",
          img: "./resources/halloween2016/icons/eyeball.png"
        }, {
          name: "Ghostymari",
          img: "./resources/halloween2016/icons/ghostymari.png"
        }, {
          name: "Halloween Terror 2016",
          img: "./resources/halloween2016/icons/halloweenterror.png"
        }, {
          name: "Spider",
          img: "./resources/halloween2016/icons/spider.png"
        }, {
          name: "Superstition",
          img: "./resources/halloween2016/icons/superstition.png"
        }, {
          name: "The Doctor",
          img: "./resources/halloween2016/icons/thedoctor.png"
        }, {
          name: "The Monster",
          img: "./resources/halloween2016/icons/themonster.png"
        }, {
          name: "The Reaper",
          img: "./resources/halloween2016/icons/thereaper.png"
        }, {
          name: "The Witch",
          img: "./resources/halloween2016/icons/thewitch.png"
        }, {
          name: "Tombstone",
          img: "./resources/halloween2016/icons/tombstone.png"
        }, {
          name: "Vampachimari",
          img: "./resources/halloween2016/icons/vampachimari.png"
        }, {
          name: "Witch's Brew",
          img: "./resources/halloween2016/icons/witchsbrew.png"
        }, {
          name: "Witch's Hat",
          img: "./resources/halloween2016/icons/witchshat.png"
        }, {
          name: "Wolf",
          img: "./resources/halloween2016/icons/wolf.png"
        }]
      }
    }, {
      name: 'Winter Wonderland 2016',
      id: 'winterwonderland',
      items: {
        skinsLegendary: [{
          hero: "mei",
          name: "Mei-rry",
          id: "meirry",
          quality: "legendary"
        }, {
          hero: "torbjorn",
          name: "Santaclad",
          id: "santaclad",
          quality: "legendary"
        }, {
          hero: "tracer",
          name: "Jingle",
          id: "jingle",
          quality: "legendary"
        }, {
          hero: "winston",
          name: "Yeti",
          id: "yeti",
          quality: "legendary"
        }, {
          hero: "zenyatta",
          name: "Nutcracker",
          id: "nutcracker",
          quality: "legendary"
        }, {
          hero: "zarya",
          name: "Mystery Gift",
          id: "mystery-gift",
          quality: "legendary"
        }],
        skinsEpic: [{
          hero: "lucio",
          name: "Andes",
          id: "andes",
          quality: "epic"
        }, {
          hero: "mccree",
          name: "Scrooge",
          id: "scrooge",
          quality: "epic"
        }, {
          hero: "pharah",
          name: "Frostbite",
          id: "frostbite",
          quality: "epic"
        }, {
          hero: "reaper",
          name: "Shiver",
          id: "shiver",
          quality: "epic"
        }, {
          hero: "roadhog",
          name: "Rudolph",
          id: "rudolph",
          quality: "epic"
        }, {
          hero: "sombra",
          name: "Peppermint",
          id: "peppermint",
          quality: "epic"
        }, {
          hero: "zarya",
          name: "Frosted",
          id: "frosted",
          quality: "epic"
        }],
        intros: [{
          hero: "symmetra",
          name: "Snowflakes",
          id: "snowflakes",
          quality: "epic"
        }, {
          hero: "widowmaker",
          name: "Under the Mistletoe",
          id: "under-the-mistletoe",
          quality: "epic"
        }],
        emotes: [{
          hero: "mccree",
          name: "Hat Trick",
          id: "hat-trick",
          quality: "epic"
        }, {
          hero: "mei",
          name: "Snowman",
          id: "snowman",
          quality: "epic"
        }],
        voicelines: [{
          hero: "ana",
          name: "I'm watching out for you",
          id: "im-watching-out-for-you",
          quality: "common"
        }, {
          hero: "bastion",
          name: "DWEE DOO HOO",
          id: "dwee-doo-hoo",
          quality: "common"
        }, {
          hero: "dva",
          name: "Aw, you shouldn't have",
          id: "aw-you-shouldnt-have",
          quality: "common"
        }, {
          hero: "genji",
          name: "Merry Christmas!",
          id: "merry-christmas",
          quality: "common"
        }, {
          hero: "hanzo",
          name: "A gift for you",
          id: "a-gift-for-you",
          quality: "common"
        }, {
          hero: "junkrat",
          name: "Merry Christmas",
          id: "merry-christmas",
          quality: "common"
        }, {
          hero: "lucio",
          name: "Happy holidays!",
          id: "happy-holidays",
          quality: "common"
        }, {
          hero: "mccree",
          name: "Had to break the ice",
          id: "had-to-break-the-ice",
          quality: "common"
        }, {
          hero: "mei",
          name: "I got you something!",
          id: "i-got-you-something",
          quality: "common"
        }, {
          hero: "mercy",
          name: "Your guardian angel",
          id: "your-guardian-angel",
          quality: "common"
        }, {
          hero: "pharah",
          name: "The forecast",
          id: "the-forecast",
          quality: "common"
        }, {
          hero: "reaper",
          name: "Holiday spirit",
          id: "holiday-spirit",
          quality: "common"
        }, {
          hero: "reinhardt",
          name: "You're on my naughty list",
          id: "youre-on-my-naughty-list",
          quality: "common"
        }, {
          hero: "roadhog",
          name: "Ho ho ho",
          id: "ho-ho-ho",
          quality: "common"
        }, {
          hero: "soldier-76",
          name: "Stay frosty",
          id: "stay-frosty",
          quality: "common"
        }, {
          hero: "sombra",
          name: "I know who's been naughty",
          id: "i-know-whos-been-naughty",
          quality: "common"
        }, {
          hero: "symmetra",
          name: "I made you something",
          id: "i-made-you-something",
          quality: "common"
        }, {
          hero: "torbjorn",
          name: "Made to order",
          id: "made-to-order",
          quality: "common"
        }, {
          hero: "tracer",
          name: "It's in the bag",
          id: "its-in-the-bag",
          quality: "common"
        }, {
          hero: "widowmaker",
          name: "Exquisite",
          id: "exquisite",
          quality: "common"
        }, {
          hero: "winston",
          name: "I... got you something",
          id: "i-got-you-something",
          quality: "common"
        }, {
          hero: "zarya",
          name: "For the Motherland",
          id: "for-the-motherland",
          quality: "common"
        }, {
          hero: "zenyatta",
          name: "No snowflake",
          id: "no-snowflake",
          quality: "common"
        }],
        sprays: [{
          hero: "ana",
          name: "Warm",
          id: "warm",
          quality: "common"
        }, {
          hero: "ana",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "bastion",
          name: "FESTIVE",
          id: "festive",
          quality: "common"
        }, {
          hero: "bastion",
          name: "ORNAMENT",
          id: "ornament",
          quality: "common"
        }, {
          hero: "dva",
          name: "COOKIE",
          id: "cookie",
          quality: "common"
        }, {
          hero: "dva",
          name: "ORNAMENT",
          id: "ornament",
          quality: "common"
        }, {
          hero: "genji",
          name: "Kadomatsu",
          id: "kadomatsu",
          quality: "common"
        }, {
          hero: "genji",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "hanzo",
          name: "Kadomatsu",
          id: "kadomatsu",
          quality: "common"
        }, {
          hero: "hanzo",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "junkrat",
          name: "\"WINTER\"",
          id: "winter",
          quality: "common"
        }, {
          hero: "junkrat",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "lucio",
          name: "Hockey",
          id: "hockey",
          quality: "common"
        }, {
          hero: "lucio",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "mccree",
          name: "Ugly Sweater",
          id: "ugly-sweater",
          quality: "common"
        }, {
          hero: "mccree",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "mei",
          name: "Sculpting",
          id: "sculpting",
          quality: "common"
        }, {
          hero: "mei",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "mercy",
          name: "Snow Angel",
          id: "snow-angel",
          quality: "common"
        }, {
          hero: "mercy",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "pharah",
          name: "Ice Fishing",
          id: "ice-fishing",
          quality: "common"
        }, {
          hero: "pharah",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "reaper",
          name: "Stocking",
          id: "stocking",
          quality: "common"
        }, {
          hero: "reaper",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "reinhardt",
          name: "Ice Fishing",
          id: "ice-fishing",
          quality: "common"
        }, {
          hero: "reinhardt",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "roadhog",
          name: "\"Winter\"",
          id: "winter",
          quality: "common"
        }, {
          hero: "roadhog",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "soldier-76",
          name: "Army Man: 76",
          id: "army-man-76",
          quality: "common"
        }, {
          hero: "soldier-76",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "sombra",
          name: "Puppet",
          id: "puppet",
          quality: "common"
        }, {
          hero: "sombra",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "symmetra",
          name: "Snowflake",
          id: "snowflake",
          quality: "common"
        }, {
          hero: "symmetra",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "torbjorn",
          name: "Workshop",
          id: "workshop",
          quality: "common"
        }, {
          hero: "torbjorn",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "tracer",
          name: "Snowboarding",
          id: "snowboarding",
          quality: "common"
        }, {
          hero: "tracer",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "widowmaker",
          name: "Skiing",
          id: "skiing",
          quality: "common"
        }, {
          hero: "widowmaker",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "winston",
          name: "Presents",
          id: "presents",
          quality: "common"
        }, {
          hero: "winston",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "zarya",
          name: "Matryoshka",
          id: "matryoshka",
          quality: "common"
        }, {
          hero: "zarya",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }, {
          hero: "zenyatta",
          name: "Snowball Fight",
          id: "snowball-fight",
          quality: "common"
        }, {
          hero: "zenyatta",
          name: "Ornament",
          id: "ornament",
          quality: "common"
        }],
        victoryposes: [{
          hero: "ana",
          name: "Toast",
          id: "toast",
          quality: "rare"
        }, {
          hero: "dva",
          name: "Festive",
          id: "festive",
          quality: "rare"
        }, {
          hero: "mercy",
          name: "Mistletoe",
          id: "mistletoe",
          quality: "rare"
        }, {
          hero: "pharah",
          name: "Toast",
          id: "toast",
          quality: "rare"
        }, {
          hero: "reinhardt",
          name: "Toast",
          id: "toast",
          quality: "rare"
        }, {
          hero: "soldier-76",
          name: "Toast",
          id: "toast",
          quality: "rare"
        }, {
          hero: "torbjorn",
          name: "Toast",
          id: "toast",
          quality: "rare"
        }],
        icons: [{
          hero: "torbjorn",
          name: "Santaclad",
          id: "santaclad",
          quality: "rare"
        }, {
          hero: "tracer",
          name: "Jingle",
          id: "jingle",
          quality: "rare"
        }, {
          hero: "winston",
          name: "Yeti",
          id: "yeti",
          quality: "rare"
        }, {
          hero: "zenyatta",
          name: "Nutcracker",
          id: "nutcracker",
          quality: "rare"
        }]
      }
    }]
  }
})
