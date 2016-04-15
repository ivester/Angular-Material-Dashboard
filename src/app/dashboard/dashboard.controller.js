(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$rootScope', '$mdToast', 'user', 'cardsService', 'loadingIndicatorService'];

  function DashboardController($rootScope, $mdToast, user, cardsService, loadingIndicatorService) {
    var vm = this;
        vm.cards = null;

    vm.fabOpen = false;

    cardsService.saveUidLocal(user.uid);

    if(!vm.cards) {
      vm.cards = cardsService.getCards();

      vm.cards.$loaded()
        .then(function() {
          loadingIndicatorService.removeLoading();
        })
        .catch(function(error) {
          loadingIndicatorService.removeLoading();
          $mdToast.show(
            $mdToast.simple()
              .textContent(error.message)
              .position('top left')
              .hideDelay(6000)
          );
          console.error("Error:", error);
        });
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
          $mdToast.show(
            $mdToast.simple()
              .textContent(error.message)
              .position('top left')
              .hideDelay(6000)
          );
          console.error("Error:", error);
        });
    };
  }
})();