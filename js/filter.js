'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');

  var pinList = document.querySelector('.map__pins');

  //  Фильтр по типу жилья

  filterType.addEventListener('change', function () {

    var ticketsDownloaded = window.dataCollection.tickets;

    var pinType = ticketsDownloaded.filter(function (it) {
      if (filterType.options[filterType.options.selectedIndex].value === 'any') {
        return it;
      } else {
        return it.offer.type === filterType.options[filterType.options.selectedIndex].value;
      }
    });

    while (pinList.children.length > 2) {
      pinList.removeChild(pinList.children[2]);
    }

    window.renderPin(pinType, pinType.length);
    window.eraseExistingCard();
    window.pinClickHandler(pinType);
  });

  //  Фильтр по цене

})();
