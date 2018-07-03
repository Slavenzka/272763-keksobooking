'use strict';

//  Деактивация элементов формы в изначальном состоянии

(function () {

  var formContent = document.querySelector('.ad-form');
  var formElementList = formContent.querySelectorAll('fieldset');
  var checkinSelect = formContent.querySelector('#timein');
  var checkoutSelect = formContent.querySelector('#timeout');

  window.formStatus = {

    enableFormElements: function (targetCollection) {
      for (var i = 0; i < targetCollection.length; i++) {
        if (targetCollection[i].querySelector('#address') === null) {
          targetCollection[i].disabled = '';
        }
      }
    },

    disableFormElements: function (targetCollection) {
      for (var i = 0; i < targetCollection.length; i++) {
        targetCollection[i].disabled = 'disabled';
      }
    },

    formContent: document.querySelector('.ad-form'),

    addressInput: document.querySelector('.ad-form').querySelector('#address')
  };

  window.formStatus.disableFormElements(formElementList);

  //  Проверка равенства введенного количества комнат количеству гостей

  var roomsQtySelect = formContent.querySelector('#room_number');
  var capacitySelect = formContent.querySelector('#capacity');

  var roomsOptions = roomsQtySelect.querySelectorAll('option');
  var capacityOptions = capacitySelect.querySelectorAll('option');

  var checkSelectionEquality = function (selectRooms, optionsCollectionRooms, selectCapacity, optionsCollectionCapacity) {

    var selectedRoomsValue = optionsCollectionRooms[selectRooms.options.selectedIndex].value;

    for (var i = 0; i < optionsCollectionCapacity.length; i++) {
      if ((selectedRoomsValue === '100' && optionsCollectionCapacity[i].value !== '0') ||
          (selectedRoomsValue !== '100' && optionsCollectionCapacity[i].value === '0') ||
          (selectedRoomsValue < optionsCollectionCapacity[i].value)) {
        optionsCollectionCapacity[i].disabled = 'disabled';
      } else {
        optionsCollectionCapacity[i].disabled = '';
      }
    }

  };

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

  // Включение обработчика на форме с исполнением описанных выше проверок

  checkSelectionEquality(roomsQtySelect, roomsOptions, capacitySelect, capacityOptions);

  formContent.addEventListener('change', function (evt) {

    var timeSync = function () {
      if (checkinSelect.options.selectedIndex !== checkoutSelect.options.selectedIndex) {
        checkoutSelect.options.selectedIndex = evt.target.options.selectedIndex;
        checkinSelect.options.selectedIndex = evt.target.options.selectedIndex;
      }
    };

    checkSelectionEquality(roomsQtySelect, roomsOptions, capacitySelect, capacityOptions);
    checkMinPrice(typeOptions, typeSelect, priceInput);
    timeSync();
  });

  // Отправка формы на сервер с выводом сообщения об ошибке

  var restoreDefaultForm = function (form) {
    var roomNumberSelect = form.querySelector('#room_number');
    var guestNumberSelect = form.querySelector('#capacity');
    var optionsList = form.querySelectorAll('[id^="feature-"]');
    var textArea = form.querySelector('#description');

    var restoreSelectField = function (field) {
      for (var i = 0; i < field.options.length; i++) {
        if (field.options[i] === field.querySelector('[selected]')) {
          var indexDefault = i;
        }
      }
      field.selectedIndex = indexDefault;
    };

    form.querySelector('#title').value = '';

    form.querySelector('#address').value = Math.round(window.pin.DEFAULT_PIN_X + window.pin.DEFAULT_PIN_DIAMETER / 2).toString() + ', ' + Math.round(window.pin.DEFAULT_PIN_Y + window.pin.DEFAULT_PIN_DIAMETER / 2).toString();

    restoreSelectField(typeSelect);
    restoreSelectField(checkinSelect);
    restoreSelectField(checkoutSelect);
    restoreSelectField(roomNumberSelect);
    restoreSelectField(guestNumberSelect);

    priceInput.value = '';

    for (var i = 0; i < optionsList.length; i++) {
      optionsList[i].checked = false;
    }

    textArea.value = '';
  };

  formContent.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formContent), function () {
      restoreDefaultForm(formContent);
    }, function (errorText) {
      window.backend.errorMessage(errorText);
    });

    evt.preventDefault();
  });

}());
