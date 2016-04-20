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

    //TODO - Without the timeout, the onload event sometimes doesn't get caught - why and is there a cleaner way to do the job?
    setTimeout(function(){
      image.onload = function () {
        elem.addClass('ir-background__image');
        elem.css('background-image', 'url("' + imageUrl + '")');
      };
    }, 0);
  }
})();