var OWI = angular.module('OWI', ['ui.router', 'ui.bootstrap', 'ngAnimate']);

// Setup some angular config stuff
OWI.config(['$compileProvider', '$urlMatcherFactoryProvider', '$animateProvider', '$locationProvider', function($compileProvider, $urlMatcherFactoryProvider, $animateProvider, $locationProvider) {
  $locationProvider.hashPrefix(""); // defaults to #! which is annoying
  $compileProvider.debugInfoEnabled(false); // more perf
  $urlMatcherFactoryProvider.strictMode(false); // I dunno
  $animateProvider.classNameFilter(/angular-animate/); // prevent angular-animate animating all the things
}]);

// Run migrations to convert data and stuff
OWI.run(function() {
  console.info("Starting Migrations");
  var storedData = localStorage.getItem('data');
  var data = storedData ? JSON.parse(storedData) : false;
  var migrations = [
    {
      name: "Update event item IDs and rename new Rooster IDs",
      id: 5,
      run: function() {
        var changedItems = {"SUMMER_GAMES_2016":{"sprays":{"summer-games":"summer-games-2016"},"icons":{"summer-games":"summer-games-2016","united-states":"united-states-of-america"}},"HALLOWEEN_2016":{"sprays":{"halloween-terror-2016":"halloween-terror","halloweenspecial":"halloween-special","junkensteinsrevenge":"junkensteins-revenge","riseofthezomnics":"rise-of-the-zomnics","thereapening":"the-reapening"},"icons":{"halloween-terror":"halloween-terror-2016"}},"WINTER_WONDERLAND_2016":{"icons":{"winter-wonderland":"winter-wonderland-2016"}},"YEAR_OF_THE_ROOSTER_2017":{"skinsEpic":{"mercy-golden": "mercy-fortune"},"icons":{"roadhog-piggy":"roadhog-pigsy","year-of-the-rooster":"year-of-the-rooster-2017"}}}; // eslint-disable-line
        for (var event in changedItems) {
          if (!data[event] || !Object.keys(data[event]).length) {
            console.info("No data for", event, "skipping");
            continue;
          }
          for (var type in changedItems[event]) {
            for (var itemID in changedItems[event][type]) {
              if (data[event][type]) {
                data[event][type][changedItems[event][type][itemID]] = data[event][type][itemID];
                delete data[event][type][itemID];
              }
            }
          }
        }
      }
    },
    {
      name: "Move all event data to hero data",
      id: 6,
      run: function() {
        var events = ["SUMMER_GAMES_2016", "WINTER_WONDERLAND_2016", "YEAR_OF_THE_ROOSTER_2017", "HALLOWEEN_2016"];
        var types = '{ "icons": {}, "intros": {}, "poses": {}, "skins": {}, "sprays": {}, "voicelines": {}, "emotes": {}, "owlskins": {} }';
        var heroes = ["ana", "bastion", "dva", "genji", "hanzo", "junkrat", "lucio", "mccree", "mei", "mercy", "pharah", "reaper", "reinhardt", "roadhog", "soldier-76", "sombra", "symmetra", "torbjorn", "tracer", "widowmaker", "winston", "zarya", "zenyatta"];
        var hasEvents = events.filter(function(e) {
          return data[e];
        });
        if (!hasEvents.length) {
          return;
        }

        heroes.forEach(function(hero) {
          data[hero] = JSON.parse(types);
        });
        data['all'] = { icons: {}, sprays: {} };

        for (var event in data) {
          if (!events.includes(event)) {
            continue;
          }
          for (var type in data[event]) {
            for (var item in data[event][type]) {
              var hero = item.split('-')[0];
              hero = hero === 'soldier' ? 'soldier-76' : hero;
              hero = heroes.includes(hero) ? hero : 'all';
              var newType = (type === 'skinsEpic' || type === 'skinsLegendary') ? 'skins' : type;
              if (!data[hero][newType]) {
                console.warn("Error!", newType, "doesn't exist in hero", hero, "for item", item);
                continue;
              }
              data[hero][newType][item] = data[event][type][item];
            }
          }
          delete data[event];
        }
      }
    },
    {
      name: "Fix incorrect Uprising data and stuff",
      id: 7,
      run: function() {
        var newData = {"all":{"icons":{"lunamari":"peachimari"}},"reaper":{"voicelines":{"reaper-amatuer-hour":"reaper-amateur-hour"}},"soldier-76":{"skins":{"soldier-76-strikecommander-morrison":"soldier-76-strike-commander-morrison"},"icons":{"soldier-76-strikecommander":"soldier-76-strike-commander"}}};  // eslint-disable-line
        for (var hero in newData) {
          for (var type in newData[hero]) {
            for (var item in newData[hero][type]) {
              if (data[hero] && data[hero][type] && data[hero][type][item]) {
                data[hero][type][newData[hero][type][item]] = data[hero][type][item];
                delete data[hero][type][item];
              }
            }
          }
        }
        var things = [['orisa', 'or14ns'], ['mccree', 'blackwatch']];
        things.forEach(function(thing) {
          if (data['all'] && data['all']['icons']) {
            if (data['all']['icons'][thing[1]]) {
              if (data[thing[0]] && data[thing[0]]['icons']) {
                data[thing[0]]['icons'][thing[0] + '-' + thing[1]] = data['all']['icons'][thing[1]];
              }
            }
            delete data['all']['icons'][thing[1]];
          }
        });
      }
    },
    {
      name: 'Fix lunar ids and outstanding id changes',
      id: 8,
      run: function() {
        var newData = {"all":{"icons":{"cheers1":"na-zdorovie"},"sprays":{"year-of-the-rooster":"year-of-the-rooster-2017"}},"orisa":{"voicelines":{"orisa-satsified-with-protection":"orisa-satisfied-with-protection"}},"genji":{"voicelines":{"genji-i-was-hoping-for-a-challenge":"genji-hoping-for-a-challenge"}},"mercy":{"sprays":{"mercy-stethoscope":"mercy-heartbeat"}},"winston":{"emotes":{"winston-dance":"winston-twist"}},"doomfist":{"voicelines":{"doomfist-and-they-say-chivalry-is-dead":"doomfist-they-say-chivalry-is-dead"}},"mei":{"voicelines":{"dont-you-just-love-surprises":"mei-dont-you-love-surprises"}},"symmetra":{"voicelines":{"symmetra-were-you-expecting-a-miracle":"symmetra-expecting-a-miracle"}},"zarya":{"voicelines":{"zarya-where-is-the-dog-buried":"zarya-where-the-dog-is-buried"}}}  // eslint-disable-line
        var heroChanges = [['genji', 'baihu'], ['mercy', 'zhuque'], ['pharah', 'qinglong'], ['zarya', 'xuanwu']]
        for (var hero in newData) {
          for (var type in newData[hero]) {
            for (var item in newData[hero][type]) {
              if (data[hero] && data[hero][type] && data[hero][type][item]) {
                data[hero][type][newData[hero][type][item]] = data[hero][type][item];
                delete data[hero][type][item];
              }
            }
          }
        }
        heroChanges.forEach(function(thing) {
          if (data[thing[0]] && data[thing[0]]['icons']) {
            if (data[thing[0]]['icons'][thing[0] + '-' + thing[1]]) {
              data['all']['icons'][thing[1]] = true
            }

            delete data[thing[0]]['icons'][[thing[0] + '-' + thing[1]]]
          }
        });
      }
    }
  ];

  var storedMigrations = localStorage.getItem('migrations');
  var completedMigrations = storedMigrations ? JSON.parse(storedMigrations) : [];
  if (!data) {
    console.info("No data, no migrations needed");
    completedMigrations = [];
    migrations.forEach(function(m) {
      completedMigrations.push(m.id);
    });
    localStorage.setItem('migrations', JSON.stringify(completedMigrations));
    return;
  }

  console.info("Running Migrations");
  if (completedMigrations.length === migrations.length) {
    console.info("No migrations needed");
    return;
  }

  localStorage.setItem('backup-data', JSON.stringify(data));
  migrations.forEach(function(mig) {
    if (completedMigrations.includes(mig.id)) return console.info(mig.name, "already dun");
    console.info("Running", mig.name, "migration");
    mig.run();
    completedMigrations.push(mig.id);
  });

  console.info("Finished Migrations");
  localStorage.setItem('data', JSON.stringify(data));
  localStorage.setItem('migrations', JSON.stringify(completedMigrations));
});

