(function() {
  'use strict';

  angular
    .module('app.global')
    .controller('GlobalController', GlobalController);

  GlobalController.$inject = ['$location', '$rootScope','loadingIndicatorService'];

  function GlobalController($location, $rootScope, loadingIndicatorService) {
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

    vm.loadingStatus = true;

    $rootScope.$on('ir-update-loading-status', function() {
      vm.loadingStatus = loadingIndicatorService.getLoadingStatus();
    });
  }
})();