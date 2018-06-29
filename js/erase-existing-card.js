'use strict';

(function () {

   // Удаляем ранее созданную карточку, если таковая существует

  window.eraseExistingCard = function () {

    var map = document.querySelector('.map');
    var previousCard = map.querySelector('.map__card');

    if (!(previousCard === null)) {
      map.removeChild(previousCard);
    }
  };

})();