// This allows custom themes to be loaded
OWI.run(function() {
  console.info("Loading themes");
  var settings = angular.fromJson(localStorage.getItem('settings')) || {};
  var theme = settings.currentTheme || 'standard';
  var url = './css/' + (theme === 'standard' ? 'main.min.css' : 'themes/' + theme + '/' + 'main.min.css');
  var newElm = document.createElement('link');
  newElm.rel = "stylesheet";
  newElm.href = url;
  document.head.appendChild(newElm);

  setTimeout(function() {
    document.body.style.opacity = 1;
  }, 400);
});

// Set up the apps routes
OWI.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('heroes', {
      url: '/heroes/:id',
      views: {
        main: {
          templateUrl: './templates/hero.html',
          controller: 'HeroesCtrl as hero'
        }
      }
    })

    .state('events', {
      url: '/events/:id',
      resolve: {
        event: function($q, DataService, $stateParams) {
          var deferred = $q.defer();
          DataService.waitForInitialization().then(function(data) {
            var event = data.events[$stateParams.id];
            if (event) {
              deferred.resolve(event);
            } else {
              deferred.reject("INVALID_EVENT");
            }
          });
          return deferred.promise;
        }
      },
      views: {
        header: {
          templateUrl: './templates/header-event.html'
        },
        main: {
          templateUrl: './templates/event-container.html',
          controller: 'UpdateCtrl'
        }
      }
    })

    .state('home', {
      url: '/',
      resolve: {
        data: function($q, DataService) {
          var deferred = $q.defer();
          DataService.waitForInitialization().then(function(data) {
            deferred.resolve(data);
          });
          return deferred.promise;
        }
      },
      views: {
        main: {
          templateUrl: './templates/home.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');
}]);

// Listen for state change errors such as routing to an invalid hero and redirect
OWI.run(["$rootScope", "$state", "DataService", function($rootScope, $state, Data) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.warn(error);
    if (error === 'INVALID_HERO') {
      $state.go('home');
    } else {
      $state.go('events', { id: Data.currentEvent });
    }
  });
}]);
