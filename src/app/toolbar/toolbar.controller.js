(function () {
  'use strict';

  angular
    .module('app.toolbar')
    .controller('ToolbarController', ToolbarController);

  ToolbarController.$inject = ['authService', '$location'];

  function ToolbarController(authService, $location) {
    var vm = this;

    vm.logout = logout;

    function logout() {
      console.log('logout');
      authService.logout();
      $location.path('/login')
    }
  }
})();