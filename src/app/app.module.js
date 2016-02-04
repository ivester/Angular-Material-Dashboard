(function () {
  'use strict';

  angular
    .module('app', [
      // Angular Modules
      'ngRoute',

      // Third Party Modules
      'ngMaterial',
      'firebase',

      // Custom Modules
      'app.core',
      'app.auth',
      'app.dashboard',
      'app.toolbar'
    ])
    .config(configFunction)
    .run(runFunction);

  configFunction.$inject = ['$mdThemingProvider', '$routeProvider'];

  function configFunction($mdThemingProvider, $routeProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('blue');
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }

  runFunction.$inject = ['$rootScope', '$location'];

  function runFunction($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function () {
      $location.path('/');
    });
  }

})();