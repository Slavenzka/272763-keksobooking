'use strict';

(function () {

  window.renderPin = function (dataArray) {

    var pinList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < dataArray.length; i++) {

      fragment.appendChild(window.pin.renderPin(dataArray, i));
    }

    pinList.appendChild(fragment);

  };

})();
