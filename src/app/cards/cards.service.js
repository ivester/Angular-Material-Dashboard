(function() {
  'use strict';

  angular
    .module('app.cards')
    .factory('cardsService', cardsService);

  cardsService.$inject = ['$firebaseArray', 'firebaseDataService', '$firebaseObject'];

  function cardsService($firebaseArray, firebaseDataService, $firebaseObject) {
    var service = {
      getCards: getCards,
      getCard: getCard,
      getTasks: getTasks,
      saveUidLocal: saveUidLocal,
      removeUidLocal: removeUidLocal
    };

    var localUid = '';

    return service;

    //////////////////

    function getCards() {
      return $firebaseArray(firebaseDataService.users.child(localUid).child('cards'));
    }

    function getCard(cardId) {
      return $firebaseObject(firebaseDataService.users.child(localUid).child('cards').child(cardId));
    }

    function getTasks(cardId) {
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