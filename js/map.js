'use strict';

var OFFER_DESCRIPTION = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var OFFER_TYPE = ['flat', 'palace', 'house', 'bungalo'];

var CHECKIN_LIST = ['12:00', '13:00', '14:00'];

var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];

var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var FOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var limitCoords = {
  Xmin: 300,
  Xmax: 900,
  Ymin: 130,
  Ymax: 630
};

var arrayTickets = [];
var indexArray = [];
var quantityTickets = 8;

var fillArray = function (targetArray, quantity) {
  for (var i = 1; i <= quantity; i++) {
    targetArray.push(i);
  }

  return targetArray;
};

var compareFunctionShuffle = function () {
  return Math.random() - 0.5;
};


var shuffleArray = function (targetArray) {
  var copiedArray = targetArray.slice();

  return copiedArray.sort(compareFunctionShuffle);
};

var getRandomNumber = function (minNumber, maxNumber) {

  return Math.round(minNumber + Math.random() * (maxNumber - minNumber));
};


var fillTickets = function (quantity, ticketArray, textDesctiptionArray, offerType, checkins, checkouts, features, photos) {
  var indexes = fillArray(indexArray, quantityTickets);
  indexes = shuffleArray(indexes);
  var titlesShuffled = shuffleArray(textDesctiptionArray);

  for (var i = 0; i < quantity; i++) {
    var x = getRandomNumber(limitCoords.Xmin, limitCoords.Xmax);
    var y = getRandomNumber(limitCoords.Ymin, limitCoords.Ymax);
    var featuresShuffled = shuffleArray(features);

    ticketArray[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + indexes[i].toString() + '.png'
      },
      'offer': {
        'title': titlesShuffled[i],
        'address': x.toString() + ', ' + y.toString(),
        'price': getRandomNumber(1000, 1000000),
        'type': offerType[getRandomNumber(0, offerType.length - 1)],
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 10),
        'checkin': checkins[getRandomNumber(0, checkins.length - 1)],
        'checkout': checkouts[getRandomNumber(0, checkouts.length - 1)],
        'features': featuresShuffled.slice(0, getRandomNumber(0, features.length - 1) + 1),
        'description': '',
        'photos': shuffleArray(photos)
      },
      'location': {
        'x': x,
        'y': y
      }
    };
  }

  return ticketArray;
};

var tickets = fillTickets(quantityTickets, arrayTickets, OFFER_DESCRIPTION, OFFER_TYPE, CHECKIN_LIST, CHECKOUT_LIST, FEATURES_LIST, FOTOS_LIST);
var map = document.querySelector('.map');
var templatePin = document.querySelector('#map-card-template').content.querySelector('.map__pin');
var fragmentPin = document.createDocumentFragment();
var pinList = document.querySelector('.map__pins');
var templateCard = document.querySelector('#map-card-template').content.querySelector('.map__card');


var renderPin = function (ticketsArray, index) {
  var element = templatePin.cloneNode(true);
  var pinX = ticketsArray[index].location.x - 25;
  var pinY = ticketsArray[index].location.y - 70;

  element.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  element.dataset.id = index.toString();
  element.querySelector('img').src = ticketsArray[index].author.avatar;
  element.querySelector('img').alt = ticketsArray[index].offer.title;

  return element;
};

var renderCard = function (ticketsArray, index) {
  var element = templateCard.cloneNode(true);

  element.querySelector('.popup__avatar').src = ticketsArray[index].author.avatar;

  element.querySelector('.popup__title').textContent = ticketsArray[index].offer.title;

  element.querySelector('.popup__text--address').textContent = ticketsArray[index].offer.address;

  element.querySelector('.popup__text--price').textContent = ticketsArray[index].offer.price + '₽/ночь';

  if (ticketsArray[index].offer.type === 'flat') {
    element.querySelector('.popup__type').textContent = 'Квартира';
  } else if (ticketsArray[index].offer.type === 'palace') {
    element.querySelector('.popup__type').textContent = 'Дворец';
  } else if (ticketsArray[index].offer.type === 'house') {
    element.querySelector('.popup__type').textContent = 'Дом';
  } else if (ticketsArray[index].offer.type === 'bungalo') {
    element.querySelector('.popup__type').textContent = 'Бунгало';
  }

  element.querySelector('.popup__text--capacity').textContent = ticketsArray[index].offer.rooms + ' комнаты для ' + ticketsArray[index].offer.guests + ' гостей';

  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + ticketsArray[index].offer.checkin + ', выезд до ' + ticketsArray[index].offer.checkout;

  var featuresList = element.querySelectorAll('.popup__feature');
  for (var j = 0; j < featuresList.length; j++) {
    var containsClass = false;
    for (var i = 0; i < ticketsArray[index].offer.features.length; i++) {
      if (featuresList[j].classList.contains('popup__feature--' + ticketsArray[index].offer.features[i])) {
        containsClass = true;
        break;
      }
    }
    if (containsClass === false) {
      featuresList[j].classList.add('visually-hidden');
    }
  }

  element.querySelector('.popup__description').textContent = ticketsArray[index].offer.description;

  for (i = 0; i < ticketsArray[index].offer.photos.length; i++) {
    var elementPhoto = element.querySelector('.popup__photo').cloneNode();

    elementPhoto.src = ticketsArray[index].offer.photos[i];

    element.querySelector('.popup__photos').appendChild(elementPhoto);
  }

  element.querySelector('.popup__photo').classList.add('visually-hidden');

  return element;
};


