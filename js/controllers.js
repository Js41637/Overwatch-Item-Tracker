OWI.controller('MainCtrl', ["$rootScope", "$q", "$document", "$uibModal", "DataService", "CompatibilityService", "CostAndTotalService", "UrlService", "StorageService", function($rootScope, $q, $document, $uibModal, DataService, CompatibilityService, CostAndTotalService, UrlService, StorageService) {
  var vm = this;
  vm.preview = false;
  vm.currentDate = Date.now();
  vm.showSidebar = false;
  vm.showNav = false;
  vm.noSupportMsg = CompatibilityService.noSupportMsg;
  vm.totals = CostAndTotalService;
  vm.particles = StorageService.getSetting('particles')

  DataService.waitForInitialization().then(function(data) {
    vm.events = data.events;
    vm.heroes = data.heroes;
  });

  vm.dismissAlert = function() {
    vm.hideAlert = true;
  };

  vm.getCosts = function() {
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
    onStateChange(event, toState, toParams);
  });

  function onStateChange(event, toState, toParams) {
    vm.showNav = false;
    var heroOrEventID = toParams.id;

    if (!heroOrEventID) {
      vm.item = { name: 'Home' };
    } else {
      DataService.getHeroOrEventName(toState.name, heroOrEventID).then(function(data) {
        vm.item = data;
      });
    }
  }

  // Fired when the sidebar is open on every click, checks if a click was made
  // outside the sidebar and if it was, close the sidebar
  var documentClicked = function(event) {
    if (event && event.path) {
      $q.all(event.path.map(function(elm) {
        if (elm.id === 'sidebar') return $q.resolve(true);
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

  vm.toggleSidebar = function() {
    vm.showSidebar = !vm.showSidebar;
    if (!vm.showSidebar) {
      $document.off('click', documentClicked);
      return;
    }

    if (vm.showSidebar) {
      setTimeout(function () {
        $document.on('click', documentClicked);
      }, 0);
    }
  };

  vm.openSettings = function() {
    $uibModal.open({
      templateUrl: './templates/modals/settings.html',
      controller: 'SettingsCtrl',
      controllerAs: 'settings'
    });
  };

  vm.openAbout = function() {
    $uibModal.open({
      templateUrl: './templates/modals/about.html',
      controller: 'SettingsCtrl',
      controllerAs: 'settings'
    });
  };

  vm.openTheme = function() {
    $uibModal.open({
      templateUrl: './templates/modals/themes.html',
      controller: 'SettingsCtrl',
      controllerAs: 'settings'
    });
  };

  vm.getImageUrl = function(url) {
    return UrlService.get(url)
  };
}]);

var savedFilters = null

OWI.controller('HeroesCtrl', ["$scope", "$state", "$timeout", "$stateParams", "$rootScope", "$uibModal", "DataService", "StorageService", "CompatibilityService", "CostAndTotalService", function($scope, $state, $timeout, $stateParams, $rootScope, $uibModal, Data, StorageService, CompatibilityService, CostAndTotalService) {
  var vm = this;
  vm.loaded = false;
  vm.hasGroups = true
  vm.hasEvents = true
  vm.noFilteredLayout = false
  var hero;

  Data.waitForInitialization().then(function(data) {
    hero = data.heroes[$stateParams.id];
    if (!hero) {
      $state.go('home');
      return;
    }

    Object.assign(vm, hero);

    init();

    $timeout(function() {
      vm.loaded = true;

      if (savedFilters) {
        vm.updateFilters()
      }
    }, 0);
  });

  var hasGroups = function() {
    if (!vm.groups) return false

    return Object.keys(vm.groups).length;
  };

  var hasEvents = function() {
    if (!vm.events) return false;

    return Object.keys(vm.events).length;
  };

  function init() {
    vm.filteredItems = hero.items;
    vm.canPlayType = CompatibilityService.canPlayType;
    vm.gridView = false;
    vm.checked = Data.checked;

    CostAndTotalService.waitForInitialization().then(function(data) {
      vm.events = data.heroes[hero.id].events;
      vm.groups = data.heroes[hero.id].groups;
      vm.totals = data.heroes[hero.id].totals;
      vm.hasEvents = hasEvents();
      vm.hasGroups = hasGroups();

      // Cost is on scope as it is a directive in the page and it inherits parent scope
      $scope.cost = CostAndTotalService.heroes && CostAndTotalService.heroes[hero.id] ? CostAndTotalService.heroes[hero.id].cost : 0;
    });
  }

  vm.filters = $stateParams.id !== 'all' && savedFilters
    ? savedFilters
    : {
      selected: false,
      unselected: false,
      achievement: false,
      hero: false,
      noevent: false,
      events: {},
      groups: {}
    };

  // Returns if an item is checked, use item.hero if one is available as allClass Icons includes icons from all heroes
  vm.isItemChecked = function(item, type) {
    if (item.standardItem) return true

    return vm.checked[item.hero || hero.id][type][item.id];
  };

  vm.getDisplayName = function(name) {
    switch (name) {
      case 'intros':
        return 'highlight intros';
      case 'voicelines':
        return 'voice lines';
      case 'poses':
        return 'victory poses';
      case 'owlskins':
        return 'overwatch league skins';
      default:
        return name;
    }
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

  vm.updateFilters = function() {
    vm.filtering = true;
    var selected = vm.filters.selected;
    var unselected = vm.filters.unselected;
    var achievement = vm.filters.achievement;
    var regularItems = vm.filters.regularItems;
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
    if (!eventFilters.length && !groupFilter.length && !selected && !unselected && !achievement && !herof && !regularItems) {
      vm.clearFilters();
      return;
    }

    vm.filteredItems = filterItems(hero.items, eventFilters, groupFilter);
    updateCosts();

    // Generate the currently selected filter text
    var currentFilters = eventFilters;
    currentFilters = currentFilters.map(function(e) {
      return Data.events[e].name;
    });

    currentFilters = currentFilters.concat(groupFilter);

    if (regularItems) {
      currentFilters.push('REGULAR ITEMS')
    }

    if (achievement) {
      currentFilters.push('ACHIEVEMENT');
    }

    if (herof) {
      currentFilters.push('HERO');
    }

    if (selected || unselected) {
      currentFilters.push(selected ? 'SELECTED' : unselected ? 'UNSELECTED' : '');
    }

    vm.currentFilters = currentFilters.join('|');
  };

  // Filters the items and returms new data object
  function filterItems(items, eventFilters, groupFilter) {
    var out = {};
    var itemCount = 0;
    var typeCount = 0;

    for (var type in items) {
      var outType = [];
      items[type].forEach(function(item) {
        if (vm.filters.selected || vm.filters.unselected) {
          var checked = vm.isItemChecked(item, type);
          if ((vm.filters.selected && !checked && !item.standardItem) || (vm.filters.unselected && (checked || item.standardItem))) return;
        }

        if (vm.filters.regularItems && (item.event || item.achievement)) return;
        if (vm.filters.achievement && !item.achievement) return;
        if (vm.filters.hero && !item.hero) return;
        if (eventFilters.length && (!item.event || !eventFilters.includes(item.event))) return;
        if (groupFilter.length && (!item.group || !groupFilter.includes(item.group))) return;

        itemCount++;
        outType.push(item);
      });

      if (outType.length) {
        typeCount++;
        out[type] = outType;
      }
    }

    vm.noFilteredLayout = itemCount > 35 && typeCount > 2
    return out;
  }

  vm.clearFilters = function() {
    vm.filters = {
      selected: false,
      unselected: false,
      achievement: false,
      hero: false,
      events: {},
      groups: {}
    };

    savedFilters = null;
    vm.currentFilters = '';
    vm.filtering = false;
    vm.filteredItems = hero.items;
    resetCosts();
  };

  vm.saveFilters = function() {
    savedFilters = vm.filters;
  }

  // Manual function to select an item, used in grid mode
  vm.selectItem = function(item, type) {
    if (item.standardItem) return;

    vm.checked[item.hero || hero.id][type][item.id] = !vm.checked[item.hero || hero.id][type][item.id];
    vm.onSelect(item, type);
  };

  vm.onSelect = function(item, type) {
    StorageService.setData(Object.assign({}, Data.checked, vm.checked));
    CostAndTotalService.updateItem(item, type, hero.id);

    if (vm.filtering) {
      updateCosts();
    }
  };

  vm.toggleGrid = function() {
    if (hero.id !== 'all') return;
    vm.gridView = !vm.gridView;
  };

  // Mark all items for current hero as selected
  vm.selectAll = function(unselect, onlyType) {
    if (vm.totals.overall.selected === vm.totals.overall.total && !unselect) {
      return;
    }

    for (var type in vm.filteredItems) {
      if (onlyType && type !== onlyType) {
        continue;
      }

      vm.filteredItems[type].forEach(function(item) {
        if (item.standardItem) return;

        vm.checked[item.hero || hero.id][type][item.id] = !unselect;
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

  vm.selectModal = function(type, str) {
    if (vm.totals.overall.selected === 0 && str === 'unselect') return;

    var modal = $uibModal.open({
      templateUrl: './templates/modals/select.html',
      controller: function($scope) {
        $scope.message = ('Are you sure you want to ' + str + ' all ' + (type || 'items'));
      }
    });

    modal.result.then(function(goahead) {
      if (goahead) {
        if (str === 'select') {
          vm.selectAll(false, type);
        } else {
          vm.selectAll(true, type);
        }
      }
    });
  };
}]);

OWI.controller("UpdateCtrl", ["$scope", "$rootScope", "$uibModal", "DataService", "StorageService", "CompatibilityService", "CostAndTotalService", "event", function($scope, $rootScope, $uibModal, Data, StorageService, CompatibilityService, CostAndTotalService, event) {
  $scope.checked = Data.checked;
  $scope.data = event;
  $scope.canPlayType = CompatibilityService.canPlayType;

  CostAndTotalService.waitForInitialization().then(function(data) {
    $scope.totals = data.events[event.id].totals;

    // Cost is on scope as it is a directive in the page and it inherits parent scope
    $scope.cost = data.events[event.id].cost;
  });

  $scope.onSelect = function(item, type, override) {
    StorageService.setData($scope.checked);
    CostAndTotalService.updateItem(item, type, item.hero, event.id, override);
    $scope.totals = CostAndTotalService.events[event.id].totals;
  };

  $scope.selectLegendarySkin = function($event, skin) {
    $event.preventDefault();
    $scope.checked[skin.hero].skins[skin.id] = !$scope.checked[skin.hero].skins[skin.id];
    $scope.onSelect(skin, 'skins');
  };

  var resetCosts = function() {
    var cost = CostAndTotalService.events[event.id].cost;
    cost.prev = $scope.cost.remaining;
    $scope.cost = cost;
    $scope.totals = CostAndTotalService.events[event.id].totals;
  };

  $scope.selectModal = function(type, str) {
    if ($scope.totals.overall.selected === 0 && str === 'unselect') return;
    var modal = $uibModal.open({
      templateUrl: './templates/modals/select.html',
      controller: function($scope) {
        $scope.message = ('Are you sure you want to ' + str + ' all ' + (type || 'items'));
      }
    });

    modal.result.then(function(goahead) {
      if (goahead) {
        if (str === 'select') {
          selectAll(false, type);
        } else {
          selectAll(true, type);
        }
      }
    });
  };

  var selectAll = function(unselect, onlyType) {
    if ($scope.totals.overall.selected === $scope.totals.overall.total && !unselect) {
      return;
    }

    for (var type in event.items) {
      if (onlyType && type !== onlyType) {
        continue;
      }

      for (var item of event.items[type]) {
        $scope.checked[item.hero || 'all'][type][item.id] = !unselect;
      }
    }

    StorageService.setData(Object.assign({}, Data.checked, $scope.checked));
    CostAndTotalService.recalculate();
    resetCosts();
  };
}]);

OWI.controller('SettingsCtrl', ["$rootScope", "$scope", "$uibModal", "$uibModalInstance", "$state", "StorageService", "DataService", "GoogleAPI", function($rootScope, $scope, $uibModal, $uibModalInstance, $state, StorageService, DataService, GoogleAPI) {
  var vm = this;
  var settings = StorageService.settings;
  vm.particles = settings['particles'];
  vm.hdVideos = settings['hdVideos'];
  vm.currentTheme = settings['currentTheme'];
  vm.showPreviews = settings['showPreviews'];
  vm.audioVolume = settings['audioVolume'];
  vm.countIcons = settings['countIcons'];
  vm.syncDisabled = settings['syncDisabled'];
  vm.importErrors = null;

  vm.willEnableSync = false;

  vm.googleUser = GoogleAPI.user;
  vm.googleSignedIn = GoogleAPI.isSignedIn;
  vm.googleMessage = null;

  vm.close = function() {
    $uibModalInstance.dismiss('close');
  };

  vm.resetData = function() {
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

  vm.downloadJSON = function() {
    var url = URL.createObjectURL(new Blob([ JSON.stringify(DataService.checked, null, 2) ], { type: 'application/json' }));
    var el = document.createElement('a');
    el.setAttribute('href', url);
    el.setAttribute('download', 'overwatch-item-tracker_backup_' + getDate() + '.json');
    document.body.appendChild(el);
    el.click();
    setTimeout(function() {
      document.body.removeChild(el);
      URL.revokeObjectURL(url);
    }, 1000);
  };

  vm.setVolume = function() {
    StorageService.setSetting('audioVolume', vm.audioVolume);
  };

  vm.toggleSetting = function(what, reload) {
    vm[what] = !vm[what];
    StorageService.setSetting(what, vm[what]);
    if (reload) {
      location.reload();
    }
  };

  vm.data = angular.toJson(DataService.checked, 2);
  var validTypes = ['emotes', 'icons', 'intros', 'poses', 'skins', 'sprays', 'voicelines', 'weapons', 'owlskins'];
  var validHeroes = Object.keys(DataService.heroes);
  function validateData(data) {
    try {
      data = typeof data === 'string' ? angular.fromJson(data) : data;
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
        return errs.join('\n');
      }
    } catch (e) {
      console.error(e);
      return 'Error parsing json';
    }
  }

  vm.importData = function(data, test) {
    vm.importErrors = null;
    var errors = validateData(vm.data);

    if (errors) {
      vm.importErrors = errors;
    } else {
      vm.importErrors = false;
      if (!test) {
        StorageService.setData(angular.fromJson(vm.data));
        location.reload();
      }
    }
  };

  vm.selectTheme = function(what) {
    vm.currentTheme = what;
    StorageService.setSetting('currentTheme', what);
    location.reload();
  };

  vm.selectAll = function() {
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
    location.reload()
  };

  vm.toggleSync = function() {
    if (vm.syncDisabled && !vm.willEnableSync) {
      vm.willEnableSync = true;
    }

    if (!vm.syncDisabled) {
      vm.syncDisabled = true;
      StorageService.setSetting('syncDisabled', true);
    } else {
      vm.syncDisabled = !vm.syncDisabled;
    }
  };

  $rootScope.$on('google:login', function(event, data) {
    switch (data.event) {
      case 'ERROR':
        vm.googleSignedIn = false;
        vm.googleUser = {};
        vm.googleMessage = ['danger', 'Error! Something went wrong while logging into Google! - ' + data.message];
        break;
      case 'SIGN_IN':
        vm.googleSignedIn = true;
        vm.googleUser = data.user;
        vm.googleMessage = ['success', 'Successfully logged in with Google! You can choose to download your data now if you have any saved.'];
        break;
      case 'SIGN_OUT':
        vm.googleSignedIn = false;
        vm.googleUser = {};
        break;
    }

    $scope.$digest();
  });

  vm.googleLogin = function() {
    vm.googleMessage = null;
    GoogleAPI.login();
  };

  vm.googleSignOut = function() {
    vm.googleMessage = null;
    GoogleAPI.signOut();
  };

  vm.uploadToDrive = function() {
    vm.googleMessage = null;
    var modal = $uibModal.open({
      templateUrl: './templates/modals/select.html',
      controller: function($scope) {
        $scope.message = 'Are you sure you want to upload your data to Google Drive?';
        $scope.submessage = 'This will overwrite any existing data in Google Drive! If you are unsure remember to create backups';
      }
    });
    modal.result.then(function(goahead) {
      if (goahead) {
        onUploadToDrive();
      }
    }, function() {});
  };

  vm.downloadFromDrive = function() {
    vm.googleMessage = null;
    var modal = $uibModal.open({
      templateUrl: './templates/modals/select.html',
      controller: function($scope) {
        $scope.message = 'Are you sure you want to download your data from Google Drive?';
        $scope.submessage = 'This will overwrite any existing local data! If you are unsure remember to create backups';
      }
    });
    modal.result.then(function(goahead) {
      if (goahead) {
        onDownloadFromDrive();
      }
    }, function() {});
  };

  function onUploadToDrive() {
    GoogleAPI.update(DataService.checked).then(function(success) {
      if (success) {
        if (vm.willEnableSync) {
          vm.willEnableSync = false;
          vm.syncDisabled = false;
          StorageService.setSetting('syncDisabled', false);
        }

        vm.googleMessage = ['success', 'Successfully uploaded to Google Drive... maybe... probably...'];
      } else {
        vm.googleMessage = ['danger', 'An error occured while uploading to Google Drive!'];
      }
    });
  }

  function onDownloadFromDrive() {
    GoogleAPI.getData().then(function(response) {
      if (!response || !response.data) {
        vm.googleMessage = ['danger', 'Error: Got an unexpected response while downloading data from Google Drive!'];
        return;
      }

      var errors = validateData(response.data);
      if (errors) {
        vm.googleMessage = ['danger', 'Error: Data returned by Google Drive does not matched expected data'];
        return;
      }

      if (vm.willEnableSync) {
        vm.willEnableSync = false;
        vm.syncDisabled = false;
        StorageService.setSetting('syncDisabled', false);
      }

      vm.googleMessage = ['success', 'Success! Updating local data... This page will reload in a couple seconds.'];

      setTimeout(function() {
        StorageService.setData(response.data);
        location.reload();
      }, 2250);
    });
  }
}]);
