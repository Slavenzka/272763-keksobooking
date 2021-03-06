'use strict';

//  Деактивация элементов формы в изначальном состоянии

(function () {

  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var formContent = window.globalElements.form.formContent;
  var formElementList = window.globalElements.form.formElementList;
  var checkinSelect = formContent.querySelector('#timein');
  var checkoutSelect = formContent.querySelector('#timeout');

  window.formStatus = {

    enableFormElements: function (targetCollection) {
      targetCollection.forEach(function (it) {
        if (it.querySelector('#address') === null) {
          it.disabled = '';
        } else {
          it.disabled = '';
          it.querySelector('input').readOnly = true;
        }
      });
    },

    disableFormElements: function (targetCollection) {
      targetCollection.forEach(function (it) {
        it.disabled = 'disabled';
      });
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

    optionsCollectionCapacity.forEach(function (it) {
      if ((selectedRoomsValue === '100' && it.value !== '0') ||
          (selectedRoomsValue !== '100' && it.value === '0') ||
          (selectedRoomsValue < it.value)) {
        it.disabled = 'disabled';
      } else {
        it.disabled = '';
      }
    });
  };

  var syncRoomsCapacity = function () {
    var selectedRoomsValue = roomsOptions[roomsQtySelect.options.selectedIndex].value;

    for (var j = 0; j < capacitySelect.options.length; j++) {
      if ((selectedRoomsValue === '100' && capacitySelect.options[j].value === '0') ||
            (selectedRoomsValue === capacitySelect.options[j].value)) {
        capacitySelect.options.selectedIndex = j;
        break;
      }
    }
  };

  // Зависимость минимально допустимой цены предложения от типа жилья

  var typeSelect = formContent.querySelector('#type');
  var typeOptions = typeSelect.querySelectorAll('option');
  var priceInput = formContent.querySelector('#price');

  var modifyMinPrice = function (input, minPrice) {
    input.min = minPrice;
    input.placeholder = input.min;
  };

  var checkMinPrice = function (optionsCollection, typeSelection) {

    var selectedType = optionsCollection[typeSelection.options.selectedIndex].value;

    if (selectedType === 'flat') {
      modifyMinPrice(priceInput, MIN_PRICE_FLAT);
    } else if (selectedType === 'bungalo') {
      modifyMinPrice(priceInput, MIN_PRICE_BUNGALO);
    } else if (selectedType === 'house') {
      modifyMinPrice(priceInput, MIN_PRICE_HOUSE);
    } else if (selectedType === 'palace') {
      modifyMinPrice(priceInput, MIN_PRICE_PALACE);
    }
  };

  // Включение обработчика на форме с исполнением описанных выше проверок

  checkSelectionEquality(roomsQtySelect, roomsOptions, capacitySelect, capacityOptions);

  formContent.addEventListener('change', function (evt) {

    if (evt.target.id === 'room_number') {
      syncRoomsCapacity();
    }

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
    var filterFormElem = document.querySelector('.map__filters');
    var filterFeaturesElem = filterFormElem.querySelector('#housing-features');
    var featureItems = filterFeaturesElem.querySelectorAll('input[type="checkbox"]');

    var resetFeatures = function (featuresList) {
      featuresList.forEach(function (it) {
        it.checked = false;
      });
    };

    window.globalElements.map.mapArea.classList.add('map--faded');
    window.globalElements.map.isActivated = false;
    window.removePins();
    window.globalElements.map.mainPin.style.left = window.pin.DEFAULT_PIN_X.toString() + 'px';
    window.globalElements.map.mainPin.style.top = window.pin.DEFAULT_PIN_Y.toString() + 'px';

    var restoreSelectField = function (field) {
      for (var i = 0; i < field.options.length; i++) {
        if (field.options[i] === field.querySelector('[selected]')) {
          var indexDefault = i;
          break;
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
    priceInput.placeholder = MIN_PRICE_BUNGALO;

    resetFeatures(optionsList);
    resetFeatures(featureItems);
    window.eraseExistingCard();

    textArea.value = '';

    window.eraseUploadedImages.avatar();
    window.eraseUploadedImages.images();
    window.formStatus.formContent.classList.add('ad-form--disabled');
    window.formStatus.disableFormElements(window.globalElements.form.formElementList);

    // Сброс фильтра при отправке или сбросе формы
    var filterForm = window.globalElements.filter.filterFormElem;
    var filterSelectFieldset = filterForm.querySelector('#select-options');

    for (var i = 0; i < filterSelectFieldset.children.length; i++) {
      var selectionField = filterSelectFieldset.children[i];

      selectionField.value = selectionField.querySelector('[selected]').value;
    }
  };

  // Сброс формы по нажатии .ad-form__reset

  var resetFormButton = formContent.querySelector('.ad-form__reset');

  resetFormButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    restoreDefaultForm(formContent);
  });

  // Обработка отправки формы

  formContent.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formContent), function () {
      restoreDefaultForm(formContent);
    }, function (errorText) {
      if (!window.globalElements.page.isError) {
        window.backend.errorMessage(errorText);
      }
      window.globalElements.page.isError = true;
    });

    evt.preventDefault();
  });

}());
