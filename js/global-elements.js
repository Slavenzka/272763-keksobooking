'use strict';

(function () {

  window.globalElements = {

    map: {
      mapArea: document.querySelector('.map'),
      mainPin: document.querySelector('.map__pin--main'),
      pinList: document.querySelector('.map__pins'),
      isActivated: false
    },

    filter: {
      filterFormElem: document.querySelector('.map__filters'),
      filterTypeElem: document.querySelector('#housing-type'),
      filterPriceElem: document.querySelector('#housing-price'),
      filterRoomsElem: document.querySelector('#housing-rooms'),
      filterGuestsElem: document.querySelector('#housing-guests'),
    },

    form: {
      formContent: document.querySelector('.ad-form'),
      formElementList: document.querySelector('.ad-form').querySelectorAll('fieldset')
    },

    page: {
      isError: false
    }

  };

})();
