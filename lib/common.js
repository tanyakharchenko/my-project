"use strict";

var menuMobileButton = document.getElementById('menu-icon');
var mobileMenu = document.getElementById('mobile-menu');
var shoppingBag = {};

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

var addToBag = function addToBag() {};

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
};

document.addEventListener('click', chooseFunction);
document.addEventListener('submit', chooseFunction);