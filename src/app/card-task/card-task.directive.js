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
      link: cardLink,
      scope: {
        cardId: '@'
      }
    }
  }

  function cardLink(scope, elem) {
    var tasks = [];

    scope.$on('dragulardrop', updateTaskIndex());

    function updateTaskIndex() {
      return function() {
        var task, taskKey, newTaskIndex,
          taskIdAndIndex = [];

        tasks = elem[0].querySelector('.task-list--js').querySelectorAll('li');

        for (newTaskIndex = 0; newTaskIndex < tasks.length; newTaskIndex++) {
          taskKey = tasks[newTaskIndex].getAttribute('ir-task-id');
          taskIdAndIndex.push({
            'key': taskKey,
            'index': tasks.length - 1 - newTaskIndex
          });
        }

        scope.vm.card.taskIndex = taskIdAndIndex;

        scope.vm.card.$save();
      };
    }
  }

  cardController.$inject = ['$scope', '$mdDialog', '$element', 'dragularService', 'cardsService'];

  function cardController($scope, $mdDialog, $element, dragularService, cardsService) {
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
          vm.card.$save();
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

    dragularService([$element[0].querySelector('.task-list--js')], {
      moves: function (el, container, handle) {
        return handle.querySelector('.drag-handle--js svg') !== null;
      },
      nameSpace: 'task-list-' + vm.cardId,
      scope: $scope
    });

    vm.removeCard = function () {
      vm.card.$remove();
    };

    vm.addTask = function (title) {
      vm.tasks.$add({title: title, check: false})
        .then(function(ref) {
          if(vm.card.taskIndex) {
            vm.card.taskIndex.push({
              'key': ref.key(),
              'index': vm.tasks.length - 1
            });
            vm.card.$save();
          } else {
            vm.card.taskIndex = [{
              'key': ref.key(),
              'index': vm.tasks.length - 1
            }];
            vm.card.$save();
          }
        });
    };

    vm.saveTask = function (task) {
      vm.tasks.$save(task);
    };

    vm.removeTask = function(task) {
      vm.tasks.$remove(task)
        .then(function(ref){
          vm.card.taskIndex = removeIndex(vm.card.taskIndex, ref.key());
          vm.card.$save();
        });
    };

    function removeIndex(array, key) {
      for(var index = 0; index < array.length; index++) {
        if(array[index].key === key) {
          array.splice(index, 1);
          return array;
        }
      }
    }

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