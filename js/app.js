var OWI = angular.module('OWI', ['ui.bootstrap', 'pascalprecht.translate'])

OWI.config(['$compileProvider', '$translateProvider', function($compileProvider, $translateProvider) {
  $compileProvider.debugInfoEnabled(false);

  $translateProvider.useStaticFilesLoader({
    prefix: '/locales/',
    suffix: '.json'
  });
  var settings = localStorage.getItem('settings');
  if (settings) {
    console.log('Seleced language from localStorage');
    $translateProvider.preferredLanguage(JSON.parse(settings).langKey);
  } else {
    console.log('Seleced default language');
    $translateProvider.preferredLanguage('en_US');
  }
  $translateProvider.fallbackLanguage('en_US');
}])

// Run migrations to convert data and stuff
OWI.run(function() {
  var storedData = localStorage.getItem('data');
  var data = storedData ? JSON.parse(storedData) : false;
  var migrations = [
    {
      name: 'Fix Ornament Sprays',
      id: 0,
      run: function() {
        if (!data.winterwonderland2016 || !data.winterwonderland2016.sprays) return
        var badEggs = ["ana-warm-ornament", "bastion-festive-ornament", "dva-cookie-ornament", "genji-kadomatsu-ornament", "hanzo-kadomatsu-ornament", "junkrat-winter-ornament", "lucio-hockey-ornament", "mccree-ugly-sweater-ornament", "mei-sculpting-ornament", "mercy-snow-angel-ornament", "pharah-ice-fishing-ornament", "reaper-stocking-ornament", "reinhardt-ice-fishing-ornament", "roadhog-winter-ornament", "soldier-76-army-man-76-ornament", "sombra-puppet-ornament", "symmetra-snowflake-ornament", "torbjorn-workshop-ornament", "tracer-snowboarding-ornament", "widowmaker-skiing-ornament", "winston-presents-ornament", "zarya-matryoshka-ornament", "zenyatta-snowball-fight-ornament"]
        var newEggs = {}
        Object.keys(data.winterwonderland2016.sprays).forEach(function(id) {
          var spray = data.winterwonderland2016.sprays[id]
          badEggs.includes(id) ? (newEggs[`${id.split('-')[0]}-ornament`] = spray) : (newEggs[id] = spray);
        })
        data.winterwonderland2016.sprays = newEggs
      }
    },
    {
      name: 'Fix voice, poses and skins mappings',
      id: 1,
      run: function() {
        Object.keys(data).forEach(function(event) {
          event = data[event];
          event.voicelines = Object.assign({}, event.voicelines, event.voice);
          event.poses = Object.assign({}, event.poses, event.victoryposes);
          event.skinsEpic = Object.assign({}, event.skinsEpic, event.epic);
          event.skinsLegendary = Object.assign({}, event.skinsLegendary, event.legendary);
          delete event.voice;
          delete event.legendary;
          delete event.epic;
          delete event.victoryposes;
        });
      }
    }, {
      name: "Convert Halloween and SummerGames to new Data",
      id: 2,
      run: function() {
        // I had to make this bad boi manually.
        var newData = {"halloween2016":{"skinsLegendary":{"Junkenstein Junkrat":"junkrat-dr-junkenstein","Monster Roadhog":"roadhog-junkensteins-monster","Witch Mercy":"mercy-witch","Pumpkin Reaper":"reaper-pumpkin"},"skinsEpic":{"Ghoul Ana":"ana-ghoul","Tombstone Bastion":"bastion-tombstone","Demon Hanzo":"hanzo-demon","Possessed Pharah":"pharah-possessed","Coldhardt Reinhardt":"reinhardt-coldhardt","Immortal Soldier: 76":"soldier-76-immortal","Vampire Symmetra":"symmetra-vampire","Skullyata Zenyatta":"zenyatta-skullyatta"},"emotes":{"Candy Ana":"ana-candy","Pumpkin Smashing Reinhardt":"reinhardt-pumpkin-smash","Shadow Puppets Winston":"winston-shadow-puppets"},"intros":{"Pumpkin Carving Genji":"genji-pumpkin-carving","Ice Scream Mei":"mei-ice-scream","Eternal Rest Reaper":"reaper-eternal-rest"},"sprays":{"Ana":"ana-trick-or-treat","Bastion":"bastion-trick-or-treat","D.Va":"dva-trick-or-treat","Genji":"genji-trick-or-treat","Hanzo":"hanzo-trick-or-treat","Junkrat":"junkrat-trick-or-treat","LÚcio":"lucio-trick-or-treat","McCree":"mccree-trick-or-treat","Mei":"mei-trick-or-treat","Mercy":"mercy-trick-or-treat","Pharah":"pharah-trick-or-treat","Reaper":"reaper-trick-or-treat","Reinhardt":"reinhardt-trick-or-treat","Roadhog":"roadhog-trick-or-treat","Soldier: 76":"soldier-76-trick-or-treat","Symmetra":"symmetra-trick-or-treat","TorbjÖrn":"torbjorn-trick-or-treat","Tracer":"tracer-trick-or-treat","Widowmaker":"widowmaker-trick-or-treat","Winston":"winston-trick-or-treat","Zarya":"zarya-trick-or-treat","Zenyatta":"zenyatta-trick-or-treat","...Never Die":"never-die","Bats":"bats","Boo!":"boo","Boop!":"boop","Candyball":"candyball","Fangs":"fangs","Gummy Hog":"gummy-hog","Halloween Terror":"halloween-terror-2016","Pumpkins":"pumpkins","Witch's Brew":"witchs-brew"},"voicelines":{"Ana":"ana-are-you-scared","Bastion":"bastion-wwwooooo","D.Va":"dva-happy-halloween","Genji":"genji-my-halloween-costume","Hanzo":"hanzo-you-are-already-dead","Junkrat":"junkrat-happy-halloween","LÚcio":"lucio-killed-it","McCree":"mccree-its-your-funeral","Mei":"mei-scary","Mercy":"mercy-superstition","Pharah":"pharah-dead-or-alive","Reaper":"reaper-i-work-the-graveyard-shift","Reinhardt":"reinhardt-smashing","Roadhog":"roadhog-want-some-candy","Soldier: 76":"soldier-76-knock-knock","Symmetra":"symmetra-a-frightening-thought","TorbjÖrn":"torbjorn-if-you-build-it","Tracer":"tracer-ooh-scary","Widowmaker":"widowmaker-the-party-is-over","Winston":"winston-this-is-not-a-costume","Zarya":"zarya-never-forget-the-fallen","Zenyatta":"zenyatta-trick-or-treat"},"poses":{"Ana":"ana-rip","Bastion":"bastion-rip","D.Va":"dva-rip","Genji":"genji-rip","Hanzo":"hanzo-rip","Junkrat":"junkrat-rip","LÚcio":"lucio-rip","McCree":"mccree-rip","Mei":"mei-rip","Mercy":"mercy-rip","Pharah":"pharah-rip","Reaper":"reaper-rip","Reinhardt":"reinhardt-rip","Roadhog":"roadhog-rip","Soldier: 76":"soldier-76-rip","Symmetra":"symmetra-rip","TorbjÖrn":"torbjorn-rip","Tracer":"tracer-rip","Widowmaker":"widowmaker-rip","Winston":"winston-rip","Zarya":"zarya-rip","Zenyatta":"zenyatta-rip"},"icons":{"...Never Die":"never-die","Bewitching":"bewitching","Calavera":"calavera","Candle":"candle","Eyeball":"eyeball","Ghostymari":"ghostymari","Halloween Terror 2016":"halloween-terror","Spider":"spider","Superstition":"superstition","The Doctor":"junkrat-the-doctor","The Monster":"roadhog-the-monster","The Reaper":"reaper-the-reaper","The Witch":"mercy-the-witch","Tombstone":"tombstone","Vampachimari":"vampachimari","Witch's Brew":"witchs-brew","Witch's Hat":"witchs-hat","Wolf":"wolf"}},"summergames2016":{"skinsLegendary":{"Selecao":"lucio-selecao","Striker":"lucio-striker","Sprinter":"tracer-sprinter","Track & Field":"tracer-track-and-field","Weightlifter":"zarya-weightlifter","Champion":"zarya-champion"},"skinsEpic":{"Taegeukgi D.Va":"dva-taegeukgi","Nihon Genji":"genji-nihon","American Mccree":"mccree-american","Edigenossin Mercy":"mercy-eidgenossin","Tre Kronor TorbjÖrn":"torbjorn-tre-kronor","Tricolore Widowmaker":"widowmaker-tricolore"},"emotes":{"Boxing Bastion":"bastion-boxing","Juggle LÚcio":"lucio-juggle","Ribbon Symmetra":"symmetra-ribbon"},"intros":{"Shotput Junkrat":"junkrat-shot-put","Bicycle Kick LÚcio":"lucio-bicycle-kick","Hurdle Tracer":"tracer-hurdle"},"sprays":{"Ana":"ana-shooting","Bastion":"bastion-boxing","D.Va":"dva-cycling","Genji":"genji-fencing","Hanzo":"hanzo-archery","Junkrat":"junkrat-tennis","LÚcio":"lucio-football","McCree":"mccree-equestrian","Mei":"mei-table-tennis","Mercy":"mercy-badminton","Pharah":"pharah-basketball","Reaper":"reaper-bmx","Reinhardt":"reinhardt-wrestling","Roadhog":"roadhog-diving","Soldier: 76":"soldier-76-golf","Symmetra":"symmetra-rhythmic","TorbjÖrn":"torbjorn-water-polo","Tracer":"tracer-track","Widowmaker":"widowmaker-gymnastics","Winston":"winston-volleyball","Zarya":"zarya-weightlifting","Zenyatta":"zenyatta-taekwondo","Summer Games 2016":"summer-games"},"voicelines":{"Ana":"ana-learn-from-the-pain","Bastion":"bastion-whoovweeeeee","D.Va":"dva-im-1","Genji":"genji-i-was-hoping-for-a-challenge","Hanzo":"hanzo-ignore-all-distractions","Junkrat":"junkrat-i-give-it-a-10","LÚcio":"lucio-be-champions","McCree":"mccree-i-dont-much-like-losing","Mei":"mei-overcome-all-obstacles","Mercy":"mercy-piece-of-cake","Pharah":"pharah-we-are-in-this-together","Reaper":"reaper-its-in-the-refrigerator","Reinhardt":"reinhardt-100-german-power","Roadhog":"roadhog-whats-mine-is-mine","Soldier: 76":"soldier-76-you-want-a-medal","Symmetra":"symmetra-hard-work-and-dedication","TorbjÖrn":"torbjorn-more-where-that-came-from","Tracer":"tracer-eat-my-dust","Widowmaker":"widowmaker-i-dont-miss","Winston":"winston-playtimes-over","Zarya":"zarya-no-pain-no-gain","Zenyatta":"zenyatta-strive-for-improvement"},"poses":{"Mei":"mei-medal","Pharah":"pharah-medal","Reaper":"reaper-medal","Roadhog":"roadhog-medal","Soldier: 76":"soldier-76-golf-swing","TorbjÖrn":"torbjorn-medal","Widowmaker":"widowmaker-medal","Winston":"winston-medal","Zenyatta":"zenyatta-medals"},"icons":{"Archery":"hanzo-archery","Badminton":"mercy-badminton","Basketball":"pharah-basketball","BMX":"reaper-bmx","Boxing":"bastion-boxing","Cycling":"dva-cycling","Equestrian":"mccree-equestrian","Diving":"roadhog-diving","Fencing":"genji-fencing","Football":"lucio-football","Golf":"soldier-76-golf","Gymnastics":"widowmaker-gymnastics","Rhythmic Gymnastics":"symmetra-rhythmic-gymnastics","Shooting":"ana-shooting","Table Tennis":"mei-table-tennis","Taekwondo":"zenyatta-taekwondo","Tennis":"junkrat-tennis","Track":"tracer-track","Volleyball":"winston-volleyball","Water Polo":"torbjorn-water-polo","Weightlifting":"zarya-weightlifting","Wrestling":"reinhardt-wrestling","Summer Games":"summer-games","Australia":"australia","Brazil":"brazil","China":"china","Egypt":"egypt","France":"france","Germany":"germany","Greece":"greece","Japan":"japan","Mexico":"mexico","Nepal":"nepal","Numbani":"numbani","Russia":"russia","South Korea":"south-korea","Sweden":"sweden","Switzerland":"switzerland","United Kingdom":"united-kingdom","United States":"united-states"}}}
        Object.keys(data).forEach(function(eventname) {
          if (eventname != 'halloween2016' || eventname !== 'summergames2016') return // only summergames and halloween
          var event = data[eventname];
          Object.keys(event).forEach(function(type) {
            Object.keys(event[type]).forEach(function(item) {
              if (!(item in newData[eventname][type])) return;
              event[type][newData[eventname][type][item]] = event[type][item]; // Add new entry with item ID and its selected status
              delete event[type][item]; // Delete old entry
            });
          });
        });
      }
    }, {
      name: "Fix Bokimario",
      id: 3,
      run: function() {
        if (data.yearoftherooster2017 && data.yearoftherooster2017.icons && data.yearoftherooster2017.icons.bokimario) {
          data.yearoftherooster2017.icons.bokimari = data.yearoftherooster2017.icons.bokimario
          delete data.yearoftherooster2017.icons.bokimario
        }
      }
    }, {
      name: "Rename events to their proper IDs",
      id: 4,
      run: function() {
        if (!data.summergames2016 && !data.winterwonderland2016 && !data.halloween2016 && !data.yearoftherooster2017) return
        data['SUMMER_GAMES_2016'] = Object.assign({}, data.summergames2016, data['SUMMER_GAMES_2016']);
        data['HALLOWEEN_2016'] = Object.assign({}, data.halloween2016, data['HALLOWEEN_2016']);
        data['WINTER_WONDERLAND_2016'] = Object.assign({}, data.winterwonderland2016, data['WINTER_WONDERLAND_2016']);
        data['YEAR_OF_THE_ROOSTER_2017'] = Object.assign({}, data.yearoftherooster2017, data['YEAR_OF_THE_ROOSTER_2017']);
        delete data.summergames2016;
        delete data.halloween2016;
        delete data.winterwonderland2016;
        delete data.yearoftherooster2017;
      }
    }
  ]

  var storedMigrations = localStorage.getItem('migrations')
  var completedMigrations = storedMigrations ? JSON.parse(storedMigrations) : []
  if (!data) {
    console.info("No data, no migrations needed")
    completedMigrations = []
    migrations.forEach(function(m) {
      completedMigrations.push(m.id)
    })
    localStorage.setItem('migrations', JSON.stringify(completedMigrations));
    return
  }
  console.info("Running Migrations")
  if (completedMigrations.length == migrations.length) {
    console.info("No migrations needed")
    return
  }
  localStorage.setItem('backup-data', JSON.stringify(data))
  migrations.forEach(function(mig) {
    if (completedMigrations.includes(mig.id)) return console.info(mig.name, "already dun");
    console.info("Running", mig.name, "migration");
    mig.run();
    completedMigrations.push(mig.id);
  });
  console.info("Finished Migrations")

  localStorage.setItem('data', JSON.stringify(data))
  localStorage.setItem('migrations', JSON.stringify(completedMigrations));
})
