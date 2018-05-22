var types = {
  'portrait': '/portrait.png',
  'career': '/career-portrait.png',
  'icon': '/icon.png'
};

var oldEvents = ['SUMMER_GAMES_2016', 'HALLOWEEN_2016', 'WINTER_WONDERLAND_2016', 'LUNAR_NEW_YEAR_2017', 'UPRISING_2017']

OWI.filter('heroImg', ['UrlService', function(UrlService) {
  return function(hero, type) {
    return hero === 'all'
      ? UrlService.get('/logo.svg')
      : UrlService.get('/heroes/' + hero + types[type]);
  };
}]);

OWI.filter('eventImageUrl', ['UrlService', function(UrlService) {
  return function(event) {
    return UrlService.get('/updates/' + event + '/logo.png');
  };
}]);

OWI.filter('itemPrice', function() {
  return function(item, type, event) {
    var isEvent = (item.event || event) && !oldEvents.includes(item.group);
    var quality = item.quality;
    if (item.standardItem || item.achievement || type === 'icons') return '';

    var prices = { common: 25, rare: 75, epic: 250, legendary: 1000 };

    if (quality && prices[quality]) {
      return '(' + prices[quality] * (isEvent ? 3 : 1) + ')';
    }
    return '';
  };
});

OWI.directive('fancyLoad', ["$timeout", function($timeout) {
  return {
    restrict: 'A',
    link: function($scope, $elm, $attr) {
      $timeout(function() {
        $elm.addClass('show');
      }, $attr.fancyLoad * 8);

      $elm.on('click', function() {
        $elm.addClass('pulse');
        $timeout(function() {
          $elm.removeClass('pulse');
        }, 50);
      });
    }
  };
}]);

OWI.directive('sectionHeader', function() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      name: '@',
      type: '@',
      totals: '=',
      selectModal: '='
    },
    templateUrl: './templates/section-header.html'
  };
});

OWI.directive('audiopls', ["StorageService", function(StorageService) {
  return {
    restrict: 'A',
    link: function($scope, $elm) {
      $elm[0].volume = StorageService.getSetting('audioVolume');
    }
  };
}]);

OWI.directive('tooltipImagePreview', ["StorageService", "UrlService", function(StorageService, UrlService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './templates/tooltip-image-preview.html',
    link: function($scope) {
      var item = $scope.item;
      var type = $scope.type;
      var url = UrlService.get(item.url);
      var url2 = UrlService.get(item.secondUrl)

      var out = { description: item.description };
      if (type === 'intros' || type === 'emotes') {
        if (StorageService.getSetting('hdVideos')) {
          out.video = url.replace('.webm', '-hd.webm');
        } else {
          out.video = url;
        }
      } else if (type === 'voicelines') {
        out.audio = url;
      } else {
        out.img = url;
        out.img2 = url2;
      }

      $scope.preview = out;
    }
  };
}]);

OWI.directive('legendarySkins', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './templates/legendary-skins.html',
    link: function($scope, $elm, $attr) {
      $scope.ss = $attr.ss;
      $scope.ssURL = $attr.ssurl;
    }
  };
});

OWI.directive('subHeader', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './templates/sub-header.html',
    link: function($scope, $elm, $attr) {
      if ($attr.costs) {
        $scope.cost = JSON.parse($attr.costs);
      }
    }
  };
});

OWI.directive('heroNav', ["CostAndTotalService", "DataService", function(CostAndTotalService, DataService) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      hideTotals: '=hideTotals'
    },
    templateUrl: './templates/hero-nav.html',
    controller: ["$scope", function($scope) {
      DataService.waitForInitialization().then(function() {
        $scope.heroes = DataService.heroes;
        $scope.events = DataService.events;
      })

      if (!$scope.hideTotals) {
        CostAndTotalService.waitForInitialization().then(function() {
          $scope.totals = CostAndTotalService
        })
      }
    }]
  };
}]);

OWI.directive('lazyAudio', ["$timeout", function($timeout) {
  return {
    restrict: 'A',
    scope: {},
    replace: true,
    templateUrl: './templates/audio-player.html',
    link: function($scope, $elm, $attrs) {
      var url = $attrs.lazyAudio;
      var audio = $elm.find('audio')[0];
      var refreshInterval = 20;
      var step = 0;
      var steps, timeout;
      $scope.progress = 0;

      // Prevent edge cases where the audio plays after tooltip has disappeared
      $scope.$on('$destroy', function() {
        audio.removeEventListener('canplaythrough', onLoad);
        audio.pause();
        $timeout.cancel(timeout);
      });

      function tick() {
        timeout = $timeout(function() {
          step++;
          $scope.progress = (step / steps) * 100;
          if (step >= steps) {
            $timeout.cancel(timeout);
          } else {
            tick();
          }
        }, refreshInterval);
      }

      function onLoad(event) {
        var duration = event.target.duration === Infinity ? 1.5 : event.target.duration;
        steps = Math.ceil(duration / (refreshInterval / 1000));
        tick();
        audio.play();
      }

      // Firefox returns infinity for duration on first load sometimes
      audio.addEventListener('canplaythrough', onLoad);
      audio.src = url;
    }
  };
}]);

