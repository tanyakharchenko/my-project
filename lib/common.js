"use strict";

var menuMobileButton = document.getElementById('menu-icon');

var showMobileMenu = function showMobileMenu() {
  console.log(menuMobileButton.classList());
};

var chooseFunction = function chooseFunction() {
  if (event.target.id == 'menu-icon') {
    showMobileMenu();
  }
};

document.addEventListener('click', chooseFunction);