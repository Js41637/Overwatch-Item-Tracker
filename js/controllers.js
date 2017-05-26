OWI.controller('MainCtrl', ["$rootScope", "$q", "$document", "$uibModal", "DataService", "CompatibilityService", "CostAndTotalService", function($rootScope, $q, $document, $uibModal, DataService, CompatibilityService, CostAndTotalService) {
  var vm = this;
  this.preview = false;
  this.currentDate = Date.now();
  this.showSidebar = false;
  this.showNav = false;
  this.noSupportMsg = CompatibilityService.noSupportMsg;
  this.totals = CostAndTotalService;

  DataService.waitForInitialization().then(function(data) {
    vm.events = data.events;
    vm.heroes = data.heroes;
  });

  this.dismissAlert = function() {
    this.hideAlert = true;
  };

  this.getCosts = function() {
    var out = {
      total: 0,
      remaining: 0,
      selected: 0
    };
    for (var hero in CostAndTotalService.heroes) {
      out.remaining += CostAndTotalService.heroes[hero].cost.remaining;
      out.total += CostAndTotalService.heroes[hero].cost.total;
      out.selected += CostAndTotalService.heroes[hero].cost.selected;
    }
    return out;
  };

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
    // If for some reason we don't have data, wait a second an try again
    if (!vm.events || !vm.heroes) {
      console.warn("Missing event or hero data!! Trying again", vm);
      setTimeout(function() {
        if (!vm.events || !vm.heroes) {
          console.error("Error loading data, reload page pls", event, toState, toParams);
          alert("Error loading data, reload the site to try again, if issue persists please raise an issue on the Github repo");
          return;
        }
        onStateChange(event, toState, toParams);
      }, 400);
      return;
    }
    onStateChange(event, toState, toParams);
  });

  function onStateChange(event, toState, toParams) {
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
  }

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
      });
    }
  };

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
  };

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

  this.getImageUrl = function(url) {
    return url;
    /* if (location.host.match(/^localhost:5000$/)) {
      return url.replace('https://d34nsd3ksgj839.cloudfront.net', 'http://localhost:5000/resources');
    } else {
      return url;
    }*/
  };
}]);

