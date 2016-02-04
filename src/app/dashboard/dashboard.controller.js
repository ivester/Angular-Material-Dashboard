(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$rootScope', 'user', 'widgetService'];

  function DashboardController($rootScope, user, widgetService) {
    var vm = this;

    vm.widget = widgetService.getWidgetByUser(user.uid);


    vm.addWidget = function () {
      vm.widget.$add(vm.newWidget);
      vm.newWidget = new widgetService.Widget();
    };

    vm.addWidget();

    $rootScope.$on('iv-logout', function () {
      vm.widget.$destroy();
    });
  }
})();