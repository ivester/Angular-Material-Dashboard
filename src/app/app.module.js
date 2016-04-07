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
      .icon('menu', './bower_components/material-design-icons/navigation/svg/production/ic_menu_24px.svg', 24)
      .icon('close', './bower_components/material-design-icons/navigation/svg/production/ic_close_24px.svg', 24)
      .icon('delete', './bower_components/material-design-icons/action/svg/production/ic_delete_24px.svg', 24)
      .icon('more-vert', './bower_components/material-design-icons/navigation/svg/production/ic_more_vert_24px.svg', 24)
      .icon('delete', './bower_components/material-design-icons/action/svg/production/ic_delete_24px.svg', 24)
      .icon('edit', './bower_components/material-design-icons/image/svg/production/ic_edit_24px.svg', 24)
      .icon('add', './bower_components/material-design-icons/content/svg/production/ic_add_24px.svg', 24)
      .icon('assignment', './bower_components/material-design-icons/action/svg/production/ic_assignment_24px.svg', 24)
      .icon('drag-handle', 'bower_components/material-design-icons/editor/svg/production/ic_drag_handle_24px.svg', 24);
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