OWI.controller('HeroesCtrl', ["$scope", "$rootScope", "$uibModal", "DataService", "StorageService", "CompatibilityService", "CostAndTotalService", "hero", function($scope, $rootScope, $uibModal, Data, StorageService, CompatibilityService, CostAndTotalService, hero) {
  var vm = this;
  Object.assign(this, hero);
  this.filteredItems = hero.items;
  this.canPlayType = CompatibilityService.canPlayType;
  this.gridView = false;
  this.checked = Data.checked;
  if (CostAndTotalService.heroes[hero.id]) {
    this.events = CostAndTotalService.heroes[hero.id].events;
    this.groups = CostAndTotalService.heroes[hero.id].groups;
    this.totals = CostAndTotalService.heroes[hero.id].totals;
  } else {
    setTimeout(function() {
      this.events = CostAndTotalService.heroes[hero.id].events;
      this.groups = CostAndTotalService.heroes[hero.id].groups;
      this.totals = CostAndTotalService.heroes[hero.id].totals;
    }, 1000);
  }
  
  this.filters = {
    selected: false,
    unselected: false,
    achievement: false,
    hero: false,
    events: {},
    groups: {}
  };

  // Cost is on scope as it is a directive in the page and it inherits parent scope
  $scope.cost = CostAndTotalService.heroes[hero.id].cost;

  // Returns if an item is checked, use item.hero if one is available as allClass Icons includes icons from all heroes
  this.isItemChecked = function(item, type) {
    return this.checked[item.hero || hero.id][type][item.id];
  };

  this.getDisplayName = function(name) {
    switch (name) {
      case 'intros':
        return 'highlight intros';
      case 'voicelines':
        return 'voice lines';
      case 'poses':
        return 'victory poses';
      default:
        return name;
    }
  };

  this.hasGroups = function() {
    return Object.keys(vm.groups).length;
  };

  this.hasEvents = function() {
    return Object.keys(vm.events).length;
  };

  var resetCosts = function() {
    var cost = CostAndTotalService.heroes[hero.id].cost;
    cost.prev = $scope.cost.remaining;
    $scope.cost = cost;
    vm.totals = CostAndTotalService.heroes[hero.id].totals;
  };

  var updateCosts = function() {
    var newData = CostAndTotalService.calculateFilteredHeroes(vm.filteredItems, $scope.cost.remaining, hero.id);
    $scope.cost = newData.cost;
    vm.totals = newData.totals;
  };

  this.updateFilters = function() {
    this.filtering = true;
    var selected = vm.filters.selected;
    var unselected = vm.filters.unselected;
    var achievement = vm.filters.achievement;
    var herof = vm.filters.hero;

    // Generate array of event ids we are filtering
    var eventFilters = [];
    for (var e in vm.filters.events) {
      if (vm.filters.events[e]) eventFilters.push(e);
    }

    var groupFilter = [];
    for (var g in vm.filters.groups) {
      if (vm.filters.groups[g]) groupFilter.push(g);
    }

    // Disable filtering if nothing is selected
    if (!eventFilters.length && !groupFilter.length && !selected && !unselected && !achievement && !herof) {
      vm.clearFilters();
      return;
    }
    
    this.filteredItems = filterItems(hero.items, eventFilters, groupFilter);
    updateCosts();

    // Generate the currently selected filter text
    var currentFilters = eventFilters;
    currentFilters = currentFilters.map(function(e) {
      return Data.events[e].name;
    });
    currentFilters = currentFilters.concat(groupFilter);
    if (selected || unselected) {
      currentFilters.push(selected ? 'SELECTED' : unselected ? 'UNSELECTED': '');
    }
    if (achievement) {
      currentFilters.push('ACHIEVEMENT');
    }
    this.currentFilters = currentFilters.join('|');
  };

  // Filters the items and returms new data object
  function filterItems(items, eventFilters, groupFilter) {
    var out = {};
    for (var type in items) {
      var outType = [];
      items[type].forEach(function(item) {
        if (vm.filters.selected || vm.filters.unselected) {
          var checked = vm.isItemChecked(item, type);
          if ((vm.filters.selected && !checked) || (vm.filters.unselected && checked))  return;
        }

        if (vm.filters.achievement && !item.achievement) return;
        if (vm.filters.hero && !item.hero) return;
        if (eventFilters.length && (!item.event || !eventFilters.includes(item.event))) return;
        if (groupFilter.length && (!item.group || !groupFilter.includes(item.group))) return;

        outType.push(item);
      });
      if (outType.length) {
        out[type] = outType;
      }
    }
    return out;
  }

  $rootScope.$on('selectAll', function() {
    CostAndTotalService.recalculate();
    resetCosts();
  });
  
  this.clearFilters = function() {
    this.filters = {
      selected: false,
      unselected: false,
      achievement: false,
      hero: false,
      events: {},
      groups: {}
    };
    this.currentFilters = '';
    this.filtering = false;
    this.filteredItems = hero.items;
    resetCosts();
  };

  // Manual function to select an item, used in grid mode
  this.selectItem = function(item, type) {
    if (item.standardItem) return;
    this.checked[item.hero || hero.id][type][item.id] = !this.checked[item.hero || hero.id][type][item.id];
    vm.onSelect(item, type);
  };

  this.onSelect = function(item, type) {
    StorageService.setData(Object.assign({}, Data.checked, vm.checked));
    if (this.filtering) {
      CostAndTotalService.updateItem(item, type, hero.id);
      updateCosts();
      return;
    }
    CostAndTotalService.updateItem(item, type, hero.id);
  };

  this.toggleGrid = function() {
    if (hero.id != 'all') return;
    this.gridView = !this.gridView;
  };

  // Mark all items for current hero as selected
  this.selectAll = function(unselect, onlyType) {
    if (vm.totals.overall.selected == vm.totals.overall.total && !unselect) {
      return;
    }
    for (var type in vm.filteredItems) {
      if (onlyType && type !== onlyType) {
        continue;
      }
      vm.filteredItems[type].forEach(function(item) {
        if (item.standardItem) return;
        vm.checked[item.hero || hero.id][type][item.id] = (unselect ? false : true);
      });
    }
    StorageService.setData(Object.assign({}, Data.checked, vm.checked));
    CostAndTotalService.recalculate();
    if (vm.filtering) {
      updateCosts();
    } else {
      resetCosts();
    }
  };

  this.selectModal = function(type, string) {
    if (vm.totals.overall.selected == 0 && string == 'unselect') return;
    var modal = $uibModal.open({
      templateUrl: './templates/modals/select.html',
      controller: function($scope) {
        $scope.type = type;
        $scope.select = string;
      }
    });
    modal.result.then(function(goahead) {
      if (goahead) {
        if (string == 'select') {
          vm.selectAll(false, type);
        } else {
          vm.selectAll(true, type);
        }
      }
    });
  };
}]);

