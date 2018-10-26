const createItem = ({ id, title, price, discountedPrice, thumbnail, hasNew }) => {
    if (discountedPrice) {
        price = discountedPrice;
    }
    return `
    <div class="items-catalog__item">
    <a href="/html/item.html" class="link link_item">
        <div class="item new-${hasNew}" id="${id}" data-item="true">
            <div class="item__image" data-item="true" id="${id}">
            <img src="${thumbnail}" alt="catalog-image" class="img img_item">
            <div class="item_hover">
                <p class="text_view-item">View item</p>
            </div>
            </div>
            <h4 class="caption caption_4">${title}</h4>
            <h5 class="caption caption_5">£${price}</h5>
        </div>
    </a>
    </div>
    `
}

const createExtras = () => {
    return `
    <div class="extra-off">
    <h2 class="caption caption_2">Last weekend <span class="text_red">extra 50%</span> off on
        all
        reduced boots and shoulder bags</h2>
    <h3 class="caption caption_3">This offer is valid in-store and online. Prices displayed
        reflect
        this additional discount. This offer ends at 11:59 GMT on March 1st 2019</h3>
    </div>
    `
}

const itemsCatalog = document.getElementById('items-catalog');
const catalogWrapper = document.getElementById('catalog');

const itemsCatalogCollection = document.getElementsByClassName('items-catalog__item');
const extrasCollection = document.getElementsByClassName('extra-off');
itemsCatalogCollection.forEach = Array.prototype.forEach;
extrasCollection.forEach = Array.prototype.forEach;

const sortByDate = (a, b) => {
    return Date.parse(b.dateAdded) - Date.parse(a.dateAdded);
}
window.catalog.sort(sortByDate);

const drawItems = (catalog) => {
    itemsCatalog.innerHTML = '';
    catalog.forEach((item, i) => { //add extras to mark-up after first two, three and four elements 
        itemsCatalog.innerHTML += createItem(item);
        if (i == 1 || i == 2 || i == 3) {
            itemsCatalog.innerHTML += createExtras();
        }
    });
    itemsCatalogCollection.forEach((item, i) => { //hide "unwanted" items
        if (i > 11) {
            item.classList.add('none');
        }
    });

    extrasCollection.forEach((item, i) => {
        if (i == 0) {
            item.classList.add('extra-off_mobile');
        }
        if (i == 1) {
            item.classList.add('extra-off_tablet');
        }
    });
    return itemsCatalog;
}

const showMore = (button) => {
    for (let i = 12; i < itemsCatalogCollection.length; i++) { //12 is number of items need to show
        itemsCatalogCollection[i].classList.remove('none');
    }
    button.classList.add('none');
}

//filter 

const filterItems = document.getElementById('filter-items');
const tabletFilter = document.getElementById('tablet-filters');
const mobileFilter = document.getElementById('mobile-filters');
let tabletFilterItemsCollection = document.getElementsByClassName('tablet-filter__item');
tabletFilterItemsCollection = Array.prototype.slice.call(tabletFilterItemsCollection); //set to collection array's methods
const tabletButton = document.getElementById('button-tablet-filters');
const mobileButton = document.getElementById('button-mobile-filters')

const filterState = {
    fashion: 'Not selected',
    productType: 'Not selected',
    color: 'Not selected',
    brand: 'Not selected',
    size: 'Not selected',
    priceRange: 'Not selected'
}

const redrawFilterHead = (filteredItem) => {
    let current = document.getElementById(filteredItem);

    if (filterState[filteredItem] == 'Not selected') {
        current.childNodes[3].innerHTML = '';
        current.childNodes[1].classList.remove('text_smaller-size');
        return;
    }

    current.childNodes[3].innerHTML = filterState[filteredItem];
    current.childNodes[1].classList.add('text_smaller-size');
}

const changeFilterState = () => {
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

    let filteredItem = event.target.parentNode.parentNode.id;
    filterState[filteredItem] = event.target.innerHTML;

    redrawFilterHead(filteredItem)
}

const changeTabletFilter = () => {
    if (!event.target.parentNode.previousSibling.previousSibling) return; //catch clicks between menu items

    let categoryName = event.target.parentNode.previousSibling.previousSibling.innerHTML;
    let filteredItem = _.camelCase(categoryName);
    filterState[filteredItem] = event.target.innerHTML;

    if (screen.width < 768) {
        filteredItem += '-mobile';
    }

    let current = document.getElementById(filteredItem);

    if (!current) { //catch clicks between menu items
        return;
    }

    tabletFilterItemsCollection.forEach((item) => {
        let currentCategoryName = item.parentNode.previousSibling.previousSibling.innerHTML;
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
            current.classList.add('text_red', 'caption_6')
            event.target.parentNode.childNodes[1].classList.remove('text_black');
        }
    });
}

const menuList = document.getElementById('menu-list');
const womenArr = window.catalog.filter((item) => {
    if (item.category == 'women') {
        return item;
    }
});

const menArr = window.catalog.filter((item) => {
    if (item.category == 'men') {
        return item;
    }
});

//filtered content men/women

let headerLinkCollection = document.getElementsByClassName('link_header');
headerLinkCollection = Array.prototype.slice.call(headerLinkCollection);
const menWomenLinksDesktop = headerLinkCollection.splice(11, 2) //get only "men" and "women" desktop links


const filterMenWomen = () => {
    if (event.target.innerHTML == 'Women') {
        drawItems(womenArr);
    }
    if (event.target.innerHTML == 'Men') {
        drawItems(menArr);
    }
    menWomenLinksDesktop.forEach((item) => {
        if (item.innerHTML == event.target.innerHTML) {
            item.classList.add('text_red');
        } else {
            item.classList.remove('text_red');
        }
    });
}

const checkWhatToDraw = () => { //if "women" or "men" were clicked out of catalog page
    if (window.location.hash == '#men') {
        catalogWrapper.appendChild(drawItems(menArr));
        menWomenLinksDesktop[1].classList.add('text_red'); //[1] it's "men" link in collection
        menWomenLinksDesktop[0].classList.remove('text_red');
    }
    else if (window.location.hash == '#women') {
        catalogWrapper.appendChild(drawItems(womenArr));
        menWomenLinksDesktop[0].classList.add('text_red');
        menWomenLinksDesktop[1].classList.remove('text_red');

    } else {
        catalogWrapper.appendChild(drawItems(window.catalog))
    }
}

checkWhatToDraw();


menuList.addEventListener('click', filterMenWomen);

filterItems.addEventListener('click', changeFilterState);
mobileFilter.addEventListener('click', changeFilterState);


tabletFilter.addEventListener('click', changeTabletFilter);