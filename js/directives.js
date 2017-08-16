var types = {
  'portrait': '/portrait.png',
  'career': '/career-portrait.png',
  'icon': '/icon.png'
};

var baseURL = './resources/';

OWI.filter('heroImg', function() {
  return function(hero, type) {
    return hero == 'all' ? baseURL + 'logo.svg' : baseURL + 'heroes/' + hero + types[type];
  };
});

OWI.filter('eventImageUrl', function() {
  return function(event) {
    return baseURL + 'updates/' + event + '/logo.png';
  };
});

OWI.filter('itemPrice', function() {
  return function(item, type, event) {
    var isEvent = (item.event || event) && item.group !== 'SUMMER_GAMES_2016';
    var quality = item.quality;
    if (item.standardItem || item.achievement || type == 'icons') return '';

    var prices = { common: 25, rare: 75, epic: 250, legendary: 1000 };

    if (quality && prices[quality]) {
      return '(' + prices[quality] * (isEvent ? 3 : 1) + ')';
    }
    return '';
  };
});

OWI.directive('fancyLoad', function() {
  return {
    restrict: 'A',
    link: function($scope, $elm, $attr) {
      setTimeout(function() {
        $elm.addClass('show');
      }, $attr.fancyLoad * 8);
      $elm.on('click', function() {
        $elm.addClass('pulse');
        setTimeout(function() {
          $elm.removeClass('pulse');
        }, 50);
      });
    }
  };
});

OWI.directive('eventItem', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './templates/event-item.html',
    link: function($scope, $elm, $attr) {
      $scope.type = $attr.type;
      $scope.noHero = $attr.nohero;
      $scope.noName = $attr.noname;
    }
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

OWI.directive('tooltipImagePreview', ["StorageService", function(StorageService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './templates/tooltip-image-preview.html',
    link: function($scope) {
      var item = $scope.item;
      var type = $scope.type;
      var url = item.url;

      var out = { description: item.description };
      if (type == 'intros' || type == 'emotes') {
        if (StorageService.getSetting('hdVideos')) {
          out.video = url.replace('.webm', '-hd.webm');
        } else {
          out.video = url;
        }
      } else if (type == 'voicelines') {
        out.audio = url;
      } else {
        out.img = url;
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

OWI.directive('heroNav', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      totals: "=totals",
      events: "=events",
      heroes: "=heroes"
    },
    templateUrl: './templates/hero-nav.html'
  };
});

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
        var duration = event.target.duration == Infinity ? 1.5 : event.target.duration;
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

OWI.directive('lazyBackground', ["ImageLoader", "$compile", function(ImageLoader, $compile) {
  return {
    restrict: 'A',
    scope: {
      noLoader: '=noLoader'
    },
    link: function($scope, $element, $attrs) {
      // Observe the lazy-background attribute so that when it changes it can fetch the new image and fade to it
      $attrs.$observe('lazyBackground', function(newSrc) {
        // Make sure newSrc is valid else return error
        if (newSrc == null || newSrc == "") {
          $element.css('background-image', '');
          //$element.addClass('img-load-error');
          return;
        }

        var loader;
        if (!$scope.noLoader) {
          loader = $compile('<loading-spinner />')($scope);
          $element.prepend(loader);
          setTimeout(function () {
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
