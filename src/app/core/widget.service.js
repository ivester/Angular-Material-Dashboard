(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('widgetService', widgetService);

  widgetService.$inject = ['$firebaseArray', 'firebaseDataService'];

  function widgetService($firebaseArray, firebaseDataService) {
    var service = {
      getWidgetByUser: getWidgetByUser,
      Widget: Widget
    };

    return service;

    //////////////////

    function getWidgetByUser(uid) {
      return $firebaseArray(firebaseDataService.users.child(uid).child('widget'));
    }

    function Widget() {
      this.title = '';
      this.description = '';
    }
  }
})();



//arrayfirebasething