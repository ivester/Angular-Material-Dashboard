(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('loadingIndicatorService', loadingIndicatorService);

  loadingIndicatorService.$inject = ['$rootScope'];

  function loadingIndicatorService($rootScope) {
    var loadingStatus = [],
        loginStatus = [];

    function getLoadingStatus() {
      return loadingStatus.length !== 0;
    }

    function getLoginStatus() {
      return loginStatus.length !== 0;
    }

    function addLoading() {
      loadingStatus.push(true);
      $rootScope.$broadcast('ir-update-loading-status');
    }

    function addLogin() {
      loginStatus.push(true);
      $rootScope.$broadcast('ir-update-login-status');
    }

    function removeLoading() {
      loadingStatus.splice(0, 1);
      $rootScope.$broadcast('ir-update-loading-status');
    }

    function removeLogin() {
      loginStatus.splice(0, 1);
      $rootScope.$broadcast('ir-update-login-status');
    }

    var service = {
      addLoading: addLoading,
      addLogin: addLogin,
      removeLoading: removeLoading,
      removeLogin: removeLogin,
      getLoadingStatus: getLoadingStatus,
      getLoginStatus: getLoginStatus
    };

    return service;
  }
})();