OWI.controller("UpdateCtrl", ["$scope", "$rootScope", "DataService", "StorageService", "CompatibilityService", "CostAndTotalService", "$window", "event", function($scope, $rootScope, Data, StorageService, CompatibilityService, CostAndTotalService, $window, event) {
  $scope.preview = false;
  $scope.checked = Data.checked;
  $scope.data = event;
  if (CostAndTotalService.events[event.id]) {
    $scope.cost = CostAndTotalService.events[event.id].cost;
  } else {
    setTimeout(function() {
      $scope.cost = CostAndTotalService.events[event.id].cost;
    }, 1000);
  }
  

  $rootScope.$on('selectAll', function() {
    CostAndTotalService.recalculate();
    $scope.cost = CostAndTotalService.events[event.id].cost;
  });

  $scope.onSelect = function(item, type) {
    StorageService.setData($scope.checked);
    CostAndTotalService.updateItem(item, type, item.hero, event.id);
  };

  $scope.selectLegendarySkin = function($event, skin) {
    $event.preventDefault();
    $scope.checked[skin.hero].skins[skin.id] = !$scope.checked[skin.hero].skins[skin.id];
    $scope.onSelect(skin, 'skins');
  };

  var showTimeout = undefined;
  var hideTimeout = undefined;
  $scope.showPreview = function(what, type) {
    if (!what.url) return;
    if (CompatibilityService.canPlayType(type) === 'false') return;
    if (showTimeout) return;
    var item = angular.copy(what);
    clearTimeout(hideTimeout);
    showTimeout = setTimeout(function () {
      item.type = type;
      item.media = (type == 'emotes' || type == 'intros') ? 'video' : type == 'voicelines' ? 'audio' : 'image';
      if (StorageService.getSetting('hdVideos') && (type == 'emotes' || type == 'intros')) {
        item.url = item.url.replace('.webm', '-hd.webm');
      }
      if (type == 'voicelines') {
        $scope.audio = item;
      } else {
        $scope.preview = item;
      }
      $scope.$digest();
    }, ($scope.preview || $scope.audio) ? 50 : 600);
  };

  $scope.hidePreview = function() {
    clearTimeout(showTimeout);
    showTimeout = undefined;
    hideTimeout = setTimeout(function () {
      $scope.preview = false;
      $scope.audio = false;
      $scope.$digest();
    }, 150);
  };

  angular.element($window).bind("scroll", function() {
    $scope.isFixed = this.pageYOffset >= 200 ? true : false;
    $scope.$apply();
  });
}]);

OWI.controller('SettingsCtrl', ["$rootScope", "$uibModalInstance", "StorageService", "DataService", function($rootScope, $uibModalInstance, StorageService, DataService) {
  var vm = this;
  var settings = StorageService.settings;
  this.particles = settings['particles'];
  this.hdVideos = settings['hdVideos'];
  this.currentTheme = settings['currentTheme'];
  this.showPreviews = settings['showPreviews'];
  this.audioVolume = settings['audioVolume'];
  this.countIcons = settings['countIcons'];
  this.importErrors = null;

  this.close = function() {
    $uibModalInstance.dismiss('close');
  };

  this.resetData = function() {
    localStorage.removeItem('data');
    localStorage.removeItem('migrations');
    location.reload();
  };

  function getDate() {
    var d = new Date();
    var yy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var ts = d.getHours() + '-' + d.getMinutes();
    dd = dd < 10 ? '0' + dd : dd;
    mm = mm < 10 ? '0' + mm : mm;
    return yy + '-' + mm + '-' + dd + '_' + ts;
  }

  this.downloadJSON = function() {
    var dataStr = JSON.stringify(DataService.checked, null, 2);
    var el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataStr));
    el.setAttribute('download', 'overwatch-item-tracker_backup_' + getDate() + '.json');
    el.click();
  };

  this.setVolume = function() {
    StorageService.setSetting('audioVolume', this.audioVolume);
  };

  this.toggleSetting = function(what, reload) {
    this[what] = !this[what];
    StorageService.setSetting(what, this[what]);
    if (reload) {
      location.reload();
    }
  };

  this.data = angular.toJson(DataService.checked, 2);
  var validTypes = ['emotes', 'icons', 'intros', 'poses', 'skins', 'sprays', 'voicelines'];
  var validHeroes = Object.keys(DataService.heroes);

  this.importData = function(data, test) {
    vm.importErrors = null;
    try {
      data = angular.fromJson(vm.data);
      var errs = [];

      if (!Object.keys(data).length) {
        return;
      }

      for (var hero in data) {
        if (!validHeroes.includes(hero)) {
          errs.push("Unknown hero " + hero);
        }
        for (var type in data[hero]) {
          if (!validTypes.includes(type)) {
            errs.push("Invalid hero template for " + hero + ", unknown key '" + type + "'");
          }
        }
      }

      if (errs.length) {
        vm.importErrors = errs.join('\n');
        return;
      }

      vm.importErrors = false;
      if (!test) {
        StorageService.setData(data);
        location.reload();
      }

    } catch(e) {
      console.error(e);
      vm.importErrors = 'An error occured while parsing the JSON';
    }
  };

  this.selectTheme = function(what) {
    this.currentTheme = what;
    StorageService.setSetting('currentTheme', what);
    location.reload();
  };

  this.selectAll = function() {
    for (var heroID in DataService.heroes) {
      var hero = DataService.heroes[heroID].items;
      for (var type in hero) {
        for (var item of hero[type]) {
          if (!DataService.checked[item.hero || heroID][type]) {
            DataService.checked[item.hero || heroID][type] = {};
          }
          DataService.checked[item.hero || heroID][type][item.id] = true;
        }
      }
    }

    StorageService.setData(DataService.checked);
    $rootScope.$emit('selectAll');
  };
}]);
