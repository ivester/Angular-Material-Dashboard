(function() {
  'use strict';

  angular
    .module('app.core')
    .directive('irBackground', irBackground);

  function irBackground() {
    return {
      restrict: 'E',
      link: irBackgroundLink
    }
  }

  function irBackgroundLink(scope, elem, attrs) {
    var imageUrl = attrs.irBackgroundImage;
    var image = document.createElement('img');

    image.src = imageUrl;
    image.onload = function () {
      elem.addClass('background-image-full');
      elem.css('background-image', 'url("' + imageUrl + '")');
    };
  }
})();