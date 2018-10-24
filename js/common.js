const menuMobileButton = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');
const bagPrice = document.getElementById('bag-price');
const bagNum = document.getElementById('bag-num');


let shoppingBag = {};

const states = {
    color: '',
    size: '',
    left: false,
    right: false,
    discount: false
}

const showMobileMenu = () => {
    mobileMenu.classList.toggle('none');
    if (menuMobileButton.innerHTML == '☰') {
        menuMobileButton.innerHTML = '×';
        menuMobileButton.classList.add('text_red');
    } else {
        menuMobileButton.innerHTML = '☰';
        menuMobileButton.classList.remove('text_red');
    }
}

const checkShoppingBag = () => {  
    states.left = false;
    states.right = false;
    states.discount = false;
    
    if (localStorage.getItem('bag')) {
        shoppingBag = JSON.parse(localStorage.getItem('bag'));
    }

    let itemsPrice = 0;
    let itemsCnt = 0;
    for (let key in shoppingBag) {
        itemsCnt += shoppingBag[key];

        let currentItem = JSON.parse(key);

        if (window.bestOffer.left.some(id => id === currentItem.id)) { //checked current item in best offer left block
            states.left = true; 
        }

        if (window.bestOffer.right.some(id => id === currentItem.id)) {//checked current item in best offer right block
            states.right = true;
        }

        if (states.left && states.right) { //if both of them present in the bag applied discount
            states.discount = true;
        }

        if (currentItem.discountedPrice) {
            currentItem.price = currentItem.discountedPrice;
        }

        itemsPrice += currentItem.price * shoppingBag[key];
    }

    bagNum.innerHTML = '(' + itemsCnt + ')';
    if (states.discount) {
        itemsPrice -= window.bestOffer.discount;
    }
    bagPrice.innerHTML = '£' + itemsPrice.toFixed(2);
}


const searchBlock = document.getElementById('search-tablet');
const inputSearch = document.getElementById('search-input-tablet');


const showSearchInput = () => {
    inputSearch.classList.toggle('none');
    searchBlock.classList.toggle('search-width');
}


const chooseFunction = () => {
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
}

checkShoppingBag();
document.addEventListener('click', chooseFunction);
document.addEventListener('submit', chooseFunction);