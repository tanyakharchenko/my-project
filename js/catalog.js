const createItem = ({ id, title, price, discountedPrice, thumbnail, hasNew }) => {
    if (discountedPrice) {
        price = discountedPrice;
    }
    return `
    <div class="items-catalog__item">
    <a href="/html/item.html" class="link link_item">
        <div class="item new-${hasNew}" id="${id}" data-item="true">
            <img src="${thumbnail}" alt="catalog-image" class="img img_item">
            <div class="item_hover">
                <p class="text_view-item">View item</p>
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


window.catalog.forEach((item, i) => { //add extras to mark-up after first two, three and four elements 
    itemsCatalog.innerHTML += createItem(item);
    if (i == 1 || i == 2 || i == 3) {
        itemsCatalog.innerHTML += createExtras();
    }
});

const itemsCatalogCollection = document.getElementsByClassName('items-catalog__item');
const extrasCollection = document.getElementsByClassName('extra-off');
itemsCatalogCollection.forEach = Array.prototype.forEach;
extrasCollection.forEach = Array.prototype.forEach;

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

const showMore = (button) => {
    for (let i = 12; i < itemsCatalogCollection.length; i++) {
        itemsCatalogCollection[i].classList.remove('none');
        itemsCatalogCollection[i].classList.add('show-more-item');
    }
    button.classList.add('none');
}

catalogWrapper.appendChild(itemsCatalog);