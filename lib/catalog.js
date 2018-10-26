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
var itemsCatalogCollection = document.getElementsByClassName('items-catalog__item');
var extrasCollection = document.getElementsByClassName('extra-off');
itemsCatalogCollection.forEach = Array.prototype.forEach;
extrasCollection.forEach = Array.prototype.forEach;

var sortByDate = function sortByDate(a, b) {
  return Date.parse(b.dateAdded) - Date.parse(a.dateAdded);
};

window.catalog.sort(sortByDate);

var drawItems = function drawItems(catalog) {
  itemsCatalog.innerHTML = '';
  catalog.forEach(function (item, i) {
    //add extras to mark-up after first two, three and four elements 
    itemsCatalog.innerHTML += createItem(item);

    if (i == 1 || i == 2 || i == 3) {
      itemsCatalog.innerHTML += createExtras();
    }
  });
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
  return itemsCatalog;
};

var showMore = function showMore(button) {
  for (var i = 12; i < itemsCatalogCollection.length; i++) {
    //12 is number of items need to show
    itemsCatalogCollection[i].classList.remove('none');
  }

  button.classList.add('none');
}; //filter 


var filterItems = document.getElementById('filter-items');
var tabletFilter = document.getElementById('tablet-filters');
var mobileFilter = document.getElementById('mobile-filters');
var tabletFilterItemsCollection = document.getElementsByClassName('tablet-filter__item');
tabletFilterItemsCollection = Array.prototype.slice.call(tabletFilterItemsCollection); //set to collection array's methods

var tabletButton = document.getElementById('button-tablet-filters');
var mobileButton = document.getElementById('button-mobile-filters');
var filterState = {
  fashion: 'Not selected',
  productType: 'Not selected',
  color: 'Not selected',
  brand: 'Not selected',
  size: 'Not selected',
  priceRange: 'Not selected'
};

var redrawFilterHead = function redrawFilterHead(filteredItem) {
  var current = document.getElementById(filteredItem);

  if (filterState[filteredItem] == 'Not selected') {
    current.childNodes[3].innerHTML = '';
    current.childNodes[1].classList.remove('text_smaller-size');
    return;
  }

  current.childNodes[3].innerHTML = filterState[filteredItem];
  current.childNodes[1].classList.add('text_smaller-size');
};

var changeFilterState = function changeFilterState() {
  if (screen.width < 1024) {
    tabletFilter.classList.toggle('none');

    if (tabletButton.innerHTML == '▼' || mobileButton.innerHTML == '▼') {
      tabletButton.innerHTML = '×';
      mobileButton.innerHTML = '×';
      tabletButton.classList.add('text_red', 'arrow-down_shown_big');
      mobileButton.classList.add('text_red', 'arrow-down_shown_big');
    } else if (tabletButton.innerHTML == '×' || mobileButton.innerHTML == '×') {
      tabletButton.innerHTML = '▼';
      mobileButton.innerHTML = '▼';
      tabletButton.classList.remove('text_red', 'arrow-down_shown_big');
      mobileButton.classList.remove('text_red', 'arrow-down_shown_big');
    }

    if (screen.width < 768) {
      changeTabletFilter();
    }

    return;
  }

  if (event.target.classList.contains('caption_6') || event.target.classList.contains('drop-menu') || event.target.classList.contains('filter__item') || event.target.classList.contains('filter__items')) {
    return;
  }

  var filteredItem = event.target.parentNode.parentNode.id;
  filterState[filteredItem] = event.target.innerHTML;
  redrawFilterHead(filteredItem);
};

var changeTabletFilter = function changeTabletFilter() {
  if (!event.target.parentNode.previousSibling.previousSibling) return; //catch clicks between menu items

  var categoryName = event.target.parentNode.previousSibling.previousSibling.innerHTML;

  var filteredItem = _.camelCase(categoryName);

  filterState[filteredItem] = event.target.innerHTML;

  if (screen.width < 768) {
    filteredItem += '-mobile';
  }

  var current = document.getElementById(filteredItem);

  if (!current) {
    //catch clicks between menu items
    return;
  }

  tabletFilterItemsCollection.forEach(function (item) {
    var currentCategoryName = item.parentNode.previousSibling.previousSibling.innerHTML;

    if (categoryName == currentCategoryName) {
      item.classList.remove('text_red');
      event.target.classList.add('text_red');
    }

    if (event.target.innerHTML == 'Not selected') {
      event.target.classList.add('text_black');
      current.innerHTML = categoryName;
      current.classList.remove('text_red');
      return;
    } else {
      current.innerHTML = event.target.innerHTML;
      current.classList.add('text_red', 'caption_6');
      event.target.parentNode.childNodes[1].classList.remove('text_black');
    }
  });
};

var menuList = document.getElementById('menu-list');
var womenArr = window.catalog.filter(function (item) {
  if (item.category == 'women') {
    return item;
  }
});
var menArr = window.catalog.filter(function (item) {
  if (item.category == 'men') {
    return item;
  }
}); //filtered content men/women

var headerLinkCollection = document.getElementsByClassName('link_header');
headerLinkCollection = Array.prototype.slice.call(headerLinkCollection);
var menWomenLinksDesktop = headerLinkCollection.splice(11, 2); //get only "men" and "women" desktop links

var filterMenWomen = function filterMenWomen() {
  if (event.target.innerHTML == 'Women') {
    drawItems(womenArr);
  }

  if (event.target.innerHTML == 'Men') {
    drawItems(menArr);
  }

  menWomenLinksDesktop.forEach(function (item) {
    if (item.innerHTML == event.target.innerHTML) {
      item.classList.add('text_red');
    } else {
      item.classList.remove('text_red');
    }
  });
};

var checkWhatToDraw = function checkWhatToDraw() {
  //if "women" or "men" were clicked out of catalog page
  if (window.location.hash == '#men') {
    catalogWrapper.appendChild(drawItems(menArr));
    menWomenLinksDesktop[1].classList.add('text_red'); //[1] it's "men" link in collection

    menWomenLinksDesktop[0].classList.remove('text_red');
  } else if (window.location.hash == '#women') {
    catalogWrapper.appendChild(drawItems(womenArr));
    menWomenLinksDesktop[0].classList.add('text_red');
    menWomenLinksDesktop[1].classList.remove('text_red');
  } else {
    catalogWrapper.appendChild(drawItems(window.catalog));
  }
};

checkWhatToDraw();
menuList.addEventListener('click', filterMenWomen);
filterItems.addEventListener('click', changeFilterState);
mobileFilter.addEventListener('click', changeFilterState);
tabletFilter.addEventListener('click', changeTabletFilter);