OWI.factory("StorageService", function() {
  var service = {
    data: {},
    settings: {},
    defaults: {
      particles: true
    },
    getData: function() {
      return service.data
    },
    isItemChecked: function(event, type, id) {
      return (event in service.data ? (type in service.data[event] ? service.data[event][type][id] : false) : false)
    },
    getSetting: function(key) {
      return (key in service.settings ? service.settings[key] : (key in service.defaults ? service.defaults[key] : false))
    },
    setSetting: function(key, value) {
      service.settings[key] = value;
      service.persist(true);
    },
    setData: function(data) {
      service.data = data;
      service.persist();
    },
    persist: function(settings) {
      localStorage.setItem(settings ? 'settings' : 'data', angular.toJson(service[settings ? 'settings' : 'data']));
    },
    init: function() {
      var storedData = localStorage.getItem('data')
      if (storedData) {
        service.data = angular.fromJson(storedData);
      }
      var storedSettings = localStorage.getItem('settings');
      if (!storedSettings) {
        service.settings = service.defaults;
      } else {
        service.settings = angular.fromJson(storedSettings);
      }
    }
  }
  service.init();
  return service;
})

OWI.controller('MainCtrl', ["Data", "$uibModal", "StorageService", function(Data, $uibModal, StorageService) {
  this.preview = false;
  this.updates = Data.updates;
  this.selectedUpdate = 0;

  this.openSettings = function() {
    $uibModal.open({
      templateUrl: './templates/settings.html',
      controller: 'SettingsCtrl',
      controllerAs: 'settings'
    })
  };
  this.particles = StorageService.getSetting('particles');
  var savedData = StorageService.getData();
  Data.checked = Object.assign({}, Data.checked, savedData);
}]);

OWI.controller('SettingsCtrl', ["$rootScope", "$uibModalInstance", "StorageService", "Data", function($rootScope, $uibModalInstance, StorageService, Data) {
  this.particles = StorageService.getSetting('particles');

  this.close = function() {
    $uibModalInstance.dismiss('close')
  }

  this.resetData = function() {
    localStorage.removeItem('data');
    localStorage.removeItem('migrations');
    location.reload();
  }

  this.toggleParticles = function() {
    this.particles = !this.particles;
    StorageService.setSetting('particles', this.particles);
    location.reload();
  }

  this.selectAll = function() {
    Data.updates.forEach(function(update) {
      Object.keys(update.items).forEach(function(type) {
        update.items[type].forEach(function(item) {
          Data.checked[update.id][type][item.id || item.name || item] = true;
        });
      });
    });
    StorageService.setData(Data.checked);
    $rootScope.$emit('selectAll')
  }
}])

OWI.directive("scroll", function ($window) {
  return function($scope) {
    angular.element($window).bind("scroll", function() {
      if (this.innerWidth > 1540) return;
      $scope.isFixed = this.pageYOffset >= 200 ? true : false;
      $scope.$apply();
    });
  };
});

OWI.directive("update", ["$rootScope", "Data", "StorageService", function($rootScope, Data, StorageService) {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    templateUrl: './templates/event-container.html',
    link: function($scope, element, attrs) {
      $scope.currentEvent = attrs.template
    },
    controller: function($scope) {
      $scope.preview = false;

      $scope.checked = Data.checked[$scope.data.id];

      $rootScope.$on('selectAll', function() {
        $scope.calculateCosts();
        $scope.calculatePerHeroProgress();
      })

      $scope.viewMode = StorageService.getSetting('viewMode') || 'item-type';
      $scope.viewModes = {
        'item-type': 'By item type',
        'hero': 'By hero'
      };
      $scope.saveViewMode = function (viewMode) {
        $scope.viewMode = viewMode;
        StorageService.setSetting('viewMode', viewMode);
      }

      $scope.onSelect = function() {
        Data.checked[$scope.data.id] = $scope.checked;
        StorageService.setData(Data.checked);
        $scope.calculateCosts();
        $scope.calculatePerHeroProgress();
      };

      $scope.cost = {
        total: 0,
        remaining: 0,
        prev: 0
      };

      $scope.calculateCosts = function() {
        if ($scope.data.id == 'summergames2016') return
        var cost = {
          total: 0,
          remaining: 0,
          prev: $scope.cost.remaining
        }

        Object.keys($scope.data.items).forEach(function(type) {
          if (type == 'icons') return; // icons have no cost
          var items = $scope.data.items[type];
          items.forEach(function(item) {
            if (!item.quality) return // if it has no quality it has no cost
            var price = Data.prices[item.quality];
            cost.total += price;
            if (!StorageService.isItemChecked($scope.data.id, type, item.id)) {
              cost.remaining += price;
            }
          })
        })
        $scope.cost = cost;
      }

      $scope.calculateCosts();

      var showTimeout = undefined;
      var hideTimeout = undefined;
      $scope.showPreview = function(what, small) {
        if (!what.img && !what.video) return;
        if (showTimeout) return;
        clearTimeout(hideTimeout)
        showTimeout = setTimeout(function () {
          what.isSmall = small;
          $scope.preview = what;
          $scope.$digest();
        }, $scope.preview ? 100 : 650);
      };

      $scope.hidePreview = function() {
        clearTimeout(showTimeout);
        showTimeout = undefined;
        hideTimeout = setTimeout(function () {
          $scope.preview = false;
          $scope.$digest();
        }, 150);
      };

      // Data for predetermined hero view
      $scope.availableHeroes = [];
      $scope.selectedHero = '';
      $scope.hasGlobalItems = false;
      $scope.perHeroProgress = {};
      determineAvailableHeroes();

      $scope.setSelectedHero = function(hero) {
        $scope.selectedHero = hero;
      }
      $scope.selectedHeroHas = function(type) {
        var possibleItems = [];

        // Shortcut to prevent error with misattributed player icons eg winston-yeti (should have no hero: and allClass: set)
        if (type == 'icons') {
          return $scope.selectedHero == 'global';
        }

        if (type == 'skins') {
          possibleItems = $scope.data.items.skinsLegendary.concat($scope.data.items.skinsEpic);
        } else {
          possibleItems = $scope.data.items[type];
        }

        var hasItem = false;

        possibleItems.forEach(function(item) {
          if ($scope.selectedHero == 'global' && !item.hero) hasItem = true;
          else if (item.hero == $scope.selectedHero) hasItem = true;
        });

        return hasItem;
      }

      $scope.calculatePerHeroProgress = function() {
        var progress = {};
        setProgress('global');
        $scope.availableHeroes.forEach(setProgress);

        $scope.perHeroProgress = progress;

        function setProgress(hero) {
          progress[hero] = { total: 0, current: 0 };
          Object.keys($scope.data.items).forEach(function(type) {
            $scope.data.items[type].forEach(function(item) {
              if (item.hero == hero) {
                progress[hero].total++;
                if (StorageService.isItemChecked($scope.data.id, type, item.id)) progress[hero].current++;
              } else if (!item.hero && hero == 'global') {
                progress.global.total++;
                if (StorageService.isItemChecked($scope.data.id, type, item.id)) progress.global.current++;
              }
            })
          })
        }
      }

      $scope.calculatePerHeroProgress();

      function determineAvailableHeroes() {
        var heroes = {};
        Object.keys($scope.data.items).forEach(function(type) {
          $scope.data.items[type].forEach(function(item) {
            if (item.hero) {
              heroes[item.hero] = true;
            } else {
              $scope.hasGlobalItems = true;
            }
          });
        });
        $scope.availableHeroes = Object.keys(heroes).sort();
        $scope.selectedHero = $scope.hasGlobalItems ? 'global' : $scope.availableHeroes[0];
      }
    }
  };
}]);

