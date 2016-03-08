(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$rootScope', 'user', 'cardsService'];

  function DashboardController($rootScope, user, cardsService) {
    var vm = this;

    vm.fabOpen = false;

    cardsService.saveUidLocal(user.uid);

    vm.cards = cardsService.getCards();

    vm.addCard = function (title, type) {
      vm.cards.$add({title: title, type: type});
    };

    $rootScope.$on('ir-logout', function () {
      vm.cards.$destroy();
      cardsService.removeUidLocal();
    });
  }
})();