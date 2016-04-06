(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$rootScope', 'authService', '$location', 'loadingIndicatorService'];

  function AuthController($rootScope, authService, $location, loadingIndicatorService) {
    var vm = this;

    vm.register = register;
    vm.login = login;

    function register(user) {
      loadingIndicatorService.addLogin();
      vm.loginStatus = loadingIndicatorService.getLoginStatus();
      return authService.register(user)
        .then(function () {
          loadingIndicatorService.removeLogin();
          vm.loginStatus = loadingIndicatorService.getLoginStatus();
          return vm.login(user);
        })
        .catch(function (error) {
          vm.error = error;
          loadingIndicatorService.removeLogin();
          vm.loginStatus = loadingIndicatorService.getLoginStatus();
          console.log(error);
        });
    }

    function login(user) {
      loadingIndicatorService.addLogin();
      vm.loginStatus = loadingIndicatorService.getLoginStatus();
      return authService.login(user)
        .then(function (response) {
          $rootScope.$broadcast('ir-login');
          $location.path('/dashboard');
          loadingIndicatorService.removeLogin();
          vm.loginStatus = loadingIndicatorService.getLoginStatus();
          return response;
        })
        .catch(function (error) {
          vm.error = error;
          loadingIndicatorService.removeLogin();
          vm.loginStatus = loadingIndicatorService.getLoginStatus();
          console.log(error);
        });
    }
  }
})();