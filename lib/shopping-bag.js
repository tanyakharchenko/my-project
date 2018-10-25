"use strict";

var bagContains = [];

for (var item in shoppingBag) {
  var parseItem = JSON.parse(item);
  parseItem.num = shoppingBag[item];
  bagContains.push(parseItem);
}

var createItem = function createItem(_ref) {
  var id = _ref.id,
      title = _ref.title,
      price = _ref.price,
      discountedPrice = _ref.discountedPrice,
      thumbnail = _ref.thumbnail,
      hasNew = _ref.hasNew,
      color = _ref.color,
      size = _ref.size,
      num = _ref.num;

  if (discountedPrice) {
    price = discountedPrice;
  }

  return "\n    <div class=\"item new-".concat(hasNew, "\" id=\"").concat(id, "\" data-color=\"").concat(color, "\" data-size=\"").concat(size, "\">\n                        <a href=\"/html/item.html\" class=\"link link_item\">\n                            <div class=\"item__image\" data-item=\"true\" id=\"").concat(id, "\">\n                                <img src=\"").concat(thumbnail, "\" alt=\"catalog-image\" class=\"img img_item\">\n                                <div class=\"item_hover\">\n                                    <p class=\"text_view-item\">View item</p>\n                                </div>\n                            </div>\n                        </a>\n                        <div class=\"item__parameters\">\n                            <a href=\"/html/item.html\" class=\"link link_item\">\n                                <h4 class=\"caption caption_4\">").concat(title, "</h4>\n                            </a>\n                            <h5 class=\"caption caption_5\">\xA3").concat(price, "</h5>\n                            <div class=\"item-parameter item-parameter_color\">\n                                <p class=\"item-parameter__name\">Color: </p>\n                                <p class=\"item-parameter__value\">").concat(color, "</p>\n                            </div>\n                            <div class=\"item-parameter item-parameter_size\">\n                                <p class=\"item-parameter__name\">Size: </p>\n                                <p class=\"item-parameter__value\">").concat(size, "</p>\n                            </div>\n                            <div class=\"item-parameter item-parameter_quantity\">\n                                <p class=\"item-parameter__name\">Quantity: </p>\n                                <button class=\"item__button\" id=\"minus-button\">-</button>\n                                <p class=\"quantity-counter\">").concat(num, "</p>\n                                <button class=\"item__button\" id=\"plus-button\">+</button>\n                            </div>\n                            <button class=\"item__button item__button_remove\" id=\"remove-button\">Remove item</button>\n                        </div>\n                    </div>\n    ");
};

var bagFilling = document.getElementById('bag-filling');
var wrapper = document.getElementById('bag-wrapper');
var totalPriceNum = document.getElementById('total-price-num');
var itemCounterCollection = document.getElementsByClassName('quantity-counter');
var emptyText = document.getElementById('empty-text');
var checkoutText = document.getElementById('checkout-text');
var discountBlock = document.getElementById('discount-block');

var drawsItems = function drawsItems(arr) {
  bagFilling.innerHTML = '';
  arr.forEach(function (item) {
    bagFilling.innerHTML += createItem(item);
  });
  totalPriceNum.innerHTML = bagPrice.innerHTML;

  if (bagContains.length > 0) {
    emptyText.classList.add('none');
  }
};

drawsItems(bagContains);
wrapper.appendChild(bagFilling);

var catchCurrentItem = function catchCurrentItem(elem) {
  var current = [];
  bagContains.forEach(function (item, i) {
    if (item.id == elem.id && item.color == elem.getAttribute('data-color') && item.size == elem.getAttribute('data-size')) {
      current.push(item);
      current.push(i);
    }
  });
  return current; //return the array
};

var drawDiscount = function drawDiscount() {
  discountBlock.classList.remove('none');
};

var removeDiscount = function removeDiscount() {
  discountBlock.classList.add('none');
};

if (states.discount) {
  drawDiscount();
}

var changeItemNum = function changeItemNum(arr) {
  //array contains item (arr[0]) and it's position (arr[1])
  if (states.plus) {
    arr[0].num++;
  }

  if (states.minus) {
    arr[0].num--;

    if (arr[0].num < 1) {
      arr[0].num = 1;
    }
  }

  itemCounterCollection[arr[1]].innerHTML = arr[0].num;

  for (var _item in shoppingBag) {
    var _parseItem = JSON.parse(_item);

    if (_parseItem.id == arr[0].id && _parseItem.color == arr[0].color && _parseItem.size == arr[0].size) {
      if (states.plus) {
        shoppingBag[_item]++;
      }

      if (states.minus) {
        shoppingBag[_item]--;

        if (shoppingBag[_item] < 1) {
          shoppingBag[_item] = 1;
        }
      }
    }
  }

  var shoppingBagStr = JSON.stringify(shoppingBag);
  localStorage.setItem('bag', shoppingBagStr);
  checkShoppingBag();
  totalPriceNum.innerHTML = bagPrice.innerHTML;
};

var removeItem = function removeItem(arr) {
  bagContains.splice(arr[1], 1);

  for (var _item2 in shoppingBag) {
    //remove from shopping bag
    var _parseItem2 = JSON.parse(_item2);

    if (_parseItem2.id == arr[0].id && _parseItem2.color == arr[0].color && _parseItem2.size == arr[0].size) {
      delete shoppingBag[_item2];
    }
  }

  var shoppingBagStr = JSON.stringify(shoppingBag);
  localStorage.setItem('bag', shoppingBagStr);
  checkShoppingBag();

  if (states.discount) {
    drawDiscount();
  } else {
    removeDiscount();
  }

  if (bagContains.length == 0) {
    emptyText.classList.remove('none');
  }

  drawsItems(bagContains);
};

var cleenBag = function cleenBag(id) {
  bagContains = [];
  shoppingBag = {};
  var shoppingBagStr = JSON.stringify(shoppingBag);
  localStorage.setItem('bag', shoppingBagStr);
  checkShoppingBag();
  drawsItems(bagContains);

  if (id == 'empty-bag') {
    emptyText.classList.remove('none');
  }
};

var buyItems = function buyItems() {
  if (bagContains.length == 0) {
    alert('You should choose some items');
    return;
  }

  cleenBag();
  checkoutText.classList.remove('none');
};