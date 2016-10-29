OWI.controller('MainCtrl', ["Data", function(Data) {
  this.preview = false;
  this.updates = Data.updates;
  this.selectedUpdate = 1;

  this.reset = function() {
    localStorage.removeItem('data');
    location.reload();
  };

  var storedData = localStorage.getItem('data')
  if (storedData) {
    var data = JSON.parse(storedData)
    if (!data.halloween2016) { // Migrate data to new format
      data = Object.assign({}, Data.checked, { halloween2016: data });
      localStorage.setItem('data', JSON.stringify(data));
      Data.checked = data;
    } else {
      Data.checked = Object.assign({}, Data.checked, data);
    }
  }
}]);

OWI.directive("scroll", function ($window) {
  return function($scope) {
    angular.element($window).bind("scroll", function() {
      if (this.innerWidth > 1540) return;
      $scope.isFixed = this.pageYOffset >= 170 ? true : false;
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
      $scope.showPreview = function(what) {
        if (showTimeout) return;
        clearTimeout(hideTimeout)
        showTimeout = setTimeout(function () {
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
