let itemId = localStorage.getItem('id');
let currentItem;
const itemBlock = document.getElementById('item-characters');

window.catalog.forEach((item) => {
    if (item.id == itemId) {
        currentItem = item;
    }
});

const createItemCharacters = ({ title, price, description, preview, sizes, colors }) => {
    return `
    <div class="item-photo">
                        <div class="item-photo_main">
                            <img src="${preview[0]}" alt="item image" class="img item-photo_full">
                        </div>
                        <div class="item-photo_secondary">
                            <img src="${preview[0]}" alt="item image" class="img item-photo_thumb">
                            <img src="${preview[1]}" alt="item image" class="img item-photo_thumb">
                            <img src="${preview[2]}" alt="item image" class="img item-photo_thumb">
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
        for (i = 0; i < sizes.length; i++) {
            str += 
            `
            <input type="radio" id="size_${sizes[i]}" class="parameters__input" name="size" value="${sizes[i]}">
            <label for="size_${sizes[i]}" class="parameters__label">${sizes[i]}</label>
            `
        }
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
    }

    else {
        for (i = 0; i < colors.length; i++) {
            str += 
            `
            <input type="radio" id="color_${colors[i]}" class="parameters__input" name="color" value="${colors[i]}">
            <label for="color_${colors[i]}" class="parameters__label">${colors[i]}</label>
            `
        }
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

