let bagContains = [];
for (let item in shoppingBag) {
    let parseItem = JSON.parse(item);
    parseItem.num = shoppingBag[item];
    bagContains.push(parseItem);
}

const createItem = ({ id, title, price, discountedPrice, thumbnail, hasNew, color, size, num }) => {
    if (discountedPrice) {
        price = discountedPrice;
    }
    return `
    <div class="item new-${hasNew}" id="${id}" data-color="${color}" data-size="${size}">
                        <a href="/html/item.html" class="link link_item">
                            <div class="item__image">
                                <img src="${thumbnail}" alt="catalog-image" class="img img_item">
                                <div class="item_hover">
                                    <p class="text_view-item">View item</p>
                                </div>
                            </div>
                        </a>
                        <div class="item__parameters">
                            <a href="/html/item.html" class="link link_item">
                                <h4 class="caption caption_4">${title}</h4>
                            </a>
                            <h5 class="caption caption_5">£${price}</h5>
                            <div class="item-parameter item-parameter_color">
                                <p class="item-parameter__name">Color: </p>
                                <p class="item-parameter__value">${color}</p>
                            </div>
                            <div class="item-parameter item-parameter_size">
                                <p class="item-parameter__name">Size: </p>
                                <p class="item-parameter__value">${size}</p>
                            </div>
                            <div class="item-parameter item-parameter_quantity">
                                <p class="item-parameter__name">Quantity: </p>
                                <button class="item__button" id="minus-button">-</button>
                                <p class="quantity-counter">${num}</p>
                                <button class="item__button" id="plus-button">+</button>
                            </div>
                            <button class="item__button item__button_remove" id="remove-button">Remove item</button>
                        </div>
                    </div>
    `
}

const bagFilling = document.getElementById('bag-filling');
const wrapper = document.getElementById('bag-wrapper');
const totalPriceNum = document.getElementById('total-price-num');
const itemCounterCollection = document.getElementsByClassName('quantity-counter');

const emptyText = document.getElementById('empty-text');
const checkoutText = document.getElementById('checkout-text');

const discountBlock = document.getElementById('discount-block');

const drawsItems = (arr) => {
    bagFilling.innerHTML = '';
    arr.forEach((item) => {
        bagFilling.innerHTML += createItem(item);
    });
    totalPriceNum.innerHTML = bagPrice.innerHTML;
    if (bagContains.length > 0) {
        emptyText.classList.add('none');
    }
}

drawsItems(bagContains);
wrapper.appendChild(bagFilling);


const catchCurrentItem = (elem) => {
    const current = [];
    bagContains.forEach((item, i) => {
        if (item.id == elem.id
            && item.color == elem.getAttribute('data-color')
            && item.size == elem.getAttribute('data-size')) {
            current.push(item);
            current.push(i);
        }
    });
    return current; //return the array
}

let drawDiscount = () => {
    discountBlock.classList.remove('none');
}

let removeDiscount = () => {
    discountBlock.classList.add('none');
}

if (states.discount) {
    drawDiscount();
}

const changeItemNum = (arr) => { //array contains item (arr[0]) and it's position (arr[1])
    if (states.plus) {
        arr[0].num++;
    }
    if (states.minus) {
        arr[0].num--
        if (arr[0].num < 1) {
            arr[0].num = 1;
        }
    }
    itemCounterCollection[arr[1]].innerHTML = arr[0].num;
    for (let item in shoppingBag) {
        let parseItem = JSON.parse(item);
        if (parseItem.id == arr[0].id
            && parseItem.color == arr[0].color
            && parseItem.size == arr[0].size) {
            if (states.plus) {
                shoppingBag[item]++;
            }
            if (states.minus) {
                shoppingBag[item]--;
                if (shoppingBag[item] < 1) {
                    shoppingBag[item] = 1;
                }
            }
        }
    }
    let shoppingBagStr = JSON.stringify(shoppingBag);
    localStorage.setItem('bag', shoppingBagStr);
    checkShoppingBag();
    totalPriceNum.innerHTML = bagPrice.innerHTML;
}


const removeItem = (arr) => {
    bagContains.splice(arr[1], 1);

    for (let item in shoppingBag) { //remove from shopping bag
        let parseItem = JSON.parse(item);
        if (parseItem.id == arr[0].id
            && parseItem.color == arr[0].color
            && parseItem.size == arr[0].size) {
            delete shoppingBag[item];
        }
    }
    let shoppingBagStr = JSON.stringify(shoppingBag);
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
}

const cleenBag = (id) => {
    bagContains = [];
    shoppingBag = {};

    let shoppingBagStr = JSON.stringify(shoppingBag);
    localStorage.setItem('bag', shoppingBagStr);
    checkShoppingBag();

    drawsItems(bagContains);

    if (id == 'empty-bag') {
        emptyText.classList.remove('none');
    }
}

const buyItems = () => {
    if (bagContains.length == 0) {
        alert('You should choose some items')
        return;
    }
    cleenBag();
    checkoutText.classList.remove('none');
}

