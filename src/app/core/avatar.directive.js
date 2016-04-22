(function() {
  'use strict';

  angular
    .module('app.core')
    .directive('irAvatar', irAvatar);

  function irAvatar() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/core/avatar.html',
      controller: AvatarController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        irUser: '@'
      },
      link: irAvatarLink
    }
  }

  AvatarController.$inject = ['$scope'];

  function AvatarController($scope) {
    var vm = this;
    var str;

    //TODO - Improve - is there a way to update image without $watch?
    $scope.$watch('vm.irUser', function(irUser) {
      str = irUser;
      str = str.toLowerCase().trim();
      $scope.hash = md5(str) + '?s=600';
    });
  }

  function irAvatarLink(scope) {
    //get gravatar profil image and fade it in when loaded
    scope.$watch('hash', function() {
      var imagePlaceholder = document.createElement('div');
      var imageUrl = 'http://www.gravatar.com/avatar/' + scope.hash;
      var image = document.createElement('img');
      var imageToReplace = document.querySelector('.ir-avatar--js');

      //Prevent flash after logout and login with a new user
      imagePlaceholder.setAttribute('class', 'ir-avatar--js');
      imageToReplace.parentNode.replaceChild(imagePlaceholder, imageToReplace);
      imageToReplace = imagePlaceholder;

      image.src = imageUrl;

      //TODO - Improve - Is there a way to not have to save hash on $scope
      image.onload = function () {
        image.setAttribute('class', 'ir-avatar--js');
        image.setAttribute('alt', 'Profile Image');
        imageToReplace.parentNode.replaceChild(image, imageToReplace);
      };
    }, true);
  }
})();