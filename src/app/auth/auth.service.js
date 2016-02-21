(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('authService', authService);

  authService.$inject = ['$firebaseAuth', 'firebaseDataService', '$rootScope'];

  function authService($firebaseAuth, firebaseDataService, $rootScope) {
    var firebaseAuthObject = new $firebaseAuth(firebaseDataService.root);

    var service = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login: login,
      logout: logout
    };

    return service;

    ///////////

    function register(user) {
      return firebaseAuthObject.$createUser(user);
    }

    function login(user) {
      return firebaseAuthObject.$authWithPassword(user);
    }

    function logout() {
      firebaseAuthObject.$unauth();
      $rootScope.$broadcast('ir-logout');
    }
  }
})();