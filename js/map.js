'use strict';

var OFFER_DESCRIPTION = [
  {
    'title': 'Большая уютная квартира',
    'type': 'flat',
    'checkin': '14:00',
    'checkout': '12:00'
  },
  {
    'title': 'Маленькая неуютная квартира',
    'type': 'flat',
    'checkin': '13:00',
    'checkout': '12:00'
  },
  {
    'title': 'Огромный прекрасный дворец',
    'type': 'palace',
    'checkin': '14:00',
    'checkout': '13:00'
  },
  {
    'title': 'Маленький ужасный дворец',
    'type': 'palace',
    'checkin': '14:00',
    'checkout': '12:00'
  },
  {
    'title': 'Красивый гостевой домик',
    'type': 'house',
    'checkin': '13:00',
    'checkout': '12:00'
  },
  {
    'title': 'Некрасивый негостеприимный домик',
    'type': 'house',
    'checkin': '14:00',
    'checkout': '13:00'
  },
  {
    'title': 'Уютное бунгало далеко от моря',
    'type': 'bungalo',
    'checkin': '13:00',
    'checkout': '12:00'
  },
  {
    'title': 'Неуютное бунгало по колено в воде',
    'type': 'bungalo',
    'checkin': '14:00',
    'checkout': '12:00'
  }
];

var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var FOTOS_LIST = ['1', '2', '3'];


var arrayTickets = [];
var indexArray = [];
var quantityTickets = 8;


var shuffleArray = function (targetArray, fillTarget, quantity) {

  if (fillTarget) {
    targetArray = [];

    for (var i = 1; i <= quantity; i++) {
      targetArray.push(i);
    }
  }

  for (i = targetArray.length - 1; i >= 0; i--) {

    var j = Math.floor(Math.random() * (i + 1));

    var temp = targetArray[i];
    targetArray[i] = targetArray[j];
    targetArray[j] = temp;
  }

  return targetArray;
};


var getRandomNumber = function (minNumber, maxNumber) {

  return Math.round(minNumber + Math.random() * (maxNumber - minNumber));
};


var fillTickets = function (quantity, ticketArray, textDesctiptionArray, features, photos) {
  var indexes = shuffleArray(indexArray, true, quantityTickets);

  for (var i = 0; i < quantity; i++) {
    var x = getRandomNumber(300, 900);
    var y = getRandomNumber(130, 630);

    ticketArray[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + indexes[i].toString() + '.png'
      },
      'offer': {
        'title': textDesctiptionArray[indexes[i] - 1]['title'],
        'address': x.toString() + ', ' + y.toString(),
        'price': getRandomNumber(1000, 1000000),
        'type': textDesctiptionArray[indexes[i] - 1]['type'],
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 10),
        'checkin': textDesctiptionArray[indexes[i] - 1]['checkin'],
        'checkout': textDesctiptionArray[indexes[i] - 1]['checkout'],
        'features': shuffleArray(features),
//        'features': shuffleArray(FEATURES_LIST).slice(0, Math.round(Math.random() * (FEATURES_LIST.length + 1))),
        'description': "",
        'photos': shuffleArray(photos)
      },
      'location': {
        'x': x,
        'y': y
      }
    };
//    console.log(ticketArray[i].author);
    console.log(ticketArray[i].offer.features);
  }

  return ticketArray;
};

var tickets = fillTickets(quantityTickets, arrayTickets, OFFER_DESCRIPTION, FEATURES_LIST, FOTOS_LIST);
var map = document.querySelector('.map');
var templatePin = document.querySelector('#map-card-template').content.querySelector('.map__pin');
var fragmentPin = document.createDocumentFragment();
var pinList = document.querySelector('.map__pins');
var templateCard = document.querySelector('#map-card-template').content.querySelector('.map__card');
var fragmentCard = document.createDocumentFragment();

console.log(tickets);

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

  return element;
};

for (var i = 0; i < quantityTickets; i++) {
  fragmentPin.appendChild(renderPin(tickets, i));
}

pinList.appendChild(fragmentPin);

fragmentCard.appendChild(renderCard(tickets, 0));
map.insertBefore(fragmentCard, map.querySelector('.map__filters-container'));

map.classList.remove('map--faded');


