(function() {
  'use strict';

  angular
    .module('app.cardTask')
    .filter('taskFilterOrder', taskFilterOrder);

    function taskFilterOrder() {
      return function(input, taskIndex) {
        var index,
            record,
            resultArray = [];

        if(typeof taskIndex === 'undefined') {
          return input;
        }

        function sortArray(array) {
          array.sort(function(a, b) {
            return a.index - b.index;
          });
        }

        function getRecord(taskArray, key) {
          var index;
          for(index = 0; index < taskArray.length; index++) {
            if(taskArray[index].$id === key) {
              return taskArray[index];
            }
          }

          return false;
        }

        sortArray(taskIndex);

        for(index = taskIndex.length - 1; index >= 0; index--) {
          record = getRecord(input, taskIndex[index].key);

          if(record) {
            resultArray.push(record);
          }
        }

        return resultArray;
      };
    }
})();