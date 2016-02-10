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
      'app.global',
      'app.dashboard',
      'app.toolbar'
    ])
    .config(configFunction)
    .run(runFunction);

  configFunction.$inject = ['$mdThemingProvider', '$mdIconProvider', '$routeProvider'];

  function configFunction($mdThemingProvider, $mdIconProvider, $routeProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('blue');
    $mdIconProvider.icon("menu", "./bower_components/material-design-icons/navigation/svg/production/ic_menu_24px.svg", 24);
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