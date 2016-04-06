(function() {
  'use strict';

  angular
    .module('app.cardWeather')
    .directive('irCardWeather', irCardWeather);

  function irCardWeather() {
    return {
      restrict: 'E',
      controller: cardController,
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'src/app/card-weather/card-weather.html',
      scope: {
        cardId: '@'
      }
    }
  }

  cardController.$inject = [];

  function cardController() {}
})();