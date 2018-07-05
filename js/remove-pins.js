'use strict';

(function () {

  window.removePins = function () {

    var pinList = window.globalElements.map.pinList;
    var targetPin = pinList.querySelector('.map__pin:not(.map__pin--main)');

    while (targetPin !== null) {
      pinList.removeChild(targetPin);
      targetPin = pinList.querySelector('.map__pin:not(.map__pin--main)');

    }
  };

})();
