'use strict';

(function () {
  var TIMEOUT_DURATION = 500;

  var filterFormElem = window.globalElements.filter.filterFormElem;
  var filterTypeElem = window.globalElements.filter.filterTypeElem;
  var filterPriceElem = window.globalElements.filter.filterPriceElem;
  var filterRoomsElem = window.globalElements.filter.filterRoomsElem;
  var filterGuestsElem = window.globalElements.filter.filterGuestsElem;
  var filterFeaturesElem = filterFormElem.querySelector('#housing-features');
  var featureItems = filterFeaturesElem.querySelectorAll('input[type="checkbox"]');
  var lastTimeout;

  var filterType = function (element) {

    var selectedType = filterTypeElem.options[filterTypeElem.options.selectedIndex].value;

    return ((element.offer.type === selectedType) || selectedType === 'any');
  };

  var filterFeatures = function (element) {
    var selectedFeatures = [];

    for (var i = 0; i < featureItems.length; i++) {
      if (featureItems[i].checked) {
        selectedFeatures.push(featureItems[i].value);
      }
    }

    for (var j = 0; j < selectedFeatures.length; j++) {
      if (!element.offer.features.includes(selectedFeatures[j])) {
        return false;
      }
    }
    return true;
  };

  var filterPrice = function (element) {
    switch (filterPriceElem.options[filterPriceElem.options.selectedIndex].value) {
      case 'middle':
        return (element.offer.price >= 10000) && (element.offer.price < 50000);
      case 'low':
        return (element.offer.price >= 0) && (element.offer.price < 10000);
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

    return ((parseInt(selectedRooms, 10) === element.offer.rooms) || selectedRooms === 'any');
  };

  var filterGuests = function (element) {

    var selectedGuests = filterGuestsElem.options[filterGuestsElem.options.selectedIndex].value;

    return ((parseInt(selectedGuests, 10) === element.offer.guests) || selectedGuests === 'any');
  };

  var renderSelectedPins = function (sortedPinsArray) {
    window.removePins();

    window.renderPin(sortedPinsArray);
    window.eraseExistingCard();
    window.pinClickHandler(sortedPinsArray);
  };

  filterFormElem.addEventListener('change', function () {

    var ticketsDownloaded = window.dataCollection.tickets;


    var selectedPins = ticketsDownloaded.filter(function (it) {
      return (
        filterType(it) &&
        filterPrice(it) &&
        filterRooms(it) &&
        filterGuests(it) &&
        filterFeatures(it)
      );
    });

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      renderSelectedPins(selectedPins);
    }, TIMEOUT_DURATION);

  });

})();
