'use strict';

(function () {

  window.removePins = function () {
    var pinList = document.querySelector('.map__pins');

    while (pinList.children.length > 2) {
      pinList.removeChild(pinList.children[2]);
    }
  };

})();
