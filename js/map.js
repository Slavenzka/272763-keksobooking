'use strict';

var OFFER_DESCRIPTION = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var OFFER_TYPE = ['flat', 'palace', 'house', 'bungalo'];

var CHECKIN_LIST = ['12:00', '13:00', '14:00'];

var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];

var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var FOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var arrayTickets = [];
var indexArray = [];
var quantityTickets = 8;

var fillArray = function (targetArray, quantity) {
  for (var i = 1; i <= quantity; i++) {
    targetArray.push(i);
  }

  return targetArray;
};


var shuffleArray = function (targetArray) {
  var copyArray = targetArray.slice();

  for (var i = copyArray.length - 1; i >= 0; i--) {

    var j = Math.floor(Math.random() * (i + 1));

    var temp = copyArray[i];
    copyArray[i] = copyArray[j];
    copyArray[j] = temp;
  }

  return copyArray;
};


var getRandomNumber = function (minNumber, maxNumber) {

  return Math.round(minNumber + Math.random() * (maxNumber - minNumber));
};


var fillTickets = function (quantity, ticketArray, textDesctiptionArray, offerType, checkins, checkouts, features, photos) {
  var indexes = fillArray(indexArray, quantityTickets);
  var indexes = shuffleArray(indexes);

  for (var i = 0; i < quantity; i++) {
    var x = getRandomNumber(300, 900);
    var y = getRandomNumber(130, 630);
    var featuresShuffled = shuffleArray(features);

    ticketArray[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + indexes[i].toString() + '.png'
      },
      'offer': {
        'title': shuffleArray(textDesctiptionArray)[i],
        'address': x.toString() + ', ' + y.toString(),
        'price': getRandomNumber(1000, 1000000),
        'type': shuffleArray(offerType)[i],
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 10),
        'checkin': shuffleArray(checkins)[i],
        'checkout': shuffleArray(checkouts)[i],
        'features': featuresShuffled.slice(0, Math.floor(1 + Math.random() * (features.length))),
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
var fragmentCard = document.createDocumentFragment();


var renderPin = function (ticketsArray, index) {
  var element = templatePin.cloneNode(true);
  var pinX = ticketsArray[index].location.x + 25;
  var pinY = ticketsArray[index].location.y + 70;

  element.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
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

  for (var i = 0; i < ticketsArray[index].offer.photos.length; i++) {
    var elementPhoto = element.querySelector('.popup__photo').cloneNode();

    elementPhoto.src = ticketsArray[index].offer.photos[i];

    element.querySelector('.popup__photos').appendChild(elementPhoto);
  }

  element.querySelector('.popup__photo').classList.add('visually-hidden');

  return element;
};

for (var i = 0; i < quantityTickets; i++) {
  fragmentPin.appendChild(renderPin(tickets, i));
}

pinList.appendChild(fragmentPin);

fragmentCard.appendChild(renderCard(tickets, 0));
map.insertBefore(fragmentCard, map.querySelector('.map__filters-container'));

map.classList.remove('map--faded');


