(function() {
  'use strict';

  angular
    .module('app.cardTask')
    .directive('irCardTask', irCardTask);

  function irCardTask() {
    return {
      restrict: 'E',
      controller: cardController,
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'src/app/card-task/card-task.html',
      scope: {
        cardTitle: '@',
        cardId: '@'
      }
    }
  }

  cardController.$inject = ['$scope', '$mdDialog', 'cardsService'];

  function cardController($scope, $mdDialog, cardsService) {
    var vm = this;

    vm.tasks = cardsService.getTask(vm.cardId);

    //vm.addTask = function (title) {
    //  vm.tasks.$add({title: title, done: false});
    //};

    vm.showAddTask = function(ev) {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'src/app/card-task/card-task-dialog-add.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
        .then(function(answer) {
          vm.status = 'You said the information was "' + answer + '".';
        }, function() {
          vm.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }
  }
})();