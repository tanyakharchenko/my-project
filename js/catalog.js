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
        itemsCatalogCollection[i].classList.add('show-more-item');
    }
    button.classList.add('none');
}

//filter 

const filterItems = document.getElementById('filter-items');
const tabletFilter = document.getElementById('tablet-filters');

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
    let filteredItem = _.camelCase(event.target.parentNode.previousSibling.previousSibling.innerHTML)
    filterState[filteredItem] = event.target.innerHTML;

    if (event.target.innerHTML == 'Not selected') {
        return;
    }

    let current = document.getElementById(filteredItem);
    current.innerHTML = event.target.innerHTML;

    event.target.classList.add('text_red');
    current.classList.add('text_red', 'caption_6')
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
})

const filterMenWomen = () => {
    if (event.target.innerHTML == 'Women') {
        drawItems(womenArr);
    }
    if (event.target.innerHTML == 'Men') {
        drawItems(menArr);
    }
}

console.log(window.location.hash)
if (window.location.hash == '#men') {
    catalogWrapper.appendChild(drawItems(menArr));
}
else if (window.location.hash == '#women') {
    catalogWrapper.appendChild(drawItems(womenArr));
} else {
    catalogWrapper.appendChild(drawItems(window.catalog))
}

menuList.addEventListener('click', filterMenWomen);
filterItems.addEventListener('click', changeFilterState);
tabletFilter.addEventListener('click', changeTabletFilter);
