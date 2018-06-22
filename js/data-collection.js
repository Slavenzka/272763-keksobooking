'use strict';

(function () {

  var OFFER_DESCRIPTION = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  var OFFER_TYPE = ['flat', 'palace', 'house', 'bungalo'];

  var CHECKIN_LIST = ['12:00', '13:00', '14:00'];

  var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];

  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var FOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  window.limitCoords = {
    Xmin: 300,
    Xmax: 900,
    Ymin: 130,
    Ymax: 630
  };

  var arrayTickets = [];
  var indexArray = [];
  window.quantityTickets = 8;

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
      var x = getRandomNumber(window.limitCoords.Xmin, window.limitCoords.Xmax);
      var y = getRandomNumber(window.limitCoords.Ymin, window.limitCoords.Ymax);
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

  window.tickets = fillTickets(quantityTickets, arrayTickets, OFFER_DESCRIPTION, OFFER_TYPE, CHECKIN_LIST, CHECKOUT_LIST, FEATURES_LIST, FOTOS_LIST);

} ());
