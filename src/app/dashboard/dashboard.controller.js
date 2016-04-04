(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$rootScope', 'user', 'cardsService', 'loadingIndicatorService'];

  function DashboardController($rootScope, user, cardsService, loadingIndicatorService) {
    var vm = this;

    vm.fabOpen = false;

    cardsService.saveUidLocal(user.uid);

    vm.cards = cardsService.getCards();

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

    $rootScope.$on('ir-logout', function () {
      vm.cards.$destroy();
      cardsService.removeUidLocal();
    });
  }
})();