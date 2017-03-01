OWI.controller('MainCtrl', ["$rootScope", "$q", "$document", "$uibModal", "DataService", function($rootScope, $q, $document, $uibModal, DataService) {
  var vm = this;
  this.preview = false;
  this.currentDate = Date.now();
  this.showSidebar = false;
  this.supportsWebM = true
  this.showNav = false;

  DataService.waitForInitialization().then(function(data) {
    vm.events = data.events;
    vm.heroes = data.heroes
  })

  // Check to see if the web browser supports WebM videos
  var v = document.createElement('video')
  if (v.canPlayType) {
    this.supportsWebM = ("" !== v.canPlayType('video/webm; codecs="vp8, opus"') && "" !== v.canPlayType('video/webm; codecs="vp9, opus"'))
  } else {
    this.supportsWebM = false;
  }

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
    vm.showNav = false;
    if (toState.name == 'events') {
      vm.item = vm.events[toParams.id];
      vm.item.type = 'event';
    } else if (toState.name == 'heroes') {
      vm.item = vm.heroes[toParams.id];
      vm.item.type = 'hero';
    } else {
      vm.item = { name: 'Home' };
    }
  });

  // Fired when the sidebar is open on every click, checks if a click was made
  // outside the sidebar and if it was, close the sidebar
  var documentClicked = function(event) {
    if (event && event.path) {
      $q.all(event.path.map(function(elm) {
        if (elm.id == 'sidebar') return $q.resolve(true);
        $q.resolve(false);
      })).then(function(matches) {
        var clickedSidebar = matches.filter(Boolean)[0];
        if (!clickedSidebar) {
          vm.showSidebar = false;
          $document.off('click', documentClicked);
        }
      })
    }
  }

  this.toggleSidebar = function() {
    this.showSidebar = !this.showSidebar;
    if (!this.showSidebar) {
      $document.off('click', documentClicked);
      return;
    }
    if (this.showSidebar) {
      setTimeout(function () {
        $document.on('click', documentClicked);
      }, 0);
    }
  }

  this.openSettings = function() {
    $uibModal.open({
      templateUrl: './templates/modals/settings.html',
      controller: 'SettingsCtrl',
      controllerAs: 'settings'
    });
  };

  this.openAbout = function() {
    $uibModal.open({
      templateUrl: './templates/modals/about.html',
      controller: 'SettingsCtrl',
      controllerAs: 'settings'
    });
  };

  this.openTheme = function() {
    $uibModal.open({
      templateUrl: './templates/modals/themes.html',
      controller: 'SettingsCtrl',
      controllerAs: 'settings'
    });
  };
}]);

OWI.controller('SettingsCtrl', ["$rootScope", "$uibModalInstance", "StorageService", "DataService", function($rootScope, $uibModalInstance, StorageService, Data) {
  var vm = this;
  this.particles = StorageService.getSetting('particles');
  this.hdVideos = StorageService.getSetting('hdVideos');
  this.currentTheme = StorageService.getSetting('currentTheme');

  this.close = function() {
    $uibModalInstance.dismiss('close');
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

  /*this.data = angular.toJson(StorageService.getData());
  var dataTemplate = "emotes|icons|intros|poses|skinsEpic|skinsLegendary|sprays|voicelines";
  var validEvents = Object.keys(Data.events)
  this.importData = function(data) {
    try {
      data = angular.fromJson(vm.data)
      var errs = []

      if (!Object.keys(data).length) return

      Object.keys(data).forEach(function(event) {
        if (!validEvents.includes(event)) {
          errs.push("Unknown event " + event)
        }
        var eventKeys = Object.keys(data[event]).sort().join('|')
        if (eventKeys != dataTemplate) {
          errs.push("Invalid event template for " + event)
        }
      })

      if (errs.length) {
        vm.importErrors = errs.join('\n')
        return;
      }
      StorageService.setData(data);
      location.reload();
    } catch(e) {
      console.error(e);
      vm.importErrors = 'An error occured while parsing the JSON';
    }
  }*/

  this.selectTheme = function(what) {
    this.currentTheme = what
    StorageService.setSetting('currentTheme', what)
    location.reload()
  }

  /*this.selectAll = function() {
    Object.keys(Data.events).forEach(function(key) {
      var update = Data.events[key]
      Object.keys(Data.events[key].items).forEach(function(type) {
        update.items[type].forEach(function(item) {
          Data.checked[update.id][type][item.id] = true;
        });
      });
    });
    StorageService.setData(Data.checked);
    $rootScope.$emit('selectAll')
  }*/
}])

OWI.controller('HeroesCtrl', ["$scope", "$rootScope", "DataService", "StorageService", "hero", function($scope, $rootScope, Data, StorageService, hero) {
  var vm = this;
  Object.assign(this, hero);
  this.checked = Data.checked[hero.id]
  this.totalItems = 0;
  this.selectedItems = 0;
  this.itemPercentage = 0;

  function isValidItem(item) {
    return !item.achievement && item.quality && !item.standardItem && (!item.event || (item.event && item.event !== 'SUMMER_GAMES_2016'))
  }

  $scope.cost = {
    total: 0,
    remaining: 0,
    prev: 0
  };

  function calculateCosts(initial) {
    var selectedItems = 0;
    var cost = {
      total: 0,
      remaining: 0,
      prev: $scope.cost.remaining
    };

    Object.keys(hero.items).forEach(function(type) {
      hero.items[type].forEach(function(item) {
        if (initial && !item.standardItem) {
          vm.totalItems++;
        }

        var isSelected = Data.isItemChecked(hero.id, type, item.id);
        if (isSelected && !item.standardItem) {
          selectedItems++;
        }
        if (type !== 'icons' && isValidItem(item)) {
          var price = Data.prices[item.quality] * (item.event ? 3 : 1);
          cost.total += price;
          if (!isSelected) {
            cost.remaining += price;
          }
        }
      });
      $scope.cost = cost;
      vm.selectedItems = selectedItems;
      vm.itemPercentage = ((vm.selectedItems / vm.totalItems) * 100) + '%'
    })
  }

  calculateCosts(true);

  this.onSelect = function() {
    calculateCosts()
  }
}])

OWI.controller("UpdateCtrl", ["$scope", "$rootScope", "DataService", "StorageService", "event", function($scope, $rootScope, Data, StorageService, event) {
  $scope.preview = false;
  $scope.checked = Data.checked[event.id];
  $scope.data = event;

  $rootScope.$on('selectAll', function() {
    $scope.calculateCosts();
    $scope.calculatePerHeroProgress();
  })

  $scope.onSelect = function() {
    Data.checked[$scope.data.id] = $scope.checked;
    StorageService.setData(Data.checked);
    $scope.calculateCosts();
  };

  $scope.cost = {
    total: 0,
    remaining: 0,
    prev: 0
  };

  $scope.calculateCosts = function() {
    if ($scope.data.id == 'SUMMER_GAMES_2016') return
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
        var price = Data.prices[item.quality] * 3;
        cost.total += price;
        if (!Data.isItemChecked($scope.data.id, type, item.id)) {
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
}]);
