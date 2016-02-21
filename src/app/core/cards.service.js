(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('cardsService', cardsService);

  cardsService.$inject = ['$firebaseArray', 'firebaseDataService'];

  function cardsService($firebaseArray, firebaseDataService) {
    var service = {
      getCards: getCards,
      saveUidLocal: saveUidLocal,
      removeUidLocal: removeUidLocal,
      getTask: tasks
    };

    var localUid = '';

    return service;

    //////////////////

    function getCards() {
      return $firebaseArray(firebaseDataService.users.child(localUid).child('cards'));
    }

    function tasks(cardId) {
      return $firebaseArray(firebaseDataService.users.child(localUid).child('cards').child(cardId).child('tasks'));
    }

    function saveUidLocal (uid) {
      localUid = uid;
    }

    function removeUidLocal () {
      localUid = '';
    }
  }
})();



//arrayfirebasething