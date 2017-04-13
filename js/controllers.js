OWI.controller('MainCtrl', ["$rootScope", "$q", "$document", "$uibModal", "DataService", "CompatibilityService", function($rootScope, $q, $document, $uibModal, DataService, CompatibilityService) {
  var vm = this;
  this.preview = false;
  this.currentDate = Date.now();
  this.showSidebar = false;
  this.showNav = false;
  this.noSupportMsg = CompatibilityService.noSupportMsg

  DataService.waitForInitialization().then(function(data) {
    vm.events = data.events;
    vm.heroes = data.heroes;
  })

  this.dismissAlert = function() {
    this.hideAlert = true
  }

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
    // If for some reason we don't have data, wait a second an try again
    if (!vm.events || !vm.heroes) {
      console.warn("Missing event or hero data!! Trying again", vm)
      setTimeout(function() {
        if (!vm.events || !vm.heroes) {
          console.error("Error loading data, reload page pls", event, toState, toParams)
          alert("Error loading data, reload the site to try again, if issue persists please raise an issue on the Github repo")
          return
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

OWI.controller('HeroesCtrl', ["$scope", "$rootScope", "DataService", "StorageService", "CompatibilityService", "hero", function($scope, $rootScope, Data, StorageService, CompatibilityService, hero) {
  var vm = this;
  Object.assign(this, hero);
  this.filteredItems = hero.items;
  this.canPlayType = CompatibilityService.canPlayType;
  this.gridView = false;
  this.checked = Data.checked;
  this.events = {};
  this.groups = {};
  this.totals = {
    total: 0,
    selected: 0,
    percentage: 0,
    groups: {}
  };

  this.filters = {
    selected: false,
    unselected: false,
    achievement: false,
    events: {},
    groups: {}
  };

  // Cost is on scope as it is a directive in the page and it inherits parent scope
  $scope.cost = {
    total: 0,
    remaining: 0,
    prev: 0
  };

  this.isItemChecked = function(item, type) {
    return this.checked[item.hero || hero.id][type][item.id];
  };

  function isValidItem(item) {
    return !item.achievement && item.quality && (!item.event || (item.event && item.event !== 'SUMMER_GAMES_2016'))
  }

  // Calculate the total costs and tallys of items in current view (filters)
  function calculateTotalsAndCosts(initial) {
    var selectedItems = 0;
    var totalItems = 0
    var cost = {
      total: 0,
      remaining: 0,
      selected: 0,
      prev: $scope.cost.remaining
    };

    for (var type in vm.filteredItems) {
      var groupTotals = {
        total: 0,
        selected: 0
      }
      vm.filteredItems[type].forEach(function(item) {
        if (item.standardItem) return
        totalItems++;
        groupTotals.total++;

        if (initial) {
          if (item.event && !vm.events[item.event]) {
            vm.events[item.event] = true
          }
          if (item.group && !vm.groups[item.group]) {
            vm.groups[item.group] = true
          }
        }
        
        var isSelected = vm.isItemChecked(item, type);
        if (isSelected ) {
          selectedItems++;
          groupTotals.selected++;
        }
        if (type == 'icons') return
        if (isValidItem(item)) {
          var price = Data.prices[item.quality] * (item.event ? 3 : 1);
          cost.total += price;
          if (isSelected) {
            cost.selected += price;
          }
          else {
            cost.remaining += price;
          }
        }
      });
      vm.totals.groups[type] = groupTotals;
    }
    $scope.cost = cost;
    vm.totals.total = totalItems;
    vm.totals.selected = selectedItems;
    vm.totals.percentage = ((vm.totals.selected / vm.totals.total) * 100)
  }

  calculateTotalsAndCosts(true);
  console.log(vm)

  this.getDisplayName = function(name) {
    switch (name) {
      case 'intros':
        return 'highlight intros'
      case 'voicelines':
        return 'voice lines'
      case 'poses':
        return 'victory poses'
      default:
        return name
    }
  }

  this.hasEvents = function() {
    return Object.keys(vm.events).length
  }

  this.hasGroups = function() {
    return Object.keys(vm.groups).length
  }

  this.updateFilters = function() {
    console.log("Apple")
    this.filtering = true;
    var selected = vm.filters.selected;
    var unselected = vm.filters.unselected;
    var achievement = vm.filters.achievement;

    // Generate array of event ids we are filtering
    var eventFilters = []
    for (var e in vm.filters.events) {
      if (vm.filters.events[e]) eventFilters.push(e)
    }

    var groupFilter = []
    for (var g in vm.filters.groups) {
      if (vm.filters.groups[g]) groupFilter.push(g)
    }

    // Disable filtering if nothing is selected
    if (!eventFilters.length && !groupFilter.length && !selected && !unselected && !achievement) {
      vm.clearFilters();
      return
    }
    
    this.filteredItems = filterItems(hero.items, eventFilters, groupFilter);
    calculateTotalsAndCosts();

    // Generate the currently selected filter text
    var currentFilters = eventFilters
    currentFilters = currentFilters.map(function(e) {
      return Data.events[e].name
    })
    currentFilters = currentFilters.concat(groupFilter)
    if (selected || unselected) {
      currentFilters.push(selected ? 'SELECTED' : unselected ? 'UNSELECTED': '')
    }
    if (achievement) {
      currentFilters.push('ACHIEVEMENT')
    }
    this.currentFilters = currentFilters.join('|')
  }

  // Filters the items and returms new data object
  function filterItems(items, eventFilters, groupFilter) {
    var out = {}
    for (var type in items) {
      var outType = []
      items[type].forEach(function(item) {
        if (vm.filters.selected || vm.filters.unselected) {
          var checked = vm.isItemChecked(item, type);
          if ((vm.filters.selected && !checked) || (vm.filters.unselected && checked))  return;
        }

        if (vm.filters.achievement && !item.achievement) return;
        if (eventFilters.length && (!item.event || !eventFilters.includes(item.event))) return;
        if (groupFilter.length && (!item.group || !groupFilter.includes(item.group))) return;

        outType.push(item);
      })
      if (outType.length) {
        out[type] = outType
      }
    }
    return out;
  }

  $rootScope.$on('selectAll', function() {
    calculateTotalsAndCosts();
  })
  
  this.clearFilters = function() {
    this.filters = {
      selected: false,
      unselected: false,
      events: {}
    }
    this.currentFilters = '';
    this.filtering = false;
    this.filteredItems = hero.items;
    calculateTotalsAndCosts();
  }
 
  // Return the url for an image or video, also check if we're showing HD videos
  this.getPreviewURL = function(item, type, hero, image) {
    var base = './resources/heroes/' + (item.hero || hero) + '/' + type + '/' + item.id;
    var out = {}
    if (type == 'intros' || type == 'emotes') {
      out.video = base + '.webm'
      if (StorageService.getSetting('hdVideos')) {
       out.video = out.video.replace('.webm', '-hd.webm');
      }
    } else if (type == 'voicelines') {
      out.audio = base + '.ogg'
    } else {
      out.img = base + (type == 'sprays' || type == 'icons' ? '.png' : '.jpg')
    }
    return image ? out.img : out
  }

  // Manual function to select an item, used in grid mode
  this.selectItem = function(item, type) {
    this.checked[item.hero || hero.id][type][item.id] = !this.checked[item.hero || hero.id][type][item.id];
    vm.onSelect();
  }

  this.onSelect = function() {
    StorageService.setData(Object.assign({}, Data.checked, vm.checked));
    calculateTotalsAndCosts();
  }

  this.toggleGrid = function() {
    if (hero.id != 'all') return;
    this.gridView = !this.gridView;
  }

  // Mark all items for current hero as selected
  this.selectAll = function() {
    if (vm.totals.selected == vm.totals.total) {
      return;
    }
    Object.keys(hero.items).forEach(function(type) {
      hero.items[type].forEach(function(item) {
        vm.checked[item.hero || hero.id][type][item.id] = true;
      })
    })
    calculateTotalsAndCosts();
    StorageService.setData(Object.assign({}, Data.checked, vm.checked[hero.id]));
  }
}])

OWI.controller("UpdateCtrl", ["$scope", "$rootScope", "DataService", "StorageService", "CompatibilityService", "event", function($scope, $rootScope, Data, StorageService, CompatibilityService, event) {
  $scope.preview = false;
  $scope.checked = Data.checked;
  $scope.data = event;
  $scope.cost = {
    total: 0,
    remaining: 0,
    prev: 0,
    selected: 0
  };

  var types = {
    skinsEpic: 'skins',
    skinsLegendary: 'skins'
  };

  function calculateCosts() {
    if ($scope.data.id == 'SUMMER_GAMES_2016') return
    var cost = {
      total: 0,
      remaining: 0,
      selected: 0,
      prev: $scope.cost.remaining
    }

    for (var type in event.items) {
      if (type == 'icons') continue; // icons have no cost
      var items = $scope.data.items[type];
      items.forEach(function(item) {
        if (!item.quality) return; // if it has no quality it has no cost
        var price = Data.prices[item.quality] * 3;
        cost.total += price;
        var isChecked = Data.isItemChecked(item.hero, types[type] || type, item.id)
        if (isChecked) {
          cost.selected += price;
        }
        else {
          cost.remaining += price;
        }
      })
    }
    $scope.cost = cost;
  }
  calculateCosts();

  $rootScope.$on('selectAll', function() {
    calculateCosts();
  })

  $scope.onSelect = function() {
    StorageService.setData($scope.checked);
    calculateCosts();
  };

  var showTimeout = undefined;
  var hideTimeout = undefined;
  $scope.showPreview = function(what, type) {
    if (!what.url) return;
    if (event.id == 'UPRISING_2017' && (type == 'voicelines' || type == 'spray' || type == 'icons')) return
    if (CompatibilityService.canPlayType(type) === 'false') return
    if (showTimeout) return;
    var item = angular.copy(what);
    clearTimeout(hideTimeout);
    showTimeout = setTimeout(function () {
      item.type = type;
      item.media = (type == 'emotes' || type == 'intros') ? 'video' : type == 'voicelines' ? 'audio' : 'image'
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
}]);

OWI.controller('SettingsCtrl', ["$rootScope", "$uibModalInstance", "StorageService", "DataService", function($rootScope, $uibModalInstance, StorageService, DataService) {
  var vm = this;
  var settings = StorageService.settings
  this.particles = settings['particles'];
  this.hdVideos = settings['hdVideos'];
  this.currentTheme = settings['currentTheme'];
  this.showPreviews = settings['showPreviews'];
  this.audioVolume = settings['audioVolume'];
  this.importErrors = null;

  this.close = function() {
    $uibModalInstance.dismiss('close');
  }

  this.resetData = function() {
    localStorage.removeItem('data');
    localStorage.removeItem('migrations');
    location.reload();
  }

  this.setVolume = function() {
    StorageService.setSetting('audioVolume', this.audioVolume)
  }

  this.toggleSetting = function(what, reload) {
    this[what] = !this[what];
    StorageService.setSetting(what, this[what]);
    if (reload) {
      location.reload();
    }
  }
  this.data = angular.toJson(DataService.checked, 2);
  var validTypes = ['emotes', 'icons', 'intros', 'poses', 'skins', 'sprays', 'voicelines'];
  var validHeroes = Object.keys(DataService.heroes);
  this.importData = function(data, test) {
    vm.importErrors = null
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
            errs.push("Invalid hero template for " + hero + ", unknown key '" + type + "'")
          }
        }
      }

      if (errs.length) {
        vm.importErrors = errs.join('\n')
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
  }

  this.selectTheme = function(what) {
    this.currentTheme = what
    StorageService.setSetting('currentTheme', what)
    location.reload()
  }

  this.selectAll = function() {
    for (var heroID in DataService.heroes) {
      var hero = DataService.heroes[heroID].items
      for (var type in hero) {
        for (var item of hero[type]) {
          if (!DataService.checked[item.hero || heroID][type]) {
            DataService.checked[item.hero || heroID][type] = {}
          }
          DataService.checked[item.hero || heroID][type][item.id] = true
        }
      }
    }

    StorageService.setData(DataService.checked);
    $rootScope.$emit('selectAll')
  }
}])
