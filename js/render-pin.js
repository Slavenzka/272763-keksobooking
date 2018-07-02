'use strict';

(function () {

  window.renderPin = function (dataArray) {

    var MAX_PIN_QTY = 5;

    var pinList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    var dataArrayProcessed = dataArray.slice(0, MAX_PIN_QTY);

    for (var i = 0; i < dataArrayProcessed.length; i++) {

      fragment.appendChild(window.pin.renderPin(dataArrayProcessed, i));
    }

    pinList.appendChild(fragment);

  };

})();
