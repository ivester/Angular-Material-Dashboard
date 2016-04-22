(function() {
  'use strict';
  
  angular
    .module('app.cards')
    .directive('irCards', irCards);

  function irCards() {
    return {
      restrict: 'E',
      templateUrl: 'app/cards/cards.html',
      replace: true
    };
  }
})();