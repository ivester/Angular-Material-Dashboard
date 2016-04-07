(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$rootScope', '$location', '$mdToast', 'authService', 'loadingIndicatorService'];

  function AuthController($rootScope, $location, $mdToast, authService, loadingIndicatorService) {
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
          $mdToast.show(
            $mdToast.simple()
              .textContent(error.message)
              .position('top left')
              .hideDelay(6000)
          );
          console.error("Error:", error);
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
          $mdToast.show(
            $mdToast.simple()
              .textContent(error.message)
              .position('top left')
              .hideDelay(6000)
          );
          console.error("Error:", error);
        });
    }
  }
})();