OWI.filter('heroPortraitUrl', function () {
  var specialHeroes = {
    'd.va': 'dva',
    'lúcio': 'lucio',
    'soldier: 76': 'soldier-76',
    'torbjörn': 'torbjorn'
  }
  return function(hero) {
    hero = hero.toLowerCase();
    return './resources/heroes/' + (specialHeroes[hero] || hero) + '/portrait-small.png';
  }
});
OWI.filter('itemPrice', function () {
  return function(quality, type, eventItem) {
    // quality is one of: legendary, epic, rare, common, ''
    // for possible combinations see object below.

    // some icons have a character, quality and hence price assigned even though they are not buyable
    // shortcut those out
    if (type == 'icon') return '';

    var prices = {
      common: 25,
      rare: 75,
      epic: 250,
      legendary: 1000
    };

    if (quality && prices[quality]) {
      return '(' + prices[quality] * (eventItem ? 3 : 1) + ')';
    }
    return '';
  }
})

// Based off http://sparkalow.github.io/angular-count-to/
OWI.directive('countTo', ['$timeout', '$filter', function ($timeout, $filter) {
  return {
    replace: false,
    scope: true,
        link: function (scope, element, attrs) {
          var e = element[0];
          var num, refreshInterval, duration, steps, step, countTo, increment;
          var calculate = function() {
            refreshInterval = 30;
            step = 0;
            scope.timoutId = null;
            countTo = parseInt(attrs.countTo) || 0;
            scope.value = parseInt(attrs.countFrom, 10) || 0;
            duration = (parseFloat(attrs.duration) * 1000) || 0;
            steps = Math.ceil(duration / refreshInterval);
            increment = ((countTo - scope.value) / steps);
            num = scope.value;
          }

          var tick = function() {
            scope.timoutId = $timeout(function () {
              num += increment;
              step++;
              if (step >= steps) {
                $timeout.cancel(scope.timoutId);
                num = countTo;
                e.textContent = $filter('number')(Math.round(countTo));
              } else {
                e.textContent = $filter('number')(Math.round(num));
                tick();
              }
            }, refreshInterval);
          }

          var start = function () {
            if (scope.timoutId) {
              $timeout.cancel(scope.timoutId);
            }
            calculate();
            tick();
          }

          attrs.$observe('countTo', function(val) {
            if (val) {
                start();
            }
          });

          attrs.$observe('countFrom', function() {
            start();
          });
          return true;
        }
    }
}]);

/*OWI.directive("particles", function() {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    template: '<div id="particles-js"></div>',
    controller: function() {
      particlesJS({ //eslint-disable-line
        "particles": {
          "number": {
            "value": 55,
            "density": { "enable": true, "value_area": 600 }
          },
          "color": { "value": "#ffffff" },
          "shape": {
            "type": "circle",
            "stroke": { "width": 0, "color": "#000000" },
            "polygon": { "nb_sides": 5 },
            "image": { "src": "", "width": 100, "height": 100 }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
          },
          "line_linked": { "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
          "move": {
            "enable": true,
            "speed": 4,
            "direction": "bottom",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": { "enable": false, "mode": "repulse" },
            "onclick": { "enable": false, "mode": "repulse" },
            "resize": true
          },
          "modes": {
            "grab": { "distance": 400, "line_linked": { "opacity": 1 } },
            "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
            "repulse": { "distance": 200, "duration": 0.4 },
            "push": { "particles_nb": 4 },
            "remove": { "particles_nb": 2 }
          }
        },
        "retina_detect": true
      })
    }
  }
})*/
