(function() {
  'use strict';

  angular
    .module('app.sidenav')
    .directive('irSidenav', irSidenav);

  function irSidenav() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/sidenav/sidenav.html',
      controller: SidenavController,
      controllerAs: 'vm',
      bindController: true
    };
  }

  SidenavController.$inject = ['$rootScope', 'authService'];

  function SidenavController($rootScope, authService) {
    var vm = this;

    $rootScope.$on('ir-logout', function () {
      vm.user = '';
    });

    //TODO - Improve - Is there a way to update user without $rootScope
    //When logging in
    $rootScope.$on('ir-login', function () {
      authService.firebaseAuthObject.$requireAuth().then(function(user) {
        vm.user = user;
      });
    });

    //When logged in and refresh page
    authService.firebaseAuthObject.$requireAuth().then(function(user) {
      vm.user = user;
    });
  }
})();