OWI.controller('MainCtrl', ["$rootScope", "$q", "$document", "$uibModal", "DataService", "StorageService", function($rootScope, $q, $document, $uibModal, DataService, StorageService) {
  var vm = this;
  this.preview = false;
  this.currentDate = Date.now();
  this.showSidebar = false;
  this.showNav = false;
  this.supportsWebM = true;
  this.supportsOgg = true;
  this.noSupport = [[], []]

  DataService.waitForInitialization().then(function(data) {
    vm.events = data.events;
    vm.heroes = data.heroes;
  })

  this.dismissAlert = function() {
    this.hideAlert = true
  }

  // Check to see if the web browser supports WebM videos
  var supportedTypes = {
    intros: true,
    emotes: true,
    voicelines: true
  }
  var v = document.createElement('video')
  var a = document.createElement('audio')
  if (!v.canPlayType || ("" == v.canPlayType('video/webm; codecs="vp8, opus"') && "" == v.canPlayType('video/webm; codecs="vp9, opus"'))) {
    this.supportsWebM = false
    supportedTypes['intros'] = 'false'
    supportedTypes['emotes'] = 'false'
    this.noSupport[0].push('WebM')
    this.noSupport[1].push('watch any emote and intro previews')
  }
  if (!a.canPlayType || "" == a.canPlayType('audio/ogg; codecs="vorbis"')) {
    this.supportsOgg = false
    supportedTypes['voicelines'] = 'false'
    this.noSupport[0].push('Ogg')
    this.noSupport[1].push('listen to voicelines')
  }

  var showPreviews = StorageService.getSetting('showPreviews')
  this.supportsPreview = function(type) {
    if (!showPreviews) return false
    return supportedTypes[type] || true
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

OWI.controller('SettingsCtrl', ["$rootScope", "$uibModalInstance", "StorageService", "DataService", function($rootScope, $uibModalInstance, StorageService, DataService) {
  var vm = this;
  this.particles = StorageService.getSetting('particles');
  this.hdVideos = StorageService.getSetting('hdVideos');
  this.currentTheme = StorageService.getSetting('currentTheme');
  this.showPreviews = StorageService.getSetting('showPreviews');
  this.importErrors = null;

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
          if (!DataService.checked[heroID][type]) {
            DataService.checked[heroID][type] = {}
          }
          DataService.checked[heroID][type][item.id] = true
        }
      }
    }

    StorageService.setData(DataService.checked);
    $rootScope.$emit('selectAll')
  }
}])

OWI.controller('HeroesCtrl', ["$scope", "$rootScope", "DataService", "StorageService", "hero", function($scope, $rootScope, Data, StorageService, hero) {
  var vm = this;
  Object.assign(this, hero); // is this cheating?
  this.gridView = false;
  this.checked = Data.checked[hero.id]
  this.events = {}
  this.totals = {
    total: 0,
    selected: 0,
    percentage: 0,
    groups: {}
  }
  this.filters = {
    selected: false,
    unselected: false,
    achievement: false,
    events: {}
  }
  
  // Cost is on scope as it is a directive in the page and it inherits parent scope
  $scope.cost = {
    total: 0,
    remaining: 0,
    prev: 0
  };

  this.updateFilters = function() {
    this.filtering = true;
    var selected = vm.filters.selected;
    var unselected = vm.filters.unselected;
    var achievement = vm.filters.achievement;

    // Generate array of event ids we are filtering
    var eventFilters = []
    for (var e in vm.filters.events) {
      if (vm.filters.events[e]) eventFilters.push(e)
    }

    // Disable filtering if nothing is selected
    if (!eventFilters.length && !selected && !unselected && !achievement) {
      vm.clearFilters();
      return
    }
    
    this.filteredItems = filterItems(hero.items, eventFilters);
    calculateTotalsAndCosts();

    // Generate the currently selected filter text
    var currentFilters = eventFilters
    currentFilters = currentFilters.map(function(e) {
      return Data.events[e].name
    })
    if (selected || unselected) {
      currentFilters.push(selected ? 'SELECTED' : unselected ? 'UNSELECTED': '')
    }
    if (achievement) {
      currentFilters.push('ACHIEVEMENT')
    }
    this.currentFilters = currentFilters.join('|')
  }

  // Filters the items and returms new data object
  function filterItems(items, eventFilters) {
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

        outType.push(item);
      })
      if (outType.length) {
        out[type] = outType
      }
    }
    return out;
  }

  this.filteredItems = hero.items // init

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

  this.isItemChecked = function(item, type) {
    return this.checked[type][item.id];
  }

  // Manual function to select an item, used in grid mode
  this.selectItem = function(item, type) {
    this.checked[type][item.id] = !this.checked[type][item.id];
    vm.onSelect();
  }

  this.onSelect = function() {
    StorageService.setData(Object.assign({}, Data.checked, vm.checked[hero.id]));
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
        vm.checked[type][item.id] = true;
      })
    })
    calculateTotalsAndCosts();
    StorageService.setData(Object.assign({}, Data.checked, vm.checked[hero.id]));
  }

  function isValidItem(item) {
    return !item.achievement && item.quality && !item.standardItem && (!item.event || (item.event && item.event !== 'SUMMER_GAMES_2016'))
  }

  // Calculate the total costs and tallys of items in current view (filters)
  function calculateTotalsAndCosts() {
    var selectedItems = 0;
    var totalItems = 0
    var cost = {
      total: 0,
      remaining: 0,
      prev: $scope.cost.remaining
    };

    Object.keys(vm.filteredItems).forEach(function(type) {
      var groupTotals = {
        total: 0,
        selected: 0
      }
      vm.filteredItems[type].forEach(function(item) {
        if (!item.standardItem) {
          totalItems++;
          groupTotals.total++;
        }
        if (item.event && !vm.events[item.event]) {
          vm.events[item.event] = true
        }
        
        var isSelected = Data.isItemChecked(hero.id, type, item.id);
        if (isSelected && !item.standardItem) {
          selectedItems++;
          groupTotals.selected++;
        }
        // allclass items dont need qualitys
        // NOTE: this also updates the items data on the page
        if (hero.id == 'all') {
          item.quality = 'common'
        }
        if (type !== 'icons' && isValidItem(item)) {
          var price = Data.prices[item.quality] * (item.event ? 3 : 1);
          cost.total += price;
          if (!isSelected) {
            cost.remaining += price;
          }
        }
      });
      vm.totals.groups[type] = groupTotals;
    });
    $scope.cost = cost;
    vm.totals.total = totalItems;
    vm.totals.selected = selectedItems;
    vm.totals.percentage = ((vm.totals.selected / vm.totals.total) * 100) + '%'
  }

  calculateTotalsAndCosts();
}])

OWI.controller("UpdateCtrl", ["$scope", "$rootScope", "DataService", "StorageService", "event", function($scope, $rootScope, Data, StorageService, event) {
  $scope.preview = false;
  $scope.checked = Data.checked;
  $scope.data = event;

  $rootScope.$on('selectAll', function() {
    $scope.calculateCosts();
  })

  $scope.onSelect = function() {
    StorageService.setData($scope.checked);
    $scope.calculateCosts();
  };

  $scope.cost = {
    total: 0,
    remaining: 0,
    prev: 0
  };

  var types = {
    skinsEpic: 'skins',
    skinsLegendary: 'skins'
  }
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
        if (!Data.isItemChecked(item.heroID, types[type] || type, item.id)) {
          cost.remaining += price;
        }
      })
    })
    $scope.cost = cost;
  }

  $scope.calculateCosts();

  var showTimeout = undefined;
  var hideTimeout = undefined;
  var showPreviews = StorageService.getSetting('showPreviews');
  $scope.showPreview = function(what, type) {
    if (!what.img && !what.video && !what.audio) return;
    if (!showPreviews) return
    if (showTimeout) return;
    var item = angular.copy(what)
    clearTimeout(hideTimeout)
    showTimeout = setTimeout(function () {
      item.type = type;
      if (StorageService.getSetting('hdVideos') && item.video) {
        item.video = item.video.replace('.webm', '-hd.webm');
      }
      if (item.audio) {
        $scope.audio = item
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
