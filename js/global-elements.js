'use strict';

(function () {

  window.globalElements = {

    map: {
      mapArea: document.querySelector('.map'),
      mainPin: document.querySelector('.map__pin--main'),
      pinList: document.querySelector('.map__pins'),
      isActivated: false
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
