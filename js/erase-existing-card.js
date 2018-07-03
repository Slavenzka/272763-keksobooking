'use strict';

(function () {

  // Удаляем ранее созданную карточку, если таковая существует

  window.eraseExistingCard = function () {

    var map = window.globalElements.map.mapArea;
    var previousCard = map.querySelector('.map__card');

    if (!(previousCard === null)) {
      map.removeChild(previousCard);
    }
  };

})();
