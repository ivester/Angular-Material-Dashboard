(function() {
  'use strict';

  angular
    .module('app.cardTask')
    .filter('taskFilter', taskFilter);

    function taskFilter() {
      return function(input, status) {
        var result = [],
            taskIndex;

        function checkStatus(status) {
          for(taskIndex = 0; taskIndex < input.length; taskIndex++) {
            if(input[taskIndex].check === status) {
              result.push(input[taskIndex]);
            }
          }
        }

        if(status === 'closed') {
          checkStatus(true);
        } else if (status === 'open') {
          checkStatus(false);
        } else {
          result = input
        }

        return result;
      };
    }
})();