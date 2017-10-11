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

OWI.controller('HeroesCtrl', ["$scope", "$state", "$timeout", "$stateParams", "$rootScope", "$uibModal", "DataService", "StorageService", "CompatibilityService", "CostAndTotalService",  function($scope, $state, $timeout, $stateParams, $rootScope, $uibModal, Data, StorageService, CompatibilityService, CostAndTotalService) {
  var vm = this;
  this.loaded = false;
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
    }, 0);
  });

  function init() {
    vm.filteredItems = hero.items;
    vm.canPlayType = CompatibilityService.canPlayType;
    vm.gridView = false;
    vm.checked = Data.checked;
    
    CostAndTotalService.waitForInitialization().then(function(data) {
      vm.events = data.heroes[hero.id].events;
      vm.groups = data.heroes[hero.id].groups;
      vm.totals = data.heroes[hero.id].totals;

      // Cost is on scope as it is a directive in the page and it inherits parent scope
      $scope.cost = CostAndTotalService.heroes && CostAndTotalService.heroes[hero.id] ? CostAndTotalService.heroes[hero.id].cost : 0;
    });
  }
  
  this.filters = {
    selected: false,
    unselected: false,
    achievement: false,
    hero: false,
    events: {},
    groups: {}
  };

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
    if (!vm.groups) return false;
    return Object.keys(vm.groups).length;
  };

  this.hasEvents = function() {
    if (!vm.events) return false;
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
    if (achievement) {
      currentFilters.push('ACHIEVEMENT');
    }
    if (herof) {
      currentFilters.push('HERO');
    }
    if (selected || unselected) {
      currentFilters.push(selected ? 'SELECTED' : unselected ? 'UNSELECTED': '');
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
          if ((vm.filters.selected && !checked && !item.standardItem) || (vm.filters.unselected && (checked || item.standardItem)))  return;
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

  this.selectModal = function(type, str) {
    if (vm.totals.overall.selected == 0 && str == 'unselect') return;
    var modal = $uibModal.open({
      templateUrl: './templates/modals/select.html',
      controller: function($scope) {
        $scope.message = ('Are you sure you want to ' + str + ' all ' + (type || 'items'));
      }
    });
    modal.result.then(function(goahead) {
      if (goahead) {
        if (str == 'select') {
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
  $scope.canPlayType = CompatibilityService.canPlayType;

  CostAndTotalService.waitForInitialization().then(function(data) {
    $scope.totals = data.events[event.id].totals;

    // Cost is on scope as it is a directive in the page and it inherits parent scope
    $scope.cost = data.events[event.id].cost;
  });
  

  $rootScope.$on('selectAll', function() {
    CostAndTotalService.recalculate();
    $scope.cost = CostAndTotalService.events[event.id].cost;
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

OWI.controller('SettingsCtrl', ["$rootScope", "$scope", "$uibModal", "$uibModalInstance", "StorageService", "DataService", "GoogleAPI", function($rootScope, $scope, $uibModal, $uibModalInstance, StorageService, DataService, GoogleAPI) {
  var vm = this;
  var settings = StorageService.settings;
  this.particles = settings['particles'];
  this.hdVideos = settings['hdVideos'];
  this.currentTheme = settings['currentTheme'];
  this.showPreviews = settings['showPreviews'];
  this.audioVolume = settings['audioVolume'];
  this.countIcons = settings['countIcons'];
  this.syncDisabled = settings['syncDisabled'];
  this.importErrors = null;

  this.willEnableSync = false;

  this.googleUser = GoogleAPI.user;
  this.googleSignedIn = GoogleAPI.isSignedIn;
  this.googleMessage = null;

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
    var url = URL.createObjectURL(new Blob([ JSON.stringify(DataService.checked, null, 2) ],  { type: 'application/json' }));
    var el = document.createElement('a');
    el.setAttribute('href', url);
    el.setAttribute('download', 'overwatch-item-tracker_backup_' + getDate() + '.json');
    el.click();
    setTimeout(function() {
      URL.revokeObjectURL(url);
    }, 1000);
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

  this.importData = function(data, test) {
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

  this.toggleSync = function() {
    if (this.syncDisabled && !vm.willEnableSync) {
      vm.willEnableSync = true;
    }

    if (!this.syncDisabled) {
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

  this.googleLogin = function() {
    vm.googleMessage = null;
    GoogleAPI.login();
  };

  this.googleSignOut = function() {
    vm.googleMessage = null;
    GoogleAPI.signOut();
  };

  this.uploadToDrive = function() {
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

  this.downloadFromDrive = function() {
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

      const errors = validateData(response.data);
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
