let itemId = localStorage.getItem('id');
let currentItem;
const itemBlock = document.getElementById('item-characters');

window.catalog.forEach((item) => {
    if (item.id == itemId) {
        currentItem = item;
    }
});

const createItemCharacters = ({ title, price, discountedPrice, description, preview, sizes, colors }) => {
    if (discountedPrice) {
        price = discountedPrice;
    }
    return `
    <div class="item-photo" id="photo-block">
                        <div class="item-photo_main">
                            <img src="${preview[0]}" alt="item image" class="img item-photo_full" 
                            id="first-photo">
                            <img src="${preview[1]}" alt="item image" class="img item-photo_full none" id="second-photo"">
                            <img src="${preview[2]}" alt="item image" class="img item-photo_full none" 
                            id="third-photo">
                        </div>
                        <div class="item-photo_secondary">
                            <div class="img-wrapper">
                            <img src="${preview[0]}" alt="item image" class="img item-photo_thumb" data-first="true">
                            <div class="thumb-hover" id="first-hover"></div>
                            </div>
                            <div class="img-wrapper">
                            <img src="${preview[1]}" alt="item image" class="img item-photo_thumb" data-second="true">
                            <div class="thumb-hover none" id="second-hover"></div>
                            </div>
                            <div class="img-wrapper">
                            <img src="${preview[2]}" alt="item image" class="img item-photo_thumb" data-third="true">
                            <div class="thumb-hover none" id="third-hover"></div>
                            </div>
                        </div>
                    </div>
                    <div class="item-parameters">
                        <h2 class="caption caption_2">${title}</h2>
                        <div class="caption-order">
                            <h3 class="caption caption_3">${description}</h3>
                            <h5 class="caption caption_5">£${price}</h5>
                        </div>
                        <form class="parameters" id="form">
                        <div class="parameter parameter_size">
                        <p class="parameter__text">Size</p>
                            ${createItemSize(sizes)}
                        </div>
                        <div class="parameter parameter_color">
                        <p class="parameter__text">Color</p>
                            ${createItemColor(colors)}
                        </div>
                        <input type="submit" value="Add to bag" class="common-button" id="add-to-bag-button">
                        </form>
                    </div>
    `
}

const createItemSize = (sizes) => {
    let str = '';
    if (sizes.length == 0) {
        return `
        <input type="radio" id="size_No-size" class="parameters__input" name="size" value="Universal">
        <label for="size_No-size" class="parameters__label">Universal</label>
        `
    }

    else {
        sizes.forEach((size) => {
            str +=
                `
            <input type="radio" id="size_${size}" class="parameters__input" name="size" value="${size}">
            <label for="size_${size}" class="parameters__label">${size}</label>
            `
        });

        return str;
    }
}

const createItemColor = (colors) => {
    let str = '';
    if (colors.length == 0) {
        return `
        <input type="radio" id="color_No-color" class="parameters__input" name="color" value="Universal">
        <label for="color_No-color" class="parameters__label">Universal</label>
        `
    } else {
        colors.forEach((color) => {
            str +=
            `
            <input type="radio" id="color_${color}" class="parameters__input" name="color" value="${color}">
            <label for="color_${color}" class="parameters__label">${color}</label>
            `
        })
        return str;
    }
}

itemBlock.innerHTML = createItemCharacters(currentItem);

const changeRadioState = (input) => {
    let name = input.name;
    states[name] = input.value;
}

const addToBag = () => {
    currentItem.size = states.size;
    currentItem.color = states.color;

    if (currentItem.size == '' || currentItem.color == '') {
        alert('Error! You should choose size and color!');
        return;
    }

    let currentItemStr = JSON.stringify(currentItem);

    if (shoppingBag[currentItemStr]) {
        shoppingBag[currentItemStr]++;
    } else {
        shoppingBag[currentItemStr] = 1;
    }

    let shoppingBagStr = JSON.stringify(shoppingBag);
    localStorage.setItem('bag', shoppingBagStr);
    checkShoppingBag();
}

const photoBlock = document.getElementById('photo-block');
let firstPhoto = document.getElementById('first-photo');
let secondPhoto = document.getElementById('second-photo');
let thirdPhoto = document.getElementById('third-photo');
const firstHover = document.getElementById('first-hover');
const secondHover = document.getElementById('second-hover');
const thirdHover = document.getElementById('third-hover');

photoBlock.addEventListener('click', () => {
    if (event.target.classList.contains('item-photo_full')) {
        return;
    }
    if (event.target.hasAttribute('data-first')) {
        firstPhoto.classList.remove('none');
        secondPhoto.classList.add('none');
        thirdPhoto.classList.add('none');
        firstHover.classList.remove('none');
        secondHover.classList.add('none');
        thirdHover.classList.add('none');
    }

    if (event.target.hasAttribute('data-second')) {
        firstPhoto.classList.add('none');
        secondPhoto.classList.remove('none');
        thirdPhoto.classList.add('none');
        firstHover.classList.add('none');
        secondHover.classList.remove('none');
        thirdHover.classList.add('none');
    }

    if (event.target.hasAttribute('data-third')) {
        firstPhoto.classList.add('none');
        secondPhoto.classList.add('none');
        thirdPhoto.classList.remove('none');
        firstHover.classList.add('none');
        secondHover.classList.add('none');
        thirdHover.classList.remove('none');
    }

})