(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$rootScope', 'user', 'cardsService', 'loadingIndicatorService'];

  function DashboardController($rootScope, user, cardsService, loadingIndicatorService) {
    var vm = this;
        vm.cards = null;

    vm.fabOpen = false;

    cardsService.saveUidLocal(user.uid);

    if(!vm.cards) {
      vm.cards = cardsService.getCards();
    }

    $rootScope.$on('ir-logout', function () {
      if(vm.cards) {
        vm.cards.$destroy();
        vm.cards = null;
      }
      cardsService.removeUidLocal();
    });

    vm.addCard = function (title, type) {
      loadingIndicatorService.addLoading();
      vm.cards.$add({title: title, type: type})
        .then(function () {
          loadingIndicatorService.removeLoading();
        })
        .catch(function(error) {
          loadingIndicatorService.removeLoading();
          console.error("Error:", error);
        });
    };
  }
})();