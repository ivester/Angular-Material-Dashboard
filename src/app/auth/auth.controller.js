(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['authService', '$location'];

  function AuthController(authService, $location) {
    var vm = this;

    vm.register = register;
    vm.login = login;

    function register(user) {
      return authService.register(user)
        .then(function () {
          return vm.login(user);
        })
        .catch(function (error) {
          vm.error = error;
          console.log(error);
        });
    }

    function login(user) {
      return authService.login(user)
        .then(function (response) {
          $location.path('/dashboard');
          console.log(response);
          return response;
        })
        .catch(function (error) {
          vm.error = error;
          console.log(error);
        });
    }
  }
})();