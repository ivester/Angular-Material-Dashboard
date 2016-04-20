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
      templateUrl: 'app/card-task/card-task.html',
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

        tasks = elem[0].querySelector('.ir-task-list--js').querySelectorAll('li');

        for (newTaskIndex = 0; newTaskIndex < tasks.length; newTaskIndex++) {
          taskKey = tasks[newTaskIndex].getAttribute('ir-task-id');
          taskIdAndIndex.push({
            'key': taskKey,
            'index': tasks.length - 1 - newTaskIndex
          });
        }

        scope.vm.card.taskIndex = taskIdAndIndex;

        scope.vm.saveCard();
      };
    }
  }

  cardController.$inject = ['$scope', '$rootScope', '$element', '$mdDialog', '$mdToast', 'dragularService', 'cardsService', 'loadingIndicatorService'];

  function cardController($scope, $rootScope, $element, $mdDialog, $mdToast, dragularService, cardsService, loadingIndicatorService) {
    var vm = this;
        vm.card = null;
        vm.tasks = null;


    if(!vm.card) {
      vm.card = cardsService.getCard(vm.cardId);
    }
    if(!vm.tasks) {
      vm.tasks = cardsService.getTasks(vm.cardId);
    }

    $rootScope.$on('ir-logout', function () {
      if(vm.card) {
        vm.card.$destroy();
        vm.card = null;
      }
      if(vm.tasks) {
        vm.tasks.$destroy();
        vm.tasks = null;
      }
    });

    //TODO Catch image loading and error - maybe prevent that image load error doesn't break the rest too
    //TODO Maybe loading timeout that stops everything and throws an error
    //TODO Catch global error when can't connect to firebase
    //TODO Toastr message whit further infos to error and possible actions that can be taken

    loadingIndicatorService.addLoading();

    vm.tasks.$loaded()
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

    vm.showEditCardTitle = function(cardTitle) {
      $mdDialog.show({
          locals: {
            cardTitle: cardTitle
          },
          controller: CardTitleDialogController,
          controllerAs: 'vm',
          templateUrl: 'app/card-task/card-task-dialog-edit.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true
        })
        .then(function(returnString) {
          vm.card.title = returnString;
          vm.saveCard();
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

    //TODO make cards draggable too
    dragularService([$element[0].querySelector('.ir-task-list--js')], {
      moves: function (el, container, handle) {
        return handle.querySelector('.ir-task-list__drag--js svg') !== null;
      },
      nameSpace: 'task-list-' + vm.cardId,
      scope: $scope
    });

    vm.saveCard = function() {
      loadingIndicatorService.addLoading();
      vm.card.$save()
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
    };

    vm.removeCard = function () {
      loadingIndicatorService.addLoading();
      vm.card.$remove()
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
    };

    vm.addTask = function (title) {
      loadingIndicatorService.addLoading();
      vm.tasks.$add({title: title, check: false})
        .then(function(ref) {
          if(vm.card.taskIndex) {
            vm.card.taskIndex.push({
              'key': ref.key(),
              'index': vm.tasks.length - 1
            });
            vm.saveCard();
          } else {
            vm.card.taskIndex = [{
              'key': ref.key(),
              'index': vm.tasks.length - 1
            }];
            vm.saveCard();
          }
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

    vm.saveTask = function (task) {
      loadingIndicatorService.addLoading();
      vm.tasks.$save(task)
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
    };

    vm.removeTask = function(task) {
      loadingIndicatorService.addLoading();
      vm.tasks.$remove(task)
        .then(function(ref){
          loadingIndicatorService.removeLoading();
          vm.card.taskIndex = removeIndex(vm.card.taskIndex, ref.key());
          vm.saveCard();
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
          templateUrl: 'app/card-task/card-task-dialog-edit.html',
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