OWI.controller('MainCtrl', ["Data", function(Data) {
  this.preview = false;
  this.updates = Data.updates;
  this.selectedUpdate = 2;

  this.reset = function() {
    localStorage.removeItem('data');
    location.reload();
  };

  var storedData = localStorage.getItem('data')
  if (storedData) {
    var data = JSON.parse(storedData);
    Data.checked = Object.assign({}, Data.checked, data);
  }
}]);

OWI.directive("scroll", function ($window) {
  return function($scope) {
    angular.element($window).bind("scroll", function() {
      if (this.innerWidth > 1540) return;
      $scope.isFixed = this.pageYOffset >= 200 ? true : false;
      $scope.$apply();
    });
  };
});

OWI.directive("update", ["Data", function(Data) {
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
        Data.checked[$scope.data.id] = $scope.checked;
        localStorage.setItem('data', JSON.stringify(Data.checked));
      };

      var showTimeout = undefined;
      var hideTimeout = undefined;
      $scope.showPreview = function(what, small) {
        console.log(what)
        if (!what.url.includes('spray')) return
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
