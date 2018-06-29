'use strict';

(function () {

  // Метод для отрисовки карточки предложения по клику на соответствующий пин

  var pinClickCardRenderer = function (ticketArray, index) {
    var fragmentCard = document.createDocumentFragment();

    fragmentCard.appendChild(window.renderCard(ticketArray, index));
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

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var pinList = document.querySelector('.map__pins');
  var formContent = document.querySelector('.ad-form');
  var formElementList = formContent.querySelectorAll('fieldset');

  var enablePage = function () {

    map.classList.remove('map--faded');

    window.formStatus.enableFormElements(formElementList);

    window.formStatus.formContent.classList.remove('ad-form--disabled');

    window.pin.updateMainPinCoordinates(window.pin.DEFAULT_PIN_X, window.pin.DEFAULT_PIN_Y, window.formStatus.addressInput);

    window.renderPin(window.dataCollection.tickets, window.dataCollection.quantityTickets, pinList);
  };

  //  Закрытие карточки с описанием

  var closeCardPopup = function () {
    var cardCloseButton = map.querySelector('.popup__close');

    cardCloseButton.addEventListener('click', function () {
      eraseExistingCard();
    });
  };

  // Обработка клика на пин

  window.pinClickHandler = function (targetArray) {
    var renderedPinList = pinList.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < renderedPinList.length; i++) {
      renderedPinList[i].addEventListener('click', function (evt) {

        eraseExistingCard();

        pinClickCardRenderer(targetArray, evt.currentTarget.dataset.id);

        closeCardPopup();
      });
    }
  };

  // Реализация drag & drop для элемента .map__pin--main

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var calculatePinCoords = function (evtType) {

      var limitCoords = {
        Xmin: 300,
        Xmax: 900,
        Ymin: 130,
        Ymax: 630
      };

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

      window.pin.updateMainPinCoordinates(actualPositionX, actualPositionY, window.formStatus.addressInput);

      window.actualPosition = {
        x: actualPositionX,
        y: actualPositionY
      };

    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      calculatePinCoords(moveEvt);

      mainPin.style.top = window.actualPosition.y + 'px';
      mainPin.style.left = window.actualPosition.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      enablePage();
      window.pinClickHandler(window.dataCollection.tickets);
      calculatePinCoords(upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

}());
