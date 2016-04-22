(function() {
  'use strict';

  angular
    .module('app.toolbar')
    .directive('irToolbar', irToolbar);

  function irToolbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/toolbar/toolbar.html'
      // TODO - I want to set replace: true but then I can't open the sidenav anymore nor logout. why?
    };
  }
})();