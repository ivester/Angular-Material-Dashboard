(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$rootScope', 'user', 'cardsService'];

  function DashboardController($rootScope, user, cardsService) {
    var vm = this;

    cardsService.saveUidLocal(user.uid);

    vm.cards = cardsService.getCards(user.uid);

    vm.addCard = function (type) {
      vm.cards.$add({title: type, type: type});
    };

    $rootScope.$on('ir-logout', function () {
      vm.cards.$destroy();
      cardsService.removeUidLocal();
    });
  }
})();