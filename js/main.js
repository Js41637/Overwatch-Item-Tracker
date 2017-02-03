OWI.factory("StorageService", function() {
  var service = {
    data: {},
    settings: {},
    defaults: {
      particles: true,
      hdVideos: false,
      currentTheme: 'standard'
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
  this.selectedUpdate = 'YEAR_OF_THE_ROOSTER_2017';
  this.currentDate = Date.now();

  this.openSettings = function() {
    $uibModal.open({
      templateUrl: './templates/settings.html',
      controller: 'SettingsCtrl',
      controllerAs: 'settings'
    })
  };

  this.openAbout = function() {
    $uibModal.open({
      templateUrl: './templates/about.html',
      controller: 'SettingsCtrl',
      controllerAs: 'settings'
    })
  };

  this.openTheme = function() {
    $uibModal.open({
      templateUrl: './templates/theme.html',
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
  this.hdVideos = StorageService.getSetting('hdVideos');
  this.currentTheme = StorageService.getSetting('currentTheme');

  this.close = function() {
    $uibModalInstance.dismiss('close')
  }

  this.resetData = function() {
    localStorage.removeItem('data');
    localStorage.removeItem('migrations');
    location.reload();
  }

  this.toggleSetting = function(what, reload) {
    this[what] = !this[what];
    StorageService.setSetting(what, this[what]);
    if (reload) {
      location.reload();
    }
  }

  this.selectTheme = function(what) {
    this.currentTheme = what
    StorageService.setSetting('currentTheme', what)
    location.reload()
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
      if (this.innerWidth > 1570) return;
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

      $scope.showPreview = function(what, type) {
        if (!what.img && !what.video) return;
        if (showTimeout) return;
        var item = angular.copy(what)
        clearTimeout(hideTimeout)
        showTimeout = setTimeout(function () {
          item.type = type;
          if (StorageService.getSetting('hdVideos') && item.video) {
            item.video = item.video.replace('.webm', '-hd.webm');
          }
          $scope.preview = item;

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
    return './resources/heroes/' + (specialHeroes[hero] || hero) + '/portrait.png';
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

OWI.directive('loadingSpinner', function() {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    template: '<div class="loader"><ul class="hexagon-container"><li class="hexagon hex_1"></li><li class="hexagon hex_2"></li><li class="hexagon hex_3"></li><li class="hexagon hex_4"></li><li class="hexagon hex_5"></li><li class="hexagon hex_6"></li><li class="hexagon hex_7"></li></ul></div>'
  }
})

OWI.directive('lazyBackground', ["$document", "$compile", function($document, $compile) {
  return {
    restrict: 'A',
    scope: {},
    link: function($scope, $element, $attrs) {
      // Observe the lazy-background attribute so that when it changes it can fetch the new image and fade to it
      $attrs.$observe('lazyBackground', function(newSrc) {
        // Make sure newSrc is valid else return error
        if (newSrc == null || newSrc == "") {
          $element.css('background-image', '');
          $element.addClass('img-load-error');
          return;
        }
        /**
         * Removes any error class on the element and then adds the loading class to the element.
         * This is required in cases where the element can load more than 1 image.
         */
        $element.removeClass('img-load-error');
        $element.addClass('img-loading');

        var loader = $compile('<loading-spinner  />')($scope)
        $element.prepend(loader)
        setTimeout(function () {
          loader.css('opacity', '1')
        }, 110);
        // Use some oldskool preloading techniques to load the image
        var img = $document[0].createElement('img');
        img.onload = function() {
          $element.css('background-image', 'url("'+this.src+'")');
          $element.removeClass('img-loading');
          loader.remove()
        };
        img.onerror = function() {
          //Remove any existing background-image & loading class and apply error class
          $element.css('background-image', '');
          $element.removeClass('img-loading');
          $element.addClass('img-load-error');
        };
        img.src = encodeURI(newSrc);
      });
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