// Based off http://sparkalow.github.io/angular-count-to/
OWI.directive('countTo', ['$timeout', '$filter', function ($timeout, $filter) {
  return {
    replace: false,
    scope: { },
    link: function ($scope, $elm, $attrs) {
      var e = $elm[0];
      var refreshInterval = 35;
      var duration = 480;
      var steps = Math.ceil(duration / refreshInterval);
      var num, step, countTo, increment, value, timeoutId;
      var calculate = function() {
        $timeout.cancel(timeoutId);
        timeoutId = null;
        step = 0;
        countTo = parseInt($attrs.countTo) || 0;
        value = parseInt($attrs.countFrom, 10) || 0;
        increment = ((countTo - value) / steps);
        num = value;
      };

      var tick = function() {
        timeoutId = $timeout(function() {
          num += increment;
          step++;
          if (step >= steps) {
            $timeout.cancel(timeoutId);
            num = countTo;
            e.textContent = $filter('number')(Math.round(countTo));
          } else {
            e.textContent = $filter('number')(Math.round(num));
            tick();
          }
        }, refreshInterval);
      };

      var start = function () {
        if (timeoutId) {
          $timeout.cancel(timeoutId);
        }
        calculate();
        tick();
      };

      $attrs.$observe('countTo', function(val) {
        if (val) {
          start();
        }
      });

      $attrs.$observe('countFrom', function() {
        start();
      });
    }
  };
}]);

OWI.directive('loadingSpinner', function() {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    templateUrl: './templates/loader.html'
  };
});

OWI.directive('lazyBackground', ["ImageLoader", "$compile", "$timeout", function(ImageLoader, $compile, $timeout) {
  return {
    restrict: 'A',
    scope: {
      noLoader: '=noLoader'
    },
    link: function($scope, $element, $attrs) {
      // Observe the lazy-background attribute so that when it changes it can fetch the new image and fade to it
      $attrs.$observe('lazyBackground', function(newSrc) {
        // Make sure newSrc is valid else return error
        if (newSrc === null || newSrc === "") {
          $element.css('background-image', '');
          // $element.addClass('img-load-error');
          return;
        }

        var loader;
        if (!$scope.noLoader) {
          loader = $compile('<loading-spinner />')($scope);
          $element.prepend(loader);
          $timeout(function () {
            loader.css('opacity', '1');
          }, 110);
        } else {
          loader = { remove: angular.noop };
        }

        ImageLoader.loadImage(encodeURI(newSrc), $scope.noLoader).then(function(src) {
          $element.css('background-image', 'url("' + src + '")');
          loader.remove();
        }, function() {
          console.warn("Error loading image");
          $element.css('background-image', '');
          $element.addClass('img-load-error', '');
          loader.remove();
        });
      });
    }
  };
}]);

OWI.directive('homeProgressBars', ["CostAndTotalService", function(CostAndTotalService) {
  return {
    restrict: 'E',
    templateUrl: './templates/home-progress-bars.html',
    scope: {},
    controller: ['$scope', function($scope) {
      $scope.isCollapsed = true;
      $scope.selected = 0;
      $scope.total = 0;

      $scope.qualities = {
        common: 0,
        rare: 0,
        epic: 0,
        legendary: 0,
        golden: 0
      }

      CostAndTotalService.waitForInitialization().then(function() {
        for (var quality in CostAndTotalService.qualities) {
          $scope.selected += CostAndTotalService.qualities[quality].selected
          $scope.total += CostAndTotalService.qualities[quality].total
        }

        $scope.qualities = {
          common: CostAndTotalService.qualities.common,
          rare: CostAndTotalService.qualities.rare,
          epic: CostAndTotalService.qualities.epic,
          legendary: CostAndTotalService.qualities.legendary,
          golden: CostAndTotalService.qualities.golden
        }
      })
    }]
  }
}])

/* OWI.directive("particles", function() {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    template: '<div id="particles-js"></div>',
    controller: function() {
      particlesJS({ //eslint-disable-line
        "particles": {
          "number": {
            "value": 56,
            "density": { "enable": true, "value_area": 631 }
          },
          "color": { "value": "#ffffff" },
          "shape": {
            "type": "circle",
            "stroke": { "width": 0, "color": "#000000" },
            "polygon": { "nb_sides": 5 },
            "image": { "src": "", "width": 100, "height": 100 }
          },
          "opacity": {
            "value": 0.6,
            "random": true,
            "anim": { "enable": false, "speed": 1, "opacity_min": 0.2, "sync": false }
          },
          "size": {
            "value": 4,
            "random": true,
            "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
          },
          "line_linked": { "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "bottom",
            "random": false,
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
}) */
