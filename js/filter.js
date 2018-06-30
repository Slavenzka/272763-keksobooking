'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');

  var pinList = document.querySelector('.map__pins');

  // Общий фильтр

  var filterItems = filterForm.querySelectorAll('select');

  for (var i = 0; i < filterItems.length; i++) {

    filterItems[i].addEventListener('change', function () {

      var ticketsDownloaded = window.dataCollection.tickets;

      var pinType = ticketsDownloaded.filter(function (it) {
        if (filterType.options[filterType.options.selectedIndex].value === 'any') {
          return it;
        } else {
          return it.offer.type === filterType.options[filterType.options.selectedIndex].value;
        }
      });

      var pinPrice = ticketsDownloaded.filter(function (it) {
        switch (filterPrice.options[filterPrice.options.selectedIndex].value) {
          case 'middle':
            return (it.offer.price > 10000) && (it.offer.price < 50000);
          case 'low':
            return (it.offer.price >= 0) && (it.offer.price <= 10000);
          case 'high':
            return (it.offer.price >= 50000);
        }
        return it;
      });

      var pinRooms = ticketsDownloaded.filter(function (it) {
        switch (filterRooms.options[filterRooms.options.selectedIndex].value) {
          case '1':
            return (it.offer.rooms === 1);
          case '2':
            return (it.offer.rooms === 2);
          case '3':
            return (it.offer.rooms === 3);
        }
        return it;
      });

      var filteredPins = pinType.concat(pinPrice, pinRooms);

      var uniquePins = filteredPins.filter(function (it, n) {

       return (filteredPins.indexOf(it, n + 1) > 0) && (filteredPins.lastIndexOf(it) !== filteredPins.indexOf(it, n + 1));

      });

      console.log(uniquePins);

      while (pinList.children.length > 2) {
        pinList.removeChild(pinList.children[2]);
      }

      window.renderPin(uniquePins, uniquePins.length);
      window.eraseExistingCard();
      window.pinClickHandler(uniquePins);
    });
  }

})();
