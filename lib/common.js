"use strict";

var menuMobileButton = document.getElementById('menu-icon');
var mobileMenu = document.getElementById('mobile-menu');
var bagPrice = document.getElementById('bag-price');
var bagNum = document.getElementById('bag-num');
var shoppingBag = {};
var states = {
  color: '',
  size: '',
  left: false,
  right: false,
  discount: false
};

var showMobileMenu = function showMobileMenu() {
  mobileMenu.classList.toggle('none');

  if (menuMobileButton.innerHTML == '☰') {
    menuMobileButton.innerHTML = '×';
    menuMobileButton.classList.add('text_red');
  } else {
    menuMobileButton.innerHTML = '☰';
    menuMobileButton.classList.remove('text_red');
  }
};

var checkShoppingBag = function checkShoppingBag() {
  states.left = false;
  states.right = false;
  states.discount = false;

  if (localStorage.getItem('bag')) {
    shoppingBag = JSON.parse(localStorage.getItem('bag'));
  }

  var itemsPrice = 0;
  var itemsCnt = 0;

  var _loop = function _loop(key) {
    itemsCnt += shoppingBag[key];
    var currentItem = JSON.parse(key);

    if (window.bestOffer.left.some(function (id) {
      return id === currentItem.id;
    })) {
      //checked current item in best offer left block
      states.left = true;
    }

    if (window.bestOffer.right.some(function (id) {
      return id === currentItem.id;
    })) {
      //checked current item in best offer right block
      states.right = true;
    }

    if (states.left && states.right) {
      //if both of them present in the bag applied discount
      states.discount = true;
    }

    if (currentItem.discountedPrice) {
      currentItem.price = currentItem.discountedPrice;
    }

    itemsPrice += currentItem.price * shoppingBag[key];
  };

  for (var key in shoppingBag) {
    _loop(key);
  }

  bagNum.innerHTML = '(' + itemsCnt + ')';

  if (states.discount) {
    itemsPrice -= window.bestOffer.discount;
  }

  bagPrice.innerHTML = '£' + itemsPrice.toFixed(2);
};

var searchBlock = document.getElementById('search-tablet');
var inputSearch = document.getElementById('search-input-tablet');

var showSearchInput = function showSearchInput() {
  inputSearch.classList.toggle('none');
  searchBlock.classList.toggle('search-width');
};

var chooseFunction = function chooseFunction() {
  if (event.target.id == 'menu-icon') {
    showMobileMenu();
  }

  if (event.target.id == 'form') {
    event.preventDefault();
    addToBag();
  }

  if (event.target.id == 'show-more-button') {
    showMore(event.target);
  }

  if (event.target.parentNode.hasAttribute('data-item')) {
    localStorage.setItem('id', event.target.parentNode.id);
  }

  if (event.target.classList.contains('parameters__input')) {
    changeRadioState(event.target);
  }

  if (event.target.id == 'plus-button') {
    states.plus = true;
    states.minus = false;
    changeItemNum(catchCurrentItem(event.target.parentNode.parentNode.parentNode));
  }

  if (event.target.id == 'minus-button') {
    states.minus = true;
    states.plus = false;
    changeItemNum(catchCurrentItem(event.target.parentNode.parentNode.parentNode));
  }

  if (event.target.id == 'remove-button') {
    removeItem(catchCurrentItem(event.target.parentNode.parentNode));
  }

  if (event.target.id == 'empty-bag') {
    cleenBag(event.target.id);
  }

  if (event.target.id == 'checkout') {
    buyItems();
  }

  if (event.target.id == 'search-icon') {
    showSearchInput();
  }

  if (event.target.hasAttribute('data-best-offer-add')) {
    addToBagBestOffer();
  }
};

checkShoppingBag();
document.addEventListener('click', chooseFunction);
document.addEventListener('submit', chooseFunction);