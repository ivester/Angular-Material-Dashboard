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
        cardId: '@'
      }
    }
  }

  cardController.$inject = ['$mdDialog', 'cardsService'];

  function cardController($mdDialog, cardsService) {
    var vm = this;

    vm.card = cardsService.getCard(vm.cardId);
    vm.tasks = cardsService.getTasks(vm.cardId);
    vm.taskStatus = 'all';

    vm.showEditCardTitle = function(cardTitle) {
      $mdDialog.show({
          locals: {
            cardTitle: cardTitle
          },
          controller: CardTitleDialogController,
          controllerAs: 'vm',
          templateUrl: 'src/app/card-task/card-task-dialog-edit.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true
        })
        .then(function(returnString) {
          vm.card.title = returnString;
          vm.card.$save()
            .then(function(){
              console.log('has been saved');
            });
        });
    };

    //TODO can I put this controller into a seperate file
    function CardTitleDialogController($mdDialog, cardTitle) {
      var vm = this;

      vm.title = cardTitle || '';
      vm.editMode = true;
      vm.false = true;

      vm.cancel = function() {
        $mdDialog.cancel();
      };

      vm.save = function(title) {
        $mdDialog.hide(title);
      }
    }

    vm.removeCard = function () {
      vm.card.$remove();
    };

    vm.addTask = function (title) {
      vm.tasks.$add({title: title, check: false})
        .then(function() {
          console.log('has been added');
        });
    };

    vm.saveTask = function (task) {
      vm.tasks.$save(task)
        .then(function(){
          console.log('has been saved');
        });
    };

    vm.removeTask = function(task) {
      vm.tasks.$remove(task)
        .then(function(){
          console.log('has been removed');
        });
    };

    vm.removeClosedTasks = function() {
      var taskIndex;

      for(taskIndex = 0; taskIndex < vm.tasks.length; taskIndex++) {
        if(vm.tasks[taskIndex].check === true) {
          vm.removeTask(vm.tasks[taskIndex]);
        }
      }
    };

    vm.showEditTask = function(taskRef, editMode) {
      $mdDialog.show({
          locals: {
            taskRef: taskRef,
            editMode: editMode
          },
          controller: TaskDialogController,
          controllerAs: 'vm',
          templateUrl: 'src/app/card-task/card-task-dialog-edit.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true
        })
        .then(function(returnObject) {
          if(returnObject.editMode === true) {
            taskRef.title = returnObject.taskTitle;
            vm.saveTask(taskRef);
          } else {
            vm.addTask(returnObject.taskTitle);
          }
        });
    };

    //TODO can I put this controller into a seperate file
    function TaskDialogController($mdDialog, taskRef, editMode) {
      var vm = this;

      vm.title = taskRef.title || '';
      vm.editMode = editMode;
      vm.task = true;

      vm.cancel = function() {
        $mdDialog.cancel();
      };

      vm.save = function(taskTitle, editMode) {
        var returnObject = {
          taskTitle: taskTitle,
          editMode: editMode
        };
        $mdDialog.hide(returnObject);
      }
    }
  }
})();