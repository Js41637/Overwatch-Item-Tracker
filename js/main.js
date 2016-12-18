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
  this.selectedUpdate = 2;

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

OWI.controller('SettingsCtrl', ["$uibModalInstance", "StorageService", function($uibModalInstance, StorageService) {
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

OWI.directive("update", ["Data", "StorageService", function(Data, StorageService) {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    templateUrl: function(element, attrs) {
      return './templates/' + attrs.template + '.html';
    },
    controller: function($scope) {
      $scope.preview = false;

      $scope.checked = Data.checked[$scope.data.id];

      $scope.onSelect = function() {
        console.log("Onselect")
        Data.checked[$scope.data.id] = $scope.checked;
        StorageService.setData(Data.checked);
        $scope.calculateCosts();
      };

      $scope.cost = {
        total: 0,
        remaining: 0
      };

      $scope.calculateCosts = function() {
        var cost = {
          total: 0,
          remaining: 0
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
        if (what.img && what.img.includes('WINTER_WONDERLAND_2016') && what.img.includes('icons')) return // ignore icons
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
    }
  };
}]);

OWI.directive("particles", function() {
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
            "density": {
              "enable": true,
              "value_area": 600
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 4,
            "direction": "bottom",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": false,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      })
    }
  }
})