//  Деактивация элементов формы в изначальном состоянии

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

disableFormElements(formElementList);

// Прописываю координаты метки на неактивной странице

var DEFAULT_PIN_X = 570;
var DEFAULT_PIN_Y = 375;
var DEFAULT_PIN_DIAMETER = 65;

var defaultPinCenterX = Math.round(DEFAULT_PIN_X + DEFAULT_PIN_DIAMETER / 2);
var defaultPinCenterY = Math.round(DEFAULT_PIN_Y + DEFAULT_PIN_DIAMETER / 2);

var addressInput = formContent.querySelector('#address');

addressInput.value = defaultPinCenterX.toString() + ', ' + defaultPinCenterY.toString();

//  Метод для отражения текущих координат метки на активной странице

var MAIN_PIN_SIZE_WIDTH = 65;
var MAIN_PIN_SIZE_HEIGHT = 65 + 22;

var updateMainPinCoordinates = function (coordinateXBefore, coordinateYBefore, targetInput) {
  var coordinateXAfter = Math.round(coordinateXBefore + MAIN_PIN_SIZE_WIDTH / 2);
  var coordinateYAfter = Math.round(coordinateYBefore + MAIN_PIN_SIZE_HEIGHT);

  targetInput.value = coordinateXAfter.toString() + ', ' + coordinateYAfter.toString();

};

// Метод для отрисовки карточки предложения по клику на соответствующий пин

var pinClickCardRenderer = function (ticketArray, index) {
  var fragmentCard = document.createDocumentFragment();

  fragmentCard.appendChild(renderCard(ticketArray, index));
  map.insertBefore(fragmentCard, map.querySelector('.map__filters-container'));
};

// Удаляем ранее созданную карточку, если таковая существует

var eraseExistingCard = function () {

  var previousCard = map.querySelector('.map__card');

  if (!(previousCard === null)) {
    map.removeChild(previousCard);
  }
};

//  Активация страницы

var mainPin = document.querySelector('.map__pin--main');

var enablePage = function () {
  map.classList.remove('map--faded');

  enableFormElements(formElementList);

  formContent.classList.remove('ad-form--disabled');

  updateMainPinCoordinates(DEFAULT_PIN_X, DEFAULT_PIN_Y, addressInput);

  for (var i = 0; i < quantityTickets; i++) {
    fragmentPin.appendChild(renderPin(tickets, i));
  }

  pinList.appendChild(fragmentPin);
};

//  Закрытие карточки с описанием

var closeCardPopup = function () {
  var cardCloseButton = map.querySelector('.popup__close');

  cardCloseButton.addEventListener('click', function () {
    eraseExistingCard();
  });
};

// Обработка клика на пин

var pinClickHandler = function () {
  var renderedPinList = pinList.querySelectorAll('.map__pin:not(.map__pin--main)');

  for (var i = 0; i < renderedPinList.length; i++) {
    renderedPinList[i].addEventListener('click', function (evt) {

      eraseExistingCard();

      pinClickCardRenderer(tickets, evt.currentTarget.dataset.id);

      closeCardPopup();
    });
  }
};

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

// Реализация drag & drop для элемента .map__pin--main
var mainPin = document.querySelector('.map__pin--main');

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var calculatePinCoords = function (evtType) {

    var shift = {
      x: startCoords.x - evtType.clientX,
      y: startCoords.y - evtType.clientY
    };

    startCoords = {
      x: evtType.clientX,
      y: evtType.clientY
    };

    var actualPositionY = mainPin.offsetTop - shift.y;
    var actualPositionX = mainPin.offsetLeft - shift.x;

    if (actualPositionX < 0) {
      actualPositionX = 0;
    }

    if (actualPositionX > 1135) {
      actualPositionX = 1135;
    }

    if (actualPositionY < limitCoords.Ymin) {
      actualPositionY = limitCoords.Ymin;
    }

     if (actualPositionY > limitCoords.Ymax) {
      actualPositionY = limitCoords.Ymax;
    }

    updateMainPinCoordinates(actualPositionX, actualPositionY, addressInput);

    window.actualPosition = {
      x: actualPositionX,
      y: actualPositionY
    };

  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    calculatePinCoords(moveEvt);

    mainPin.style.top = window.actualPosition.y + 'px';
    mainPin.style.left = window.actualPosition.x + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    enablePage();
    pinClickHandler();
    calculatePinCoords(upEvt);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

});
