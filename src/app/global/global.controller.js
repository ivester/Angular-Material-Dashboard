(function() {
  'use strict';

  angular
    .module('app.global')
    .controller('GlobalController', GlobalController);

  GlobalController.$inject = ['$location'];

  function GlobalController($location) {
    var vm = this,
      path = '';

    vm.hideNav = function() {
      path = $location.path();
      if(path === '/' || path === '/register' || path === '/login') {
        return true;
      } else {
        return false;
      }
    };
  }
})();