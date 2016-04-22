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
    //Fade in background image when image is loaded
    var imageUrl = attrs.irBackgroundImage;
    var image = document.createElement('img');

    image.src = imageUrl;

    //TODO - This double onload registration, once with and once without the timeout has been the only way to always catch the event - why?
    setTimeout(function(){
      image.onload = function () {
        elem.addClass('ir-background__image');
        elem.css('background-image', 'url("' + imageUrl + '")');
      };
    }, 0);

    image.onload = function () {
      elem.addClass('ir-background__image');
      elem.css('background-image', 'url("' + imageUrl + '")');
    };
  }
})();