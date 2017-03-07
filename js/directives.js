var types = {
  'portrait': '/portrait.png',
  'career': '/career-portrait.png',
  'icon': '/icon.png'
}

OWI.filter('heroImg', function() {
  return function(hero, type) {
    return hero == 'all' ? './resources/logo.svg' : './resources/heroes/' + hero + types[type];
  }
});

OWI.filter('eventImageUrl', function() {
  return function(event) {
    return './resources/updates/' + event + '/logo.png';
  }
});

OWI.filter('itemPrice', function() {
  return function(item, type) {
    var event = item.event
    var quality = item.quality
    if (item.standardItem || item.achievement || type == 'icons' || (event && event == 'SUMMER_GAMES_2016')) return '';

    var prices = { common: 25, rare: 75, epic: 250, legendary: 1000 };

    if (quality && prices[quality]) {
      return '(' + prices[quality] * (event ? 3 : 1) + ')';
    }
    return '';
  }
})

OWI.directive('fancyLoad', function() {
  return {
    restrict: 'A',
    link: function($scope, $elm, $attr) {
      setTimeout(function() {
        $elm.css('transform', 'scale(1)');
      }, $attr.fancyLoad * 8);
      $elm.on('click', function() {
        $elm.addClass('pulse');
        setTimeout(function() {
          $elm.removeClass('pulse');
        }, 50)
      })
    }
  }
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
  }
})

OWI.directive("scroll", function($window) {
  return function($scope) {
    angular.element($window).bind("scroll", function() {
      if (this.innerWidth > 1570) return;
      $scope.isFixed = this.pageYOffset >= 200 ? true : false;
      $scope.$apply();
    });
  };
});

OWI.directive('tooltipImagePreview', ["StorageService", function(StorageService) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      item: '=data',
      supportsWebM: '=support'
    },
    templateUrl: './templates/tooltip-image-preview.html',
    link: function($scope) {
      if (StorageService.getSetting('hdVideos') && $scope.item.video) {
        $scope.item.video = $scope.item.video.replace('.webm', '-hd.webm');
      }
      $scope.preview = $scope.item;
    }
  }
}])

OWI.directive('legendarySkins', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './templates/legendary-skins.html',
    link: function($scope, $elm, $attr) {
      $scope.ss = $attr.ss
      $scope.ssURL = $attr.ssurl
    }
  }
})

OWI.directive('subHeader', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './templates/sub-header.html'
  }
})

OWI.directive('heroNav', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './templates/hero-nav.html'
  }
})

// Based off http://sparkalow.github.io/angular-count-to/
OWI.directive('countTo', ['$timeout', '$filter', function ($timeout, $filter) {
  return {
    replace: false,
    scope: true,
        link: function (scope, element, attrs) {
          var e = element[0];
          var num, refreshInterval, duration, steps, step, countTo, increment;
          var calculate = function() {
            refreshInterval = 30;
            step = 0;
            scope.timoutId = null;
            countTo = parseInt(attrs.countTo) || 0;
            scope.value = parseInt(attrs.countFrom, 10) || 0;
            duration = (parseFloat(attrs.duration) * 1000) || 0;
            steps = Math.ceil(duration / refreshInterval);
            increment = ((countTo - scope.value) / steps);
            num = scope.value;
          }

          var tick = function() {
            scope.timoutId = $timeout(function () {
              num += increment;
              step++;
              if (step >= steps) {
                $timeout.cancel(scope.timoutId);
                num = countTo;
                e.textContent = $filter('number')(Math.round(countTo));
              } else {
                e.textContent = $filter('number')(Math.round(num));
                tick();
              }
            }, refreshInterval);
          }

          var start = function () {
            if (scope.timoutId) {
              $timeout.cancel(scope.timoutId);
            }
            calculate();
            tick();
          }

          attrs.$observe('countTo', function(val) {
            if (val) {
                start();
            }
          });

          attrs.$observe('countFrom', function() {
            start();
          });
          return true;
        }
    }
}]);

OWI.directive('loadingSpinner', function() {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    template: '<div class="loader"><ul class="hexagon-container"><li class="hexagon hex_1"></li><li class="hexagon hex_2"></li><li class="hexagon hex_3"></li><li class="hexagon hex_4"></li><li class="hexagon hex_5"></li><li class="hexagon hex_6"></li><li class="hexagon hex_7"></li></ul></div>'
  }
})

OWI.directive('lazyBackground', ["ImageLoader", "$compile", function(ImageLoader, $compile) {
  return {
    restrict: 'A',
    scope: {},
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
        if (!$attrs.noLoader) {
          loader = $compile('<loading-spinner />')($scope)
          $element.prepend(loader)
          setTimeout(function () {
            loader.css('opacity', '1')
          }, 110);
        } else {
          loader = { remove: angular.noop }
        }
        
        ImageLoader.loadImage(encodeURI(newSrc)).then(function(src) {
          $element.css('background-image', 'url("' + src + '")');
          loader.remove();
        }, function() {
          console.warn("Error loading image");
          $element.css('background-image', '');
          loader.remove();
        });
      });
    }
  }
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
