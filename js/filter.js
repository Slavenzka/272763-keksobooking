'use strict';

(function () {
  var filterFormElem = document.querySelector('.map__filters');
  var filterTypeElem = filterFormElem.querySelector('#housing-type');
  var filterPriceElem = filterFormElem.querySelector('#housing-price');
  var filterRoomsElem = filterFormElem.querySelector('#housing-rooms');
  var filterGuestsElem = filterFormElem.querySelector('#housing-guests');
  var pinList = document.querySelector('.map__pins');
  var filterFeaturesElem = filterFormElem.querySelector('#housing-features');
  var featureItems = filterFeaturesElem.querySelectorAll('input[type="checkbox"]');
  var lastTimeout;

  var filterType = function (element) {
    if (filterTypeElem.options[filterTypeElem.options.selectedIndex].value === 'any') {
      return true;
    }
    if (element.offer.type === filterTypeElem.options[filterTypeElem.options.selectedIndex].value) {
      return true;
    }
    return false;
  };

  var filterFeatures = function (element) {
    var selectedFeatures = [];

    for (var i = 0; i < featureItems.length; i++) {
      if (featureItems[i].checked) {
        selectedFeatures.push(featureItems[i].value);
      }
    }

    for (var j = 0; j < selectedFeatures.length; j++) {
      if (element.offer.features.includes(selectedFeatures[j]) === false) {
        return false;
      }
    }
    return true;
  };

  var filterPrice = function (element) {
    switch (filterPriceElem.options[filterPriceElem.options.selectedIndex].value) {
      case 'middle':
        return (element.offer.price > 10000) && (element.offer.price < 50000);
      case 'low':
        return (element.offer.price >= 0) && (element.offer.price <= 10000);
      case 'high':
        return element.offer.price >= 50000;
      case 'any':
        return true;
      default:
        return false;
    }
  };

  var filterRooms = function (element) {
    switch (filterRoomsElem.options[filterRoomsElem.options.selectedIndex].value) {
      case '1':
        return element.offer.rooms === 1;
      case '2':
        return element.offer.rooms === 2;
      case '3':
        return element.offer.rooms === 3;
      case 'any':
        return true;
      default:
        return false;
    }
  };

  var filterGuests = function (element) {
    switch (filterGuestsElem.options[filterGuestsElem.options.selectedIndex].value) {
      case '0':
        return element.offer.guests === 0;
      case '1':
        return element.offer.guests === 1;
      case '2':
        return element.offer.guests === 2;
      case 'any':
        return true;
      default:
        return false;
    }
  };

  var renderSelectedPins = function (sortedPinsArray) {
    while (pinList.children.length > 2) {
      pinList.removeChild(pinList.children[2]);
    }

    window.renderPin(sortedPinsArray);
    window.eraseExistingCard();
    window.pinClickHandler(sortedPinsArray);
  };

  filterFormElem.addEventListener('change', function () {

    var ticketsDownloaded = window.dataCollection.tickets;


    var selectedPins = ticketsDownloaded.filter(function (it) {
      return ((filterType(it) === true) && (filterPrice(it) === true) && (filterRooms(it) === true) && (filterGuests(it) === true) && (filterFeatures(it) === true));
    });

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      renderSelectedPins(selectedPins);
    }, 500);

  });

})();
