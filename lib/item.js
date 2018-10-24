"use strict";

var itemId = localStorage.getItem('id');
var currentItem;
var itemBlock = document.getElementById('item-characters');
window.catalog.forEach(function (item) {
  if (item.id == itemId) {
    currentItem = item;
  }
});

var createItemCharacters = function createItemCharacters(_ref) {
  var title = _ref.title,
      price = _ref.price,
      discountedPrice = _ref.discountedPrice,
      description = _ref.description,
      preview = _ref.preview,
      sizes = _ref.sizes,
      colors = _ref.colors;

  if (discountedPrice) {
    price = discountedPrice;
  }

  return "\n    <div class=\"item-photo\" id=\"photo-block\">\n                        <div class=\"item-photo_main\">\n                            <img src=\"".concat(preview[0], "\" alt=\"item image\" class=\"img item-photo_full\" \n                            id=\"first-photo\">\n                            <img src=\"").concat(preview[1], "\" alt=\"item image\" class=\"img item-photo_full none\" id=\"second-photo\"\">\n                            <img src=\"").concat(preview[2], "\" alt=\"item image\" class=\"img item-photo_full none\" \n                            id=\"third-photo\">\n                        </div>\n                        <div class=\"item-photo_secondary\">\n                            <div class=\"img-wrapper\">\n                            <img src=\"").concat(preview[0], "\" alt=\"item image\" class=\"img item-photo_thumb\" data-first=\"true\">\n                            <div class=\"thumb-hover\" id=\"first-hover\"></div>\n                            </div>\n                            <div class=\"img-wrapper\">\n                            <img src=\"").concat(preview[1], "\" alt=\"item image\" class=\"img item-photo_thumb\" data-second=\"true\">\n                            <div class=\"thumb-hover none\" id=\"second-hover\"></div>\n                            </div>\n                            <div class=\"img-wrapper\">\n                            <img src=\"").concat(preview[2], "\" alt=\"item image\" class=\"img item-photo_thumb\" data-third=\"true\">\n                            <div class=\"thumb-hover none\" id=\"third-hover\"></div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"item-parameters\">\n                        <h2 class=\"caption caption_2\">").concat(title, "</h2>\n                        <div class=\"caption-order\">\n                            <h3 class=\"caption caption_3\">").concat(description, "</h3>\n                            <h5 class=\"caption caption_5\">\xA3").concat(price, "</h5>\n                        </div>\n                        <form class=\"parameters\" id=\"form\">\n                        <div class=\"parameter parameter_size\">\n                        <p class=\"parameter__text\">Size</p>\n                            ").concat(createItemSize(sizes), "\n                        </div>\n                        <div class=\"parameter parameter_color\">\n                        <p class=\"parameter__text\">Color</p>\n                            ").concat(createItemColor(colors), "\n                        </div>\n                        <input type=\"submit\" value=\"Add to bag\" class=\"common-button\" id=\"add-to-bag-button\">\n                        </form>\n                    </div>\n    ");
};

var createItemSize = function createItemSize(sizes) {
  var str = '';

  if (sizes.length == 0) {
    return "\n        <input type=\"radio\" id=\"size_No-size\" class=\"parameters__input\" name=\"size\" value=\"Universal\">\n        <label for=\"size_No-size\" class=\"parameters__label\">Universal</label>\n        ";
  } else {
    for (var i = 0; i < sizes.length; i++) {
      str += "\n            <input type=\"radio\" id=\"size_".concat(sizes[i], "\" class=\"parameters__input\" name=\"size\" value=\"").concat(sizes[i], "\">\n            <label for=\"size_").concat(sizes[i], "\" class=\"parameters__label\">").concat(sizes[i], "</label>\n            ");
    }

    return str;
  }
};

var createItemColor = function createItemColor(colors) {
  var str = '';

  if (colors.length == 0) {
    return "\n        <input type=\"radio\" id=\"color_No-color\" class=\"parameters__input\" name=\"color\" value=\"Universal\">\n        <label for=\"color_No-color\" class=\"parameters__label\">Universal</label>\n        ";
  } else {
    for (var i = 0; i < colors.length; i++) {
      str += "\n            <input type=\"radio\" id=\"color_".concat(colors[i], "\" class=\"parameters__input\" name=\"color\" value=\"").concat(colors[i], "\">\n            <label for=\"color_").concat(colors[i], "\" class=\"parameters__label\">").concat(colors[i], "</label>\n            ");
    }

    return str;
  }
};

itemBlock.innerHTML = createItemCharacters(currentItem);

var changeRadioState = function changeRadioState(input) {
  var name = input.name;
  states[name] = input.value;
};

var addToBag = function addToBag() {
  currentItem.size = states.size;
  currentItem.color = states.color;

  if (currentItem.size == '' || currentItem.color == '') {
    alert('Error! You should choose size and color!');
    return;
  }

  var currentItemStr = JSON.stringify(currentItem);

  if (shoppingBag[currentItemStr]) {
    shoppingBag[currentItemStr]++;
  } else {
    shoppingBag[currentItemStr] = 1;
  }

  var shoppingBagStr = JSON.stringify(shoppingBag);
  localStorage.setItem('bag', shoppingBagStr);
  checkShoppingBag();
};

var photoBlock = document.getElementById('photo-block');
var firstPhoto = document.getElementById('first-photo');
var secondPhoto = document.getElementById('second-photo');
var thirdPhoto = document.getElementById('third-photo');
var firstHover = document.getElementById('first-hover');
var secondHover = document.getElementById('second-hover');
var thirdHover = document.getElementById('third-hover');
photoBlock.addEventListener('click', function () {
  if (event.target.classList.contains('item-photo_full')) {
    return;
  }

  if (event.target.hasAttribute('data-first')) {
    firstPhoto.classList.remove('none');
    secondPhoto.classList.add('none');
    thirdPhoto.classList.add('none');
    firstHover.classList.remove('none');
    secondHover.classList.add('none');
    thirdHover.classList.add('none');
  }

  if (event.target.hasAttribute('data-second')) {
    firstPhoto.classList.add('none');
    secondPhoto.classList.remove('none');
    thirdPhoto.classList.add('none');
    firstHover.classList.add('none');
    secondHover.classList.remove('none');
    thirdHover.classList.add('none');
  }

  if (event.target.hasAttribute('data-third')) {
    firstPhoto.classList.add('none');
    secondPhoto.classList.add('none');
    thirdPhoto.classList.remove('none');
    firstHover.classList.add('none');
    secondHover.classList.add('none');
    thirdHover.classList.remove('none');
  }
});