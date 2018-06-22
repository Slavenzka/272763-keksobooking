'use strict';

//  Деактивация элементов формы в изначальном состоянии

(function () {

  var formContent = document.querySelector('.ad-form');
  var formElementList = formContent.querySelectorAll('fieldset');

  var disableFormElements = function (targetCollection) {
    for (var i = 0; i < targetCollection.length; i++) {
      targetCollection[i].disabled = 'disabled';
    }
  };

  var enableFormElements = function (targetCollection) {
    for (var i = 0; i < targetCollection.length; i++) {
      targetCollection[i].disabled = '';
    }
  };

  window.formStatus = {

    enableFormElements: function (targetCollection) {
      for (var i = 0; i < targetCollection.length; i++) {
        targetCollection[i].disabled = '';
      }
    },

    disableFormElements: function (targetCollection) {
      for (var i = 0; i < targetCollection.length; i++) {
        targetCollection[i].disabled = 'disabled';
      }
    },

    formContent: document.querySelector('.ad-form'),

    addressInput:document.querySelector('.ad-form').querySelector('#address')
  };

  window.formStatus.disableFormElements(formElementList);

  //  Проверка равенства введенного количества комнат количеству гостей

  var roomsQtySelect = formContent.querySelector('#room_number');
  var capacitySelect = formContent.querySelector('#capacity');

  var roomsOptions = roomsQtySelect.querySelectorAll('option');
  var capacityOptions = capacitySelect.querySelectorAll('option');

  var checkSelectionEquality = function (selectRooms, optionsCollectionRooms, selectCapacity, optionsCollectionCapacity) {

    if (optionsCollectionRooms[selectRooms.options.selectedIndex].value !== optionsCollectionCapacity[selectCapacity.options.selectedIndex].value) {

      selectCapacity.setCustomValidity('Количество гостей не совпадает с количеством комнат!');
    } else {
      selectCapacity.setCustomValidity('');
    }

  };

  capacitySelect.addEventListener('change', function () {
    checkSelectionEquality(roomsQtySelect, roomsOptions, capacitySelect, capacityOptions);
  });

  // Зависимость минимально допустимой цены предложения от типа жилья

  var typeSelect = formContent.querySelector('#type');
  var typeOptions = typeSelect.querySelectorAll('option');
  var priceInput = formContent.querySelector('#price');

  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var modifyMinPrice = function (input, minPrice) {
    input.min = minPrice;
    input.placeholder = input.min;
  };

  var checkMinPrice = function (optionsCollection, typeSelection) {

    if (optionsCollection[typeSelection.options.selectedIndex].value === 'flat') {

      modifyMinPrice(priceInput, MIN_PRICE_FLAT);

    } else if (optionsCollection[typeSelection.options.selectedIndex].value === 'bungalo') {

      modifyMinPrice(priceInput, MIN_PRICE_BUNGALO);

    } else if (optionsCollection[typeSelection.options.selectedIndex].value === 'house') {

      modifyMinPrice(priceInput, MIN_PRICE_HOUSE);

    } else if (optionsCollection[typeSelection.options.selectedIndex].value === 'palace') {

      modifyMinPrice(priceInput, MIN_PRICE_PALACE);

    }
  };

  // Проверка цены для дефолтного значения типа жилья для единообразия сообщения об ошибке

  typeSelect.addEventListener('change', function () {
    checkMinPrice(typeOptions, typeSelect, priceInput);
  });

} ());
