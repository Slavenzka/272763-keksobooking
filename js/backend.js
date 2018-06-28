'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';

  window.backend = {
    errorMessage: function (errorText) {
      var errorMsg = document.createElement('P');
      var errorClose = document.createElement('BUTTON');
      errorMsg.textContent = errorText;
      document.body.appendChild(errorMsg);
      errorMsg.appendChild(errorClose);
      errorMsg.style = 'position: absolute; left: 50%; top: 200px; padding: 20px; color: black; z-index: 3; background-color: red;';
      errorClose.style = 'position: absolute; display: inline; right: 0; top: 0; padding: 0; margin: 0; line-height: 25px; color: black; z-index: 3; background-color: red; cursor: pointer;';
      errorClose.textContent = 'Х';

      errorClose.addEventListener('click', function (evt) {
        evt.preventDefault();
        document.body.removeChild(errorMsg);
      });
    },

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    }
  };

}());
