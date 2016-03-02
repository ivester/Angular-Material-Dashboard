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

  cardController.$inject = ['$mdDialog', 'cardsService'];

  function cardController($mdDialog, cardsService) {
    var vm = this;

    vm.taskStatus = 'all';
    vm.tasks = cardsService.getTask(vm.cardId);

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
          controller: DialogController,
          controllerAs: 'vm',
          templateUrl: 'src/app/card-task/card-task-dialog-edit.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          closeTo: '.card-task-dialog-add'
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
    function DialogController($mdDialog, taskRef, editMode) {
      var vm = this;

      vm.taskRef = taskRef;
      vm.taskTitle = taskRef.title || '';
      vm.editMode = editMode;

      vm.cancel = function() {
        $mdDialog.cancel();
      };

      vm.saveTask = function(taskTitle, editMode) {
        var returnObject = {
          taskTitle: taskTitle,
          editMode: editMode
        };
        $mdDialog.hide(returnObject);
      }
    }
  }
})();