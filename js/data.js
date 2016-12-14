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
          quality: "legendary",
          img: "./resources/WINTER_WONDERLAND_2016/skins/mei-meirry.jpg"
        }, {
          hero: "torbjorn",
          name: "Santaclad",
          id: "santaclad",
          quality: "legendary",
          img: "./resources/WINTER_WONDERLAND_2016/skins/torbjorn-santaclad.jpg"
        }, {
          hero: "tracer",
          name: "Jingle",
          id: "jingle",
          quality: "legendary",
          img: "./resources/WINTER_WONDERLAND_2016/skins/tracer-jingle.jpg"
        }, {
          hero: "winston",
          name: "Yeti",
          id: "yeti",
          quality: "legendary",
          img: "./resources/WINTER_WONDERLAND_2016/skins/winston-yeti.jpg"
        }, {
          hero: "zenyatta",
          name: "Nutcracker",
          id: "nutcracker",
          quality: "legendary",
          img: "./resources/WINTER_WONDERLAND_2016/skins/zenyatta-nutcracker.jpg"
        }],
        skinsEpic: [{
          hero: "lucio",
          name: "Andes",
          id: "andes",
          quality: "epic",
          img: "./resources/WINTER_WONDERLAND_2016/skins/lucio-andes.jpg"
        }, {
          hero: "mccree",
          name: "Scrooge",
          id: "scrooge",
          quality: "epic",
          img: "./resources/WINTER_WONDERLAND_2016/skins/mccree-scrooge.jpg"
        }, {
          hero: "pharah",
          name: "Frostbite",
          id: "frostbite",
          quality: "epic",
          img: "./resources/WINTER_WONDERLAND_2016/skins/pharah-frostbite.jpg"
        }, {
          hero: "reaper",
          name: "Shiver",
          id: "shiver",
          quality: "epic",
          img: "./resources/WINTER_WONDERLAND_2016/skins/reaper-shiver.jpg"
        }, {
          hero: "roadhog",
          name: "Rudolph",
          id: "rudolph",
          quality: "epic",
          img: "./resources/WINTER_WONDERLAND_2016/skins/roadhog-rudolph.jpg"
        }, {
          hero: "sombra",
          name: "Peppermint",
          id: "peppermint",
          quality: "epic",
          img: "./resources/WINTER_WONDERLAND_2016/skins/sombra-peppermint.jpg"
        }, {
          hero: "zarya",
          name: "Frosted",
          id: "frosted",
          quality: "epic",
          img: "./resources/WINTER_WONDERLAND_2016/skins/zarya-frosted.jpg"
        }],
        emotes: [{
          hero: "mccree",
          name: "Hat Trick",
          id: "hat-trick",
          quality: "epic",
          video: "./resources/WINTER_WONDERLAND_2016/emotes/mccree-hat-trick.webm"
        }, {
          hero: "mei",
          name: "Snowman",
          id: "snowman",
          quality: "epic",
          video: "./resources/WINTER_WONDERLAND_2016/emotes/mei-snowman.webm"
        }, {
          hero: "zarya",
          name: "Mystery Gift",
          id: "mystery-gift",
          quality: "legendary",
          video: "./resources/WINTER_WONDERLAND_2016/emotes/zarya-mystery-gift.webm"
        }],
        intros: [{
          hero: "symmetra",
          name: "Snowflakes",
          id: "snowflakes",
          quality: "epic",
          video: "./resources/WINTER_WONDERLAND_2016/intros/symmetra-snowflakes.webm"
        }, {
          hero: "widowmaker",
          name: "Under the Mistletoe",
          id: "under-the-mistletoe",
          quality: "epic",
          video: "./resources/WINTER_WONDERLAND_2016/intros/widowmaker-under-the-mistletoe.webm"
        }],
        sprays: [{
          hero: "ana",
          name: "Warm",
          id: "warm",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/ana-warm.png"
        }, {
          hero: "ana",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/ana-ornament.png"
        }, {
          hero: "bastion",
          name: "FESTIVE",
          id: "festive",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/bastion-festive.png"
        }, {
          hero: "bastion",
          name: "ORNAMENT",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/bastion-ornament.png"
        }, {
          hero: "dva",
          name: "COOKIE",
          id: "cookie",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/dva-cookie.png"
        }, {
          hero: "dva",
          name: "ORNAMENT",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/dva-ornament.png"
        }, {
          hero: "genji",
          name: "Kadomatsu",
          id: "kadomatsu",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/genji-kadomatsu.png"
        }, {
          hero: "genji",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/genji-ornament.png"
        }, {
          hero: "hanzo",
          name: "Kadomatsu",
          id: "kadomatsu",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/hanzo-kadomatsu.png"
        }, {
          hero: "hanzo",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/hanzo-ornament.png"
        }, {
          hero: "junkrat",
          name: "\"WINTER\"",
          id: "winter",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/junkrat-winter.png"
        }, {
          hero: "junkrat",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/junkrat-ornament.png"
        }, {
          hero: "lucio",
          name: "Hockey",
          id: "hockey",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/lucio-hockey.png"
        }, {
          hero: "lucio",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/lucio-ornament.png"
        }, {
          hero: "mccree",
          name: "Ugly Sweater",
          id: "ugly-sweater",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/mccree-ugly-sweater.png"
        }, {
          hero: "mccree",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/mccree-ornament.png"
        }, {
          hero: "mei",
          name: "Sculpting",
          id: "sculpting",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/mei-sculpting.png"
        }, {
          hero: "mei",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/mei-ornament.png"
        }, {
          hero: "mercy",
          name: "Snow Angel",
          id: "snow-angel",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/mercy-snow-angel.png"
        }, {
          hero: "mercy",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/mercy-ornament.png"
        }, {
          hero: "pharah",
          name: "Ice Fishing",
          id: "ice-fishing",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/pharah-ice-fishing.png"
        }, {
          hero: "pharah",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/pharah-ornament.png"
        }, {
          hero: "reaper",
          name: "Stocking",
          id: "stocking",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/reaper-stocking.png"
        }, {
          hero: "reaper",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/reaper-ornament.png"
        }, {
          hero: "reinhardt",
          name: "Ice Fishing",
          id: "ice-fishing",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/reinhardt-ice-fishing.png"
        }, {
          hero: "reinhardt",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/reinhardt-ornament.png"
        }, {
          hero: "roadhog",
          name: "\"Winter\"",
          id: "winter",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/roadhog-winter.png"
        }, {
          hero: "roadhog",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/roadhog-ornament.png"
        }, {
          hero: "soldier-76",
          name: "Army Man: 76",
          id: "army-man-76",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/soldier-76-army-man-76.png"
        }, {
          hero: "soldier-76",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/soldier-76-ornament.png"
        }, {
          hero: "sombra",
          name: "Puppet",
          id: "puppet",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/sombra-puppet.png"
        }, {
          hero: "sombra",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/sombra-ornament.png"
        }, {
          hero: "symmetra",
          name: "Snowflake",
          id: "snowflake",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/symmetra-snowflake.png"
        }, {
          hero: "symmetra",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/symmetra-ornament.png"
        }, {
          hero: "torbjorn",
          name: "Workshop",
          id: "workshop",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/torbjorn-workshop.png"
        }, {
          hero: "torbjorn",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/torbjorn-ornament.png"
        }, {
          hero: "tracer",
          name: "Snowboarding",
          id: "snowboarding",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/tracer-snowboarding.png"
        }, {
          hero: "tracer",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/tracer-ornament.png"
        }, {
          hero: "widowmaker",
          name: "Skiing",
          id: "skiing",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/widowmaker-skiing.png"
        }, {
          hero: "widowmaker",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/widowmaker-ornament.png"
        }, {
          hero: "winston",
          name: "Presents",
          id: "presents",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/winston-presents.png"
        }, {
          hero: "winston",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/winston-ornament.png"
        }, {
          hero: "zarya",
          name: "Matryoshka",
          id: "matryoshka",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/zarya-matryoshka.png"
        }, {
          hero: "zarya",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/zarya-ornament.png"
        }, {
          hero: "zenyatta",
          name: "Snowball Fight",
          id: "snowball-fight",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/zenyatta-snowball-fight.png"
        }, {
          hero: "zenyatta",
          name: "Ornament",
          id: "ornament",
          quality: "common",
          img: "./resources/WINTER_WONDERLAND_2016/sprays/zenyatta-ornament.png"
        }, {
          name: "SnowCree",
          id: "snowcree",
          url: "./resources/WINTER_WONDERLAND_2016/sprays/snowcree.png",
          allClass: true
        }, {
          name: "SnowHog",
          id: "snowhog",
          url: "./resources/WINTER_WONDERLAND_2016/sprays/snowhog.png",
          allClass: true
        }, {
          name: "SnowMei",
          id: "snowmei",
          url: "./resources/WINTER_WONDERLAND_2016/sprays/snowmei.png",
          allClass: true
        }, {
          name: "SnowReaper",
          id: "snowreaper",
          url: "./resources/WINTER_WONDERLAND_2016/sprays/snowreaper.png",
          allClass: true
        }, {
          name: "Winter Wonderland",
          id: "winter-wonderland",
          url: "./resources/WINTER_WONDERLAND_2016/sprays/winter-wonderland.png",
          allClass: true
        }],
        voice: [{
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
        victoryposes: [{
          hero: "ana",
          name: "Toast",
          id: "toast",
          quality: "rare",
          img: "./resources/WINTER_WONDERLAND_2016/poses/ana-toast.jpg"
        }, {
          hero: "dva",
          name: "Festive",
          id: "festive",
          quality: "rare",
          img: "./resources/WINTER_WONDERLAND_2016/poses/dva-festive.jpg"
        }, {
          hero: "mercy",
          name: "Mistletoe",
          id: "mistletoe",
          quality: "rare",
          img: "./resources/WINTER_WONDERLAND_2016/poses/mercy-mistletoe.jpg"
        }, {
          hero: "pharah",
          name: "Toast",
          id: "toast",
          quality: "rare",
          img: "./resources/WINTER_WONDERLAND_2016/poses/pharah-toast.jpg"
        }, {
          hero: "reinhardt",
          name: "Toast",
          id: "toast",
          quality: "rare",
          img: "./resources/WINTER_WONDERLAND_2016/poses/reinhardt-toast.jpg"
        }, {
          hero: "soldier-76",
          name: "Toast",
          id: "toast",
          quality: "rare",
          img: "./resources/WINTER_WONDERLAND_2016/poses/soldier-76-toast.jpg"
        }, {
          hero: "torbjorn",
          name: "Toast",
          id: "toast",
          quality: "rare",
          img: "./resources/WINTER_WONDERLAND_2016/poses/torbjorn-toast.jpg"
        }],
        icons: [{
          hero: "torbjorn",
          name: "Santaclad",
          id: "santaclad",
          quality: "rare",
          img: "./resources/WINTER_WONDERLAND_2016/icons/torbjorn-santaclad.jpg"
        }, {
          hero: "tracer",
          name: "Jingle",
          id: "jingle",
          quality: "rare",
          img: "./resources/WINTER_WONDERLAND_2016/icons/tracer-jingle.jpg"
        }, {
          hero: "winston",
          name: "Yeti",
          id: "yeti",
          quality: "rare",
          img: "./resources/WINTER_WONDERLAND_2016/icons/winston-yeti.jpg"
        }, {
          hero: "zenyatta",
          name: "Nutcracker",
          id: "nutcracker",
          quality: "rare",
          img: "./resources/WINTER_WONDERLAND_2016/icons/zenyatta-nutcracker.jpg"
        }, {
          name: "Winter Wonderland 2016",
          id: "winter-wonderland-2016",
          url: "./resources/WINTER_WONDERLAND_2016/icons/winter-wonderland-2016.jpg",
          allClass: true
        }, {
          name: "Snowman",
          id: "snowman",
          url: "./resources/WINTER_WONDERLAND_2016/icons/snowman.jpg",
          allClass: true
        }, {
          name: "Present",
          id: "present",
          url: "./resources/WINTER_WONDERLAND_2016/icons/present.jpg",
          allClass: true
        }, {
          name: "Pachimerry",
          id: "pachimerry",
          url: "./resources/WINTER_WONDERLAND_2016/icons/pachimerry.jpg",
          allClass: true
        }, {
          name: "Gingermari",
          id: "gingermari",
          url: "./resources/WINTER_WONDERLAND_2016/icons/gingermari.jpg",
          allClass: true
        }, {
          name: "2017",
          id: "2017",
          url: "./resources/WINTER_WONDERLAND_2016/icons/2017.jpg",
          allClass: true
        }, {
          name: "Holly",
          id: "holly",
          url: "./resources/WINTER_WONDERLAND_2016/icons/holly.jpg",
          allClass: true
        }, {
          name: "Tannenbaum",
          id: "tannenbaum",
          url: "./resources/WINTER_WONDERLAND_2016/icons/tannenbaum.jpg",
          allClass: true
        }, {
          name: "Bubbly",
          id: "bubbly",
          url: "./resources/WINTER_WONDERLAND_2016/icons/bubbly.jpg",
          allClass: true
        }, {
          name: "Gingerbread",
          id: "gingerbread",
          url: "./resources/WINTER_WONDERLAND_2016/icons/gingerbread.jpg",
          allClass: true
        }, {
          name: "Candy Cane",
          id: "candy-cane",
          url: "./resources/WINTER_WONDERLAND_2016/icons/candy-cane.jpg",
          allClass: true
        }, {
          name: "Ornament",
          id: "ornament",
          url: "./resources/WINTER_WONDERLAND_2016/icons/ornament.jpg",
          allClass: true
        }, {
          name: "Hot Cocoa",
          id: "hot-cocoa",
          url: "./resources/WINTER_WONDERLAND_2016/icons/hot-cocoa.jpg",
          allClass: true
        }, {
          name: "Cheers",
          id: "cheers",
          url: "./resources/WINTER_WONDERLAND_2016/icons/cheers.jpg",
          allClass: true
        }, {
          name: "Wreath",
          id: "wreath",
          url: "./resources/WINTER_WONDERLAND_2016/icons/wreath.jpg",
          allClass: true
        }, {
          name: "Mochi",
          id: "mochi",
          url: "./resources/WINTER_WONDERLAND_2016/icons/mochi.jpg",
          allClass: true
        }, {
          name: "Dreidel",
          id: "dreidel",
          url: "./resources/WINTER_WONDERLAND_2016/icons/dreidel.jpg",
          allClass: true
        }, {
          name: "Bells",
          id: "bells",
          url: "./resources/WINTER_WONDERLAND_2016/icons/bells.jpg",
          allClass: true
        }, {
          name: "Peppermint",
          id: "peppermint",
          url: "./resources/WINTER_WONDERLAND_2016/icons/peppermint.jpg",
          allClass: true
        }, {
          name: "Snow Globe",
          id: "snow-globe",
          url: "./resources/WINTER_WONDERLAND_2016/icons/snow-globe.jpg",
          allClass: true
        }]
      }
    }]
  }
})
