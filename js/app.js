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
OWI.run(["$transitions", "$state", "DataService", function($transitions, $state, Data) {
  $transitions.onError({}, function(error) {
    if (error.error().detail === 'INVALID_EVENT') {
      $state.go('events', { id: Data.currentEvent });
    } else if (error.error().type !== 5) {
      $state.go('home');
    }
  })
}]);
