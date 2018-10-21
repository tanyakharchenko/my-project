const menuMobileButton = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');

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




const chooseFunction = () => {
    if (event.target.id == 'menu-icon') {
        showMobileMenu();
    }
}


document.addEventListener('click', chooseFunction);