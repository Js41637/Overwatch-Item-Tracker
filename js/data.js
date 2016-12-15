OWI.factory('Data', function() {
  var items = `{"legendary":{},"epic":{},"emotes":{},"intros":{},"sprays":{},"voicelines":{},"victoryposes":{},"icons":{}}`
  return {
    checked: {
      summergames2016: JSON.parse(items),
      halloween2016: JSON.parse(items),
      winterwonderland2016: JSON.parse(items)
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
      id: 'winterwonderland2016',
      items: {
        "sprays": [
          {
            "hero": "Ana",
            "name": "Warm",
            "id": "ana-warm",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/ana-warm.png"
          },
          {
            "hero": "Bastion",
            "name": "FESTIVE",
            "id": "bastion-festive",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/bastion-festive.png"
          },
          {
            "hero": "D.Va",
            "name": "COOKIE",
            "id": "dva-cookie",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/dva-cookie.png"
          },
          {
            "hero": "Genji",
            "name": "Kadomatsu",
            "id": "genji-kadomatsu",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/genji-kadomatsu.png"
          },
          {
            "hero": "Hanzo",
            "name": "Kadomatsu",
            "id": "hanzo-kadomatsu",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/hanzo-kadomatsu.png"
          },
          {
            "hero": "Junkrat",
            "name": "\"WINTER\"",
            "id": "junkrat-winter",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/junkrat-winter.png"
          },
          {
            "hero": "Lúcio",
            "name": "Hockey",
            "id": "lucio-hockey",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/lucio-hockey.png"
          },
          {
            "hero": "McCree",
            "name": "Ugly Sweater",
            "id": "mccree-ugly-sweater",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/mccree-ugly-sweater.png"
          },
          {
            "hero": "Mei",
            "name": "Sculpting",
            "id": "mei-sculpting",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/mei-sculpting.png"
          },
          {
            "hero": "Mercy",
            "name": "Snow Angel",
            "id": "mercy-snow-angel",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/mercy-snow-angel.png"
          },
          {
            "hero": "Pharah",
            "name": "Ice Fishing",
            "id": "pharah-ice-fishing",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/pharah-ice-fishing.png"
          },
          {
            "hero": "Reaper",
            "name": "Stocking",
            "id": "reaper-stocking",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/reaper-stocking.png"
          },
          {
            "hero": "Reinhardt",
            "name": "Ice Fishing",
            "id": "reinhardt-ice-fishing",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/reinhardt-ice-fishing.png"
          },
          {
            "hero": "Roadhog",
            "name": "\"Winter\"",
            "id": "roadhog-winter",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/roadhog-winter.png"
          },
          {
            "hero": "Soldier: 76",
            "name": "Army Man: 76",
            "id": "soldier-76-army-man-76",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/soldier-76-army-man-76.png"
          },
          {
            "hero": "Sombra",
            "name": "Puppet",
            "id": "sombra-puppet",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/sombra-puppet.png"
          },
          {
            "hero": "Symmetra",
            "name": "Snowflake",
            "id": "symmetra-snowflake",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/symmetra-snowflake.png"
          },
          {
            "hero": "Torbjörn",
            "name": "Workshop",
            "id": "torbjorn-workshop",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/torbjorn-workshop.png"
          },
          {
            "hero": "Tracer",
            "name": "Snowboarding",
            "id": "tracer-snowboarding",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/tracer-snowboarding.png"
          },
          {
            "hero": "Widowmaker",
            "name": "Skiing",
            "id": "widowmaker-skiing",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/widowmaker-skiing.png"
          },
          {
            "hero": "Winston",
            "name": "Presents",
            "id": "winston-presents",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/winston-presents.png"
          },
          {
            "hero": "Zarya",
            "name": "Matryoshka",
            "id": "zarya-matryoshka",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/zarya-matryoshka.png"
          },
          {
            "hero": "Zenyatta",
            "name": "Snowball Fight",
            "id": "zenyatta-snowball-fight",
            "quality": "common",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/zenyatta-snowball-fight.png"
          },
          {
            "name": "Winter Wonderland",
            "id": "winter-wonderland",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/winter-wonderland.png",
            "allClass": true
          },
          {
            "name": "SnowReaper",
            "id": "snowreaper",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/snowreaper.png",
            "allClass": true
          },
          {
            "name": "SnowMei",
            "id": "snowmei",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/snowmei.png",
            "allClass": true
          },
          {
            "name": "SnowHog",
            "id": "snowhog",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/snowhog.png",
            "allClass": true
          },
          {
            "name": "SnowCree",
            "id": "snowcree",
            "img": "./resources/WINTER_WONDERLAND_2016/sprays/snowcree.png",
            "allClass": true
          }
        ],
        "voice": [
          {
            "hero": "Ana",
            "name": "I'm watching out for you",
            "id": "ana-im-watching-out-for-you",
            "quality": "common"
          },
          {
            "hero": "Bastion",
            "name": "DWEE DOO HOO",
            "id": "bastion-dwee-doo-hoo",
            "quality": "common"
          },
          {
            "hero": "D.Va",
            "name": "Aw, you shouldn't have",
            "id": "dva-aw-you-shouldnt-have",
            "quality": "common"
          },
          {
            "hero": "Genji",
            "name": "Merry Christmas!",
            "id": "genji-merry-christmas",
            "quality": "common"
          },
          {
            "hero": "Hanzo",
            "name": "A gift for you",
            "id": "hanzo-a-gift-for-you",
            "quality": "common"
          },
          {
            "hero": "Junkrat",
            "name": "Merry Christmas",
            "id": "junkrat-merry-christmas",
            "quality": "common"
          },
          {
            "hero": "Lúcio",
            "name": "Happy holidays!",
            "id": "lucio-happy-holidays",
            "quality": "common"
          },
          {
            "hero": "McCree",
            "name": "Had to break the ice",
            "id": "mccree-had-to-break-the-ice",
            "quality": "common"
          },
          {
            "hero": "Mei",
            "name": "I got you something!",
            "id": "mei-i-got-you-something",
            "quality": "common"
          },
          {
            "hero": "Mercy",
            "name": "Your guardian angel",
            "id": "mercy-your-guardian-angel",
            "quality": "common"
          },
          {
            "hero": "Pharah",
            "name": "The forecast",
            "id": "pharah-the-forecast",
            "quality": "common"
          },
          {
            "hero": "Reaper",
            "name": "Holiday spirit",
            "id": "reaper-holiday-spirit",
            "quality": "common"
          },
          {
            "hero": "Reinhardt",
            "name": "You're on my naughty list",
            "id": "reinhardt-youre-on-my-naughty-list",
            "quality": "common"
          },
          {
            "hero": "Roadhog",
            "name": "Ho ho ho",
            "id": "roadhog-ho-ho-ho",
            "quality": "common"
          },
          {
            "hero": "Soldier: 76",
            "name": "Stay frosty",
            "id": "soldier-76-stay-frosty",
            "quality": "common"
          },
          {
            "hero": "Sombra",
            "name": "I know who's been naughty",
            "id": "sombra-i-know-whos-been-naughty",
            "quality": "common"
          },
          {
            "hero": "Symmetra",
            "name": "I made you something",
            "id": "symmetra-i-made-you-something",
            "quality": "common"
          },
          {
            "hero": "Torbjörn",
            "name": "Made to order",
            "id": "torbjorn-made-to-order",
            "quality": "common"
          },
          {
            "hero": "Tracer",
            "name": "It's in the bag",
            "id": "tracer-its-in-the-bag",
            "quality": "common"
          },
          {
            "hero": "Widowmaker",
            "name": "Exquisite",
            "id": "widowmaker-exquisite",
            "quality": "common"
          },
          {
            "hero": "Winston",
            "name": "I... got you something",
            "id": "winston-i-got-you-something",
            "quality": "common"
          },
          {
            "hero": "Zarya",
            "name": "For the Motherland",
            "id": "zarya-for-the-motherland",
            "quality": "common"
          },
          {
            "hero": "Zenyatta",
            "name": "No snowflake",
            "id": "zenyatta-no-snowflake",
            "quality": "common"
          }
        ],
        "poses": [
          {
            "hero": "D.Va",
            "name": "Festive",
            "id": "dva-festive",
            "quality": "rare",
            "img": "./resources/WINTER_WONDERLAND_2016/poses/dva-festive.jpg"
          },
          {
            "hero": "Mercy",
            "name": "Mistletoe",
            "id": "mercy-mistletoe",
            "quality": "rare",
            "img": "./resources/WINTER_WONDERLAND_2016/poses/mercy-mistletoe.jpg"
          },
          {
            "hero": "Ana",
            "name": "Toast",
            "id": "ana-toast",
            "quality": "rare",
            "img": "./resources/WINTER_WONDERLAND_2016/poses/ana-toast.jpg"
          },
          {
            "hero": "Pharah",
            "name": "Toast",
            "id": "pharah-toast",
            "quality": "rare",
            "img": "./resources/WINTER_WONDERLAND_2016/poses/pharah-toast.jpg"
          },
          {
            "hero": "Reinhardt",
            "name": "Toast",
            "id": "reinhardt-toast",
            "quality": "rare",
            "img": "./resources/WINTER_WONDERLAND_2016/poses/reinhardt-toast.jpg"
          },
          {
            "hero": "Soldier: 76",
            "name": "Toast",
            "id": "soldier-76-toast",
            "quality": "rare",
            "img": "./resources/WINTER_WONDERLAND_2016/poses/soldier-76-toast.jpg"
          },
          {
            "hero": "Torbjörn",
            "name": "Toast",
            "id": "torbjorn-toast",
            "quality": "rare",
            "img": "./resources/WINTER_WONDERLAND_2016/poses/torbjorn-toast.jpg"
          }
        ],
        "skinsEpic": [
          {
            "hero": "Lúcio",
            "name": "Andes",
            "id": "lucio-andes",
            "quality": "epic",
            "img": "./resources/WINTER_WONDERLAND_2016/skinsEpic/lucio-andes.jpg"
          },
          {
            "hero": "Pharah",
            "name": "Frostbite",
            "id": "pharah-frostbite",
            "quality": "epic",
            "img": "./resources/WINTER_WONDERLAND_2016/skinsEpic/pharah-frostbite.jpg"
          },
          {
            "hero": "Zarya",
            "name": "Frosted",
            "id": "zarya-frosted",
            "quality": "epic",
            "img": "./resources/WINTER_WONDERLAND_2016/skinsEpic/zarya-frosted.jpg"
          },
          {
            "hero": "Sombra",
            "name": "Peppermint",
            "id": "sombra-peppermint",
            "quality": "epic",
            "img": "./resources/WINTER_WONDERLAND_2016/skinsEpic/sombra-peppermint.jpg"
          },
          {
            "hero": "Roadhog",
            "name": "Rudolph",
            "id": "roadhog-rudolph",
            "quality": "epic",
            "img": "./resources/WINTER_WONDERLAND_2016/skinsEpic/roadhog-rudolph.jpg"
          },
          {
            "hero": "McCree",
            "name": "Scrooge",
            "id": "mccree-scrooge",
            "quality": "epic",
            "img": "./resources/WINTER_WONDERLAND_2016/skinsEpic/mccree-scrooge.jpg"
          },
          {
            "hero": "Reaper",
            "name": "Shiver",
            "id": "reaper-shiver",
            "quality": "epic",
            "img": "./resources/WINTER_WONDERLAND_2016/skinsEpic/reaper-shiver.jpg"
          }
        ],
        "emotes": [
          {
            "hero": "McCree",
            "name": "Hat Trick",
            "id": "mccree-hat-trick",
            "quality": "epic",
            "video": "./resources/WINTER_WONDERLAND_2016/emotes/mccree-hat-trick.webm"
          },
          {
            "hero": "Zarya",
            "legendary": true,
            "name": "Mystery Gift",
            "id": "zarya-mystery-gift",
            "quality": "legendary",
            "video": "./resources/WINTER_WONDERLAND_2016/emotes/zarya-mystery-gift.webm"
          },
          {
            "hero": "Mei",
            "name": "Snowman",
            "id": "mei-snowman",
            "quality": "epic",
            "video": "./resources/WINTER_WONDERLAND_2016/emotes/mei-snowman.webm"
          }
        ],
        "skinsLegendary": [
          {
            "hero": "Tracer",
            "name": "Jingle",
            "id": "tracer-jingle",
            "quality": "legendary",
            "img": "./resources/WINTER_WONDERLAND_2016/skinsLegendary/tracer-jingle.jpg"
          },
          {
            "hero": "Mei",
            "name": "Mei-rry",
            "id": "mei-meirry",
            "quality": "legendary",
            "img": "./resources/WINTER_WONDERLAND_2016/skinsLegendary/mei-meirry.jpg"
          },
          {
            "hero": "Zenyatta",
            "name": "Nutcracker",
            "id": "zenyatta-nutcracker",
            "quality": "legendary",
            "img": "./resources/WINTER_WONDERLAND_2016/skinsLegendary/zenyatta-nutcracker.jpg"
          },
          {
            "hero": "Torbjörn",
            "name": "Santaclad",
            "id": "torbjorn-santaclad",
            "quality": "legendary",
            "img": "./resources/WINTER_WONDERLAND_2016/skinsLegendary/torbjorn-santaclad.jpg"
          },
          {
            "hero": "Winston",
            "name": "Yeti",
            "id": "winston-yeti",
            "quality": "legendary",
            "img": "./resources/WINTER_WONDERLAND_2016/skinsLegendary/winston-yeti.jpg"
          }
        ],
        "intros": [
          {
            "hero": "Symmetra",
            "name": "Snowflakes",
            "id": "symmetra-snowflakes",
            "quality": "epic",
            "video": "./resources/WINTER_WONDERLAND_2016/intros/symmetra-snowflakes.webm"
          },
          {
            "hero": "Widowmaker",
            "name": "Under the Mistletoe",
            "id": "widowmaker-under-the-mistletoe",
            "quality": "epic",
            "video": "./resources/WINTER_WONDERLAND_2016/intros/widowmaker-under-the-mistletoe.webm"
          }
        ],
        "icons": [
          {
            "name": "2017",
            "id": "2017",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/2017.jpg",
            "allClass": true
          },
          {
            "name": "Bells",
            "id": "bells",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/bells.jpg",
            "allClass": true
          },
          {
            "name": "Bubbly",
            "id": "bubbly",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/bubbly.jpg",
            "allClass": true
          },
          {
            "name": "Candy Cane",
            "id": "candy-cane",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/candy-cane.jpg",
            "allClass": true
          },
          {
            "name": "Cheers",
            "id": "cheers",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/cheers.jpg",
            "allClass": true
          },
          {
            "name": "Dreidel",
            "id": "dreidel",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/dreidel.jpg",
            "allClass": true
          },
          {
            "name": "Gingerbread",
            "id": "gingerbread",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/gingerbread.jpg",
            "allClass": true
          },
          {
            "name": "Gingermari",
            "id": "gingermari",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/gingermari.jpg",
            "allClass": true
          },
          {
            "name": "Holly",
            "id": "holly",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/holly.jpg",
            "allClass": true
          },
          {
            "name": "Hot Cocoa",
            "id": "hot-cocoa",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/hot-cocoa.jpg",
            "allClass": true
          },
          {
            "hero": "Tracer",
            "name": "Jingle",
            "id": "tracer-jingle",
            "quality": "rare",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/tracer-jingle.jpg"
          },
          {
            "name": "Mochi",
            "id": "mochi",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/mochi.jpg",
            "allClass": true
          },
          {
            "hero": "Zenyatta",
            "name": "Nutcracker",
            "id": "zenyatta-nutcracker",
            "quality": "rare",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/zenyatta-nutcracker.jpg"
          },
          {
            "name": "Ornament",
            "id": "ornament",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/ornament.jpg",
            "allClass": true
          },
          {
            "name": "Pachimerry",
            "id": "pachimerry",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/pachimerry.jpg",
            "allClass": true
          },
          {
            "name": "Pachireindeer",
            "id": "pachireindeer",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/pachireindeer.jpg",
            "allClass": true
          },
          {
            "name": "Peppermint",
            "id": "peppermint",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/peppermint.jpg",
            "allClass": true
          },
          {
            "name": "Present",
            "id": "present",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/present.jpg",
            "allClass": true
          },
          {
            "hero": "Torbjörn",
            "name": "Santaclad",
            "id": "torbjorn-santaclad",
            "quality": "rare",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/torbjorn-santaclad.jpg"
          },
          {
            "name": "Snow Globe",
            "id": "snow-globe",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/snow-globe.jpg",
            "allClass": true
          },
          {
            "name": "Snowman",
            "id": "snowman",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/snowman.jpg",
            "allClass": true
          },
          {
            "name": "Stocking",
            "id": "stocking",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/stocking.jpg",
            "allClass": true
          },
          {
            "name": "Tannenbaum",
            "id": "tannenbaum",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/tannenbaum.jpg",
            "allClass": true
          },
          {
            "name": "Winter Wonderland",
            "id": "winter-wonderland",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/winter-wonderland.jpg",
            "allClass": true
          },
          {
            "name": "Wreath",
            "id": "wreath",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/wreath.jpg",
            "allClass": true
          },
          {
            "hero": "Winston",
            "name": "Yeti",
            "id": "winston-yeti",
            "quality": "rare",
            "img": "./resources/WINTER_WONDERLAND_2016/icons/winston-yeti.jpg"
          }
        ]
      }
    }]
  }
})
