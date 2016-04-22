(function () {
  'use strict';

  angular
    .module('app', [
      // Angular Modules
      'ngRoute',
      'ngMessages',

      // Third Party Modules
      'ngMaterial',
      'firebase',
      'dragularModule',

      // Custom Modules
      'app.core',
      'app.auth',
      'app.global',
      'app.toolbar',
      'app.sidenav',
      'app.dashboard',
      'app.cards',
      'app.cardTask',
      'app.cardWeather'
    ])
    .config(configFunction)
    .run(runFunction);

  // TODO When is inject neede and when not - I've noticed that code also sometimes worked without inject
  configFunction.$inject = ['$mdThemingProvider', '$mdIconProvider', '$routeProvider'];

  function configFunction($mdThemingProvider, $mdIconProvider, $routeProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('blue');
    $mdIconProvider
      .icon('menu', './assets/img/ic_menu_24px.svg', 24)
      .icon('close', './assets/img/ic_close_24px.svg', 24)
      .icon('delete', './assets/img/ic_delete_24px.svg', 24)
      .icon('more-vert', './assets/img/ic_more_vert_24px.svg', 24)
      .icon('edit', './assets/img/ic_edit_24px.svg', 24)
      .icon('add', './assets/img/ic_add_24px.svg', 24)
      .icon('assignment', './assets/img/ic_assignment_24px.svg', 24)
      .icon('grain', './assets/img/ic_grain_24px.svg', 24);
    $routeProvider.otherwise({
      redirectTo: '/dashboard'
    });
  }

  runFunction.$inject = ['$rootScope', '$location'];

  function runFunction($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function () {
      $location.path('/login');
    });
  }

})();