const menuMobileButton = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');
const bagPrice = document.getElementById('bag-price');
const bagNum = document.getElementById('bag-num');

let shoppingBag = {};

const states = {
    color: '',
    size: ''
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
    if (localStorage.getItem('bag')) {
        shoppingBag = JSON.parse(localStorage.getItem('bag'));
    }

    let itemsPrice = 0;
    let itemsCnt = 0;
    for (key in shoppingBag) {
        itemsCnt += shoppingBag[key];

        let currentItem = JSON.parse(key);
        itemsPrice = currentItem.price * itemsCnt;
    }

    bagNum.innerHTML = '(' + itemsCnt + ')';
    bagPrice.innerHTML = '£' + itemsPrice;
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
    if (event.target.classList.contains('item')) {
        localStorage.setItem('id', event.target.id);
    }

    if (event.target.classList.contains('parameters__input')) {
        changeRadioState(event.target);
    }
}

checkShoppingBag();
document.addEventListener('click', chooseFunction);
document.addEventListener('submit', chooseFunction);