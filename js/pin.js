'use strict';

(function () {

  //  Метод для отражения текущих координат метки на активной странице

  var MAIN_PIN_SIZE_WIDTH = 65;
  var MAIN_PIN_SIZE_HEIGHT = 65 + 22;

  window.pin = {

    updateMainPinCoordinates: function (coordinateXBefore, coordinateYBefore, targetInput) {
      var coordinateXAfter = Math.round(coordinateXBefore + MAIN_PIN_SIZE_WIDTH / 2);
      var coordinateYAfter = Math.round(coordinateYBefore + MAIN_PIN_SIZE_HEIGHT);

      targetInput.value = coordinateXAfter.toString() + ', ' + coordinateYAfter.toString();
    },

    DEFAULT_PIN_X: 570,
    DEFAULT_PIN_Y: 375,
    DEFAULT_PIN_DIAMETER: 65,

    renderPin: function (ticketsArray, index) {
      var templatePin = document.querySelector('#map-card-template').content.querySelector('.map__pin');
      var element = templatePin.cloneNode(true);
      var pinX = ticketsArray[index].location.x - 25;
      var pinY = ticketsArray[index].location.y - 70;

      element.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
      element.dataset.id = index.toString();
      element.querySelector('img').src = ticketsArray[index].author.avatar;
      element.querySelector('img').alt = ticketsArray[index].offer.title;

      return element;
    }
  };

  // Прописываю координаты метки на неактивной странице

  var defaultPinCenterX = Math.round(window.pin.DEFAULT_PIN_X + window.pin.DEFAULT_PIN_DIAMETER / 2);
  var defaultPinCenterY = Math.round(window.pin.DEFAULT_PIN_Y + window.pin.DEFAULT_PIN_DIAMETER / 2);

  window.formStatus.addressInput.value = defaultPinCenterX.toString() + ', ' + defaultPinCenterY.toString();

}());
