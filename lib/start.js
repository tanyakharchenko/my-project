"use strict";

var itemsArray = function itemsArray(ids) {
  //creating array with best-offer items
  var itemsArray = window.catalog.filter(function (item) {
    return ids.some(function (id) {
      return id === item.id;
    });
  });
  return itemsArray;
};

var drawItem = function drawItem(_ref) {
  var id = _ref.id,
      title = _ref.title,
      price = _ref.price,
      discountedPrice = _ref.discountedPrice,
      thumbnail = _ref.thumbnail,
      hasNew = _ref.hasNew;

  if (discountedPrice) {
    price = discountedPrice;
  }

  return "\n    <a href=\"/html/item.html\" class=\"link link_item\">\n        <div class=\"item new-".concat(hasNew, "\" id=\"").concat(id, "\" data-item=\"true\">\n            <div class=\"item_hover\">\n                <p class=\"text_view-item\">View item</p>\n            </div>\n            <img src=\"").concat(thumbnail, "\" alt=\"best-offer-image\" class=\"img img_item\">\n            <h4 class=\"caption caption_4\">").concat(title, "</h4>\n            <h5 class=\"caption caption_5\">\xA3").concat(price, "</h5>\n        </div>\n    </a>\n    ");
};

var leftNum = 0;
var rightNum = 0;
var leftItems = itemsArray(window.bestOffer.left);
var rightItems = itemsArray(window.bestOffer.right);
var leftItem = document.getElementById('best-offer-left-item');
var leftUpButton = document.getElementById('button-up-left-item');
var leftDownButton = document.getElementById('button-down-left-item');
var rightItem = document.getElementById('best-offer-right-item');
var rightUpButton = document.getElementById('button-up-right-item');
var rightDownButton = document.getElementById('button-down-right-item');
var oldPrice = document.getElementById('old-price');
var newPrice = document.getElementById('new-price');
var leftPrice;
var rightPrice;
var leftItemId;
var rightItemId;
var addToBag = document.getElementById('add-to-bag');

var drawLeftItems = function drawLeftItems(num) {
  leftItem.innerHTML = drawItem(leftItems[num]);

  if (leftItems[num].discountedPrice) {
    leftItems[num].price = leftItems[num].discountedPrice;
  }

  leftPrice = leftItems[num].price;
};

var drawRightItems = function drawRightItems(num) {
  rightItem.innerHTML = drawItem(rightItems[num]);

  if (rightItems[num].discountedPrice) {
    rightItems[num].price = rightItems[num].discountedPrice;
  }

  rightPrice = rightItems[num].price;
};

var draw = function draw() {
  drawLeftItems(leftNum);
  drawRightItems(rightNum);
  oldPrice.innerHTML = '£' + (leftPrice + rightPrice);
  newPrice.innerHTML = '£' + (leftPrice + rightPrice - window.bestOffer.discount);
  leftItemId = leftItem.childNodes[1].children[0].id;
  rightItemId = rightItem.childNodes[1].children[0].id;
};

draw();
leftDownButton.addEventListener('click', function () {
  leftNum++;

  if (leftNum >= leftItems.length) {
    leftNum = 0;
  }

  draw();
});
rightDownButton.addEventListener('click', function () {
  rightNum++;

  if (rightNum >= rightItems.length) {
    rightNum = 0;
  }

  draw();
});
leftUpButton.addEventListener('click', function () {
  leftNum--;

  if (leftNum < 0) {
    leftNum = leftItems.length - 1;
  }

  draw();
});
rightUpButton.addEventListener('click', function () {
  rightNum--;

  if (rightNum < 0) {
    rightNum = rightItems.length - 1;
  }

  draw();
});

var addToBagBestOffer = function addToBagBestOffer() {
  var items = [];
  window.catalog.forEach(function (item) {
    if (item.id == leftItemId || item.id == rightItemId) {
      items.push(item);
    }
  });
  var firstItem = items[0];
  var secondItem = items[1];
  firstItem.size = items[0].sizes[0];
  secondItem.size = items[1].sizes[0];
  firstItem.color = items[0].colors[0];
  secondItem.color = items[1].colors[0];
  var firstItemStr = JSON.stringify(firstItem);
  var secondItemStr = JSON.stringify(secondItem);

  if (shoppingBag[firstItemStr]) {
    shoppingBag[firstItemStr]++;
  } else {
    shoppingBag[firstItemStr] = 1;
  }

  if (shoppingBag[secondItemStr]) {
    shoppingBag[secondItemStr]++;
  } else {
    shoppingBag[secondItemStr] = 1;
  }

  var shoppingBagStr = JSON.stringify(shoppingBag);
  localStorage.setItem('bag', shoppingBagStr);
  states.discount = true;
  checkShoppingBag();
};