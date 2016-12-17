var OWI = angular.module('OWI', ['ui.bootstrap'])

OWI.config(['$compileProvider', function($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}])
