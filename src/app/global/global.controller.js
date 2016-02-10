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
        console.log('true');
        return true;
      } else {
        console.log('false');
        return false;
      }
    };
  }
})();