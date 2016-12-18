var OWI = angular.module('OWI', ['ui.bootstrap'])

OWI.config(['$compileProvider', function($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
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
          event.skinsEpic = Object.assign({}, event.epic);
          event.skinsLegendary = Object.assign({}, event.legendary);
          delete event.voice;
          delete event.legendary;
          delete event.epic;
          delete event.victoryposes;
        });
      }
    }
  ]

  var storedMigrations = localStorage.getItem('migrations')
  var completedMigrations = storedMigrations ? JSON.parse(storedMigrations) : []
  if (!data) {
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
