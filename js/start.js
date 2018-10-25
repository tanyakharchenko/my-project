const itemsArray = (ids) => { //creating array with best-offer items
    const itemsArray = window.catalog.filter((item) => {
        return ids.some((id) => {
            return id === item.id;
        });
    });
    return itemsArray;
}

const drawItem = ({ id, title, price, discountedPrice, thumbnail, hasNew }) => {
    if (discountedPrice) {
        price = discountedPrice;
    }
    return `
    <a href="/html/item.html" class="link link_item">
        <div class="item new-${hasNew}" id="${id}" data-item="true">
            <div class="item_hover">
                <p class="text_view-item">View item</p>
            </div>
            <img src="${thumbnail}" alt="best-offer-image" class="img img_item">
            <h4 class="caption caption_4">${title}</h4>
            <h5 class="caption caption_5">£${price}</h5>
        </div>
    </a>
    `
}

let leftNum = 0;
let rightNum = 0;

let leftItems = itemsArray(window.bestOffer.left);
let rightItems = itemsArray(window.bestOffer.right);


const leftItem = document.getElementById('best-offer-left-item');
const leftUpButton = document.getElementById('button-up-left-item');
const leftDownButton = document.getElementById('button-down-left-item');


const rightItem = document.getElementById('best-offer-right-item');
const rightUpButton = document.getElementById('button-up-right-item');
const rightDownButton = document.getElementById('button-down-right-item');

const oldPrice = document.getElementById('old-price');
const newPrice = document.getElementById('new-price');

let leftPrice;
let rightPrice;
let leftItemId;
let rightItemId;

const addToBag = document.getElementById('add-to-bag');

const drawLeftItems = (num) => {
    leftItem.innerHTML = drawItem(leftItems[num]);
    if (leftItems[num].discountedPrice) {
        leftItems[num].price = leftItems[num].discountedPrice;
    }
    leftPrice = leftItems[num].price;
}

const drawRightItems = (num) => {
    rightItem.innerHTML = drawItem(rightItems[num]);
    if (rightItems[num].discountedPrice) {
        rightItems[num].price = rightItems[num].discountedPrice;
    }
    rightPrice = rightItems[num].price;
}


const draw = () => {
    drawLeftItems(leftNum);
    drawRightItems(rightNum);
    oldPrice.innerHTML = '£' + (leftPrice + rightPrice);
    newPrice.innerHTML = '£' + ((leftPrice + rightPrice) - window.bestOffer.discount);

    leftItemId = leftItem.childNodes[1].children[0].id;
    rightItemId = rightItem.childNodes[1].children[0].id;
}

draw();

leftDownButton.addEventListener('click', () => {
    leftNum++;
    if (leftNum >= leftItems.length) {
        leftNum = 0;
    }
    draw();
});

rightDownButton.addEventListener('click', () => {
    rightNum++;
    if (rightNum >= rightItems.length) {
        rightNum = 0;
    }
    draw();
});

leftUpButton.addEventListener('click', () => {
    leftNum--;
    if (leftNum < 0) {
        leftNum = leftItems.length - 1;
    }
    draw();
});

rightUpButton.addEventListener('click', () => {
    rightNum--;
    if (rightNum < 0) {
        rightNum = rightItems.length - 1;
    }
    draw();
});


const addToBagBestOffer = () => {
    const items = [];
    window.catalog.forEach((item) => {
        if (item.id == leftItemId || item.id == rightItemId) {
            items.push(item);
        }
    });

    let firstItem = items[0];
    let secondItem = items[1];
    firstItem.size = items[0].sizes[0];
    secondItem.size = items[1].sizes[0];
    firstItem.color = items[0].colors[0];
    secondItem.color = items[1].colors[0];

    let firstItemStr = JSON.stringify(firstItem);
    let secondItemStr = JSON.stringify(secondItem);

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

    let shoppingBagStr = JSON.stringify(shoppingBag);
    localStorage.setItem('bag', shoppingBagStr);

    states.discount = true;

    checkShoppingBag();

}



