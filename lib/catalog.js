"use strict";

var createItem = function createItem(_ref) {
  var id = _ref.id,
      title = _ref.title,
      price = _ref.price,
      discountedPrice = _ref.discountedPrice,
      thumbnail = _ref.thumbnail,
      hasNew = _ref.hasNew;

  if (discountedPrice) {
    price = discountedPrice;
  }

  return "\n    <div class=\"items-catalog__item\">\n    <a href=\"/html/item.html\" class=\"link link_item\">\n        <div class=\"item new-".concat(hasNew, "\" id=\"").concat(id, "\" data-item=\"true\">\n            <div class=\"item__image\" data-item=\"true\" id=\"").concat(id, "\">\n            <img src=\"").concat(thumbnail, "\" alt=\"catalog-image\" class=\"img img_item\">\n            <div class=\"item_hover\">\n                <p class=\"text_view-item\">View item</p>\n            </div>\n            </div>\n            <h4 class=\"caption caption_4\">").concat(title, "</h4>\n            <h5 class=\"caption caption_5\">\xA3").concat(price, "</h5>\n        </div>\n    </a>\n    </div>\n    ");
};

var createExtras = function createExtras() {
  return "\n    <div class=\"extra-off\">\n    <h2 class=\"caption caption_2\">Last weekend <span class=\"text_red\">extra 50%</span> off on\n        all\n        reduced boots and shoulder bags</h2>\n    <h3 class=\"caption caption_3\">This offer is valid in-store and online. Prices displayed\n        reflect\n        this additional discount. This offer ends at 11:59 GMT on March 1st 2019</h3>\n    </div>\n    ";
};

var itemsCatalog = document.getElementById('items-catalog');
var catalogWrapper = document.getElementById('catalog');
window.catalog.forEach(function (item, i) {
  //add extras to mark-up after first two, three and four elements 
  itemsCatalog.innerHTML += createItem(item);

  if (i == 1 || i == 2 || i == 3) {
    itemsCatalog.innerHTML += createExtras();
  }
});
var itemsCatalogCollection = document.getElementsByClassName('items-catalog__item');
var extrasCollection = document.getElementsByClassName('extra-off');
itemsCatalogCollection.forEach = Array.prototype.forEach;
extrasCollection.forEach = Array.prototype.forEach;
itemsCatalogCollection.forEach(function (item, i) {
  //hide "unwanted" items
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
  for (var i = 12; i < itemsCatalogCollection.length; i++) {
    //12 is number of items need to show
    itemsCatalogCollection[i].classList.remove('none');
    itemsCatalogCollection[i].classList.add('show-more-item');
  }

  button.classList.add('none');
};

catalogWrapper.appendChild(itemsCatalog);