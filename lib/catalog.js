"use strict";

var createItem = function createItem(_ref) {
  var title = _ref.title,
      price = _ref.price,
      thumbnail = _ref.thumbnail;
  return "\n    <div class=\"items-catalog__item\">\n    <a href=\"/html/item.html\" class=\"link link_item\">\n        <div class=\"item\">\n            <img src=\"".concat(thumbnail, "\" alt=\"catalog-image\" class=\"img img_item\">\n            <div class=\"item_hover\">\n                <p class=\"text_view-item\">View item</p>\n            </div>\n            <h4 class=\"caption caption_4\">").concat(title, "</h4>\n            <h5 class=\"caption caption_5\">\xA3").concat(price, "</h5>\n        </div>\n    </a>\n    </div>\n    ");
};

var createExtras = function createExtras() {
  return "\n    <div class=\"extra-off\">\n    <h2 class=\"caption caption_2\">Last weekend <span class=\"text_red\">extra 50%</span> off on\n        all\n        reduced boots and shoulder bags</h2>\n    <h3 class=\"caption caption_3\">This offer is valid in-store and online. Prices displayed\n        reflect\n        this additional discount. This offer ends at 11:59 GMT on March 1st 2019</h3>\n    </div>\n    ";
};

var itemsCatalog = document.getElementById('items-catalog');
var catalogWrapper = document.getElementById('catalog');
window.catalog.forEach(function (item, i) {
  itemsCatalog.innerHTML += createItem(item);

  if (i == 1 || i == 2 || i == 3) {
    itemsCatalog.innerHTML += createExtras();
  }
});
var itemsCollection = document.getElementsByClassName('items-catalog__item');
var extrasCollection = document.getElementsByClassName('extra-off');
itemsCollection.forEach = Array.prototype.forEach;
extrasCollection.forEach = Array.prototype.forEach;
itemsCollection.forEach(function (item, i) {
  if (i > 11) {
    item.classList.add('none');
  }
});
extrasCollection.forEach(function (item, i) {
  if (i == 0) {
    item.classList.add('extra-off_mobile');
  }

  if (i == 1) {
    item.classList.add('extra-off_tablet');
  }
});

var showMore = function showMore(button) {
  for (var i = 12; i < itemsCollection.length; i++) {
    itemsCollection[i].classList.remove('none');
    itemsCollection[i].classList.add('show-more-item');
  }

  button.classList.add('none');
};

catalogWrapper.appendChild(itemsCatalog);