'use strict';

(function () {

  var templateCard = document.querySelector('#map-card-template').content.querySelector('.map__card');


  window.renderCard = function (ticketsArray, index) {
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

}());
