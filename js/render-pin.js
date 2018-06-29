'use strict';

(function () {

  window.renderPin = function (dataArray, dataArrayLength) {

    var pinList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < dataArrayLength; i++) {

      fragment.appendChild(window.pin.renderPin(dataArray, i));
    }

    pinList.appendChild(fragment);

  };

})();
