(function() {
  'use strict';

  angular
    .module('app.card')
    .directive('irCard', irCard);

  function irCard() {
    return {
      restrict: 'E',
      controller: cardController,
      controllerAs: 'vm',
      bindToController: true,
      template: '<div ng-include="getTemplateUrl()"></div>',
      link: function(scope, element, attrs) {
        scope.getTemplateUrl = function() {
          return 'src/app/card/card-' + attrs.cardType + '.html';
        };
        scope.getControllerName = function() {
          return attrs.controllerName;
        };
        console.log(attrs.controllerName);
      },
      scope: {
        controllerName: '@',
        cardTitle: '@',
        cardId: '@'
      }
    }
  }

  //angular
  //  .module('app.card')
  //  .controller('cardController', cardController);

  cardController.$inject = ['$mdDialog', 'cardsService'];

  function cardController($mdDialog, cardsService) {
    var vm = this;

    vm.tasks = cardsService.getTask(vm.cardId);

    vm.addTask = function (title) {
      vm.tasks.$add({title: title, done: false});
    };
  }
})();