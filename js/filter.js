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

    var selectedRooms = filterRoomsElem.options[filterRoomsElem.options.selectedIndex].value;

    if (parseInt(selectedRooms, 10) === element.offer.rooms) {
      return true;
    } else if (selectedRooms === 'any') {
      return true;
    }
    return false;
  };

  var filterGuests = function (element) {

    var selectedGuests = filterGuestsElem.options[filterGuestsElem.options.selectedIndex].value;

    if (parseInt(selectedGuests, 10) === element.offer.guests) {
      return true;
    } else if (selectedGuests === 'any') {
      return true;
    }

    return false;
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
      return (
        (filterType(it) === true) &&
        (filterPrice(it) === true) &&
        (filterRooms(it) === true) &&
        (filterGuests(it) === true) &&
        (filterFeatures(it) === true)
      );
    });

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      renderSelectedPins(selectedPins);
    }, 500);

  });

})();
