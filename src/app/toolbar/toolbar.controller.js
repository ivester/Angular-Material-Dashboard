(function () {
  'use strict';

  angular
    .module('app.toolbar')
    .controller('ToolbarController', ToolbarController);

  ToolbarController.$inject = ['$mdSidenav', '$location', 'authService'];

  function ToolbarController($mdSidenav, $location, authService) {
    var vm = this;

    vm.logout = logout;
    vm.toggleSidenav = toggleSidenav;

    function logout() {
      authService.logout();
      $location.path('/login')
    }

    function toggleSidenav() {
      $mdSidenav('left').toggle();
    }
  }
})();