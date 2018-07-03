'use strict';

(function () {

  var avatarChooser = document.querySelector('#avatar');
  var previewBox = document.querySelector('.ad-form-header__preview');
  var preview = previewBox.querySelector('img');

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  avatarChooser.addEventListener('change', function () {

    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var imageChooser = document.querySelector('#images');
  var imagePreviewBox = document.querySelector('.ad-form__photo');
  var imageContainer = document.querySelector('.ad-form__photo-container');
  var isUploaded = false;

  var setImageStyle = function (imageBox, image) {
    imageBox.style = 'display: flex; align-items: center;';
    image.style = 'width: 70px; padding: 0 15px;';
  };

  imageChooser.addEventListener('change', function () {

    var file = imageChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var newImage = document.createElement('IMG');

        if (isUploaded) {

          var newImagePreviewBox = imagePreviewBox.cloneNode(false);
          newImage.src = reader.result;
          setImageStyle(newImagePreviewBox, newImage);

          newImagePreviewBox.appendChild(newImage);
          imageContainer.appendChild(newImagePreviewBox);

        } else {
          newImage.src = reader.result;
          setImageStyle(imagePreviewBox, newImage);

          imagePreviewBox.appendChild(newImage);

          isUploaded = true;
        }
      });

      reader.readAsDataURL(file);
    }

  });

})();
