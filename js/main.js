OWI.controller('MainCtrl', ["$scope", "Items", function($scope, Items) {
  var vm = this;

  this.preview = false;
  this.items = Items

  // Load any saved data from localstorage
  var onStartup = function() {
    vm.checked = {
      legendary: {},
      epic: {},
      emotes: {},
      intros: {},
      sprays: {},
      voicelines: {},
      victoryposes: {},
      icons: {}
    }

    var data = localStorage.getItem('data')
    if (data) {
      vm.checked = JSON.parse(data)
      $scope.$digest()
    }
  }

  this.reset = function() {
    console.log("reset")
    localStorage.removeItem('data')
    onStartup()
  }

  // Update localstorage on new data
  this.onSelect = function() {
    localStorage.setItem('data', JSON.stringify(this.checked))
  }

  var showTimeout = undefined;
  var hideTimeout = undefined;
  this.showPreview = function(what) {
    if (showTimeout) return
    clearTimeout(hideTimeout)
    showTimeout = setTimeout(function () {
      vm.preview = what
      $scope.$digest()
    }, vm.preview ? 100 : 650);
  }

  this.hidePreview = function(what) {
    clearTimeout(showTimeout);
    showTimeout = undefined;
    hideTimeout = setTimeout(function () {
      vm.preview = false;
      $scope.$digest()
    }, 150);
  }

  // Defer the starup so the initial digest finishes
  setTimeout(function () {
    onStartup()
  }, 0);
}])

OWI.directive("scroll", function ($window) {
  return function($scope, $element) {
    angular.element($window).bind("scroll", function() {
      if (this.innerWidth > 1540) return
      $scope.isFixed = this.pageYOffset >= 170 ? true : false;
      $scope.$apply();
    });
  };
});
