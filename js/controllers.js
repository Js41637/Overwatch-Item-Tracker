OWI.controller('MainCtrl', ["$rootScope", "$q", "$document", "$uibModal", "Data", "StorageService", function($rootScope, $q, $document, $uibModal, Data, StorageService) {
  var vm = this;
  this.preview = false;
  this.updates = Data.updates;
  this.heroes = Data.heroes
  this.selectedUpdate = Data.currentEvent;
  this.currentDate = Date.now();
  this.showSidebar = false;

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
    vm.selectedUpdate = toParams.id;
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

  this.particles = StorageService.getSetting('particles');
  var savedData = StorageService.getData();
  Data.checked = Object.assign({}, Data.checked, savedData);
}]);

OWI.controller('SettingsCtrl', ["$rootScope", "$uibModalInstance", "StorageService", "Data", function($rootScope, $uibModalInstance, StorageService, Data) {
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

  this.data = angular.toJson(StorageService.getData());
  var dataTemplate = "emotes|icons|intros|poses|skinsEpic|skinsLegendary|sprays|voicelines";
  var validEvents = Object.keys(Data.updates)
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
  }

  this.selectTheme = function(what) {
    this.currentTheme = what
    StorageService.setSetting('currentTheme', what)
    location.reload()
  }

  this.selectAll = function() {
    Object.keys(Data.updates).forEach(function(key) {
      var update = Data.updates[key]
      Object.keys(Data.updates[key].items).forEach(function(type) {
        update.items[type].forEach(function(item) {
          Data.checked[update.id][type][item.id] = true;
        });
      });
    });
    StorageService.setData(Data.checked);
    $rootScope.$emit('selectAll')
  }
}])

OWI.controller('HeroesCtrl', ["$scope", "$rootScope", "Data", "StorageService", "hero", function($scope, $rootScope, Data, StorageService, hero) {
  $scope.hero = hero

  $scope.getItems = function() {
    return JSON.stringify(hero, null, 2)
  }
}])

OWI.controller("UpdateCtrl", ["$scope", "$rootScope", "Data", "StorageService", "event", function($scope, $rootScope, Data, StorageService, event) {
  console.log(event)
  $scope.preview = false;
  $scope.checked = Data.checked[event.id];
  $scope.data = event;

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
}]);
