//  Navigation
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__navigation');

burger.onclick = () => {
    burger.classList.contains('burger--open')
        ? burger.classList.replace('burger--open', 'burger--close')
        : burger.classList.replace('burger--close', 'burger--open');

    nav.classList.toggle('navigation--active');
};

const subNavBtns = document.querySelectorAll('.navigation__button');

subNavBtns.forEach((btn) => {
    btn.onclick = () => {
        const navItem = btn.closest('.navigation__item');
        const subNav = [...navItem.children].find((e) =>
            e.classList.contains('navigation__subnavigation')
        );

        const btnArrow = [...btn.children].find((e) =>
            e.classList.contains('navigation__arrow')
        );

        subNav.classList.toggle('navigation__subnavigation--showing');
        btnArrow.classList.toggle('navigation__arrow--close');
    };
});

//  Banner
import Carousel from './carousel.js';

const bannerList = document.querySelector('.banner__list');
const bannerNav = {
    left: document.querySelector('.banner__nav--left'),
    right: document.querySelector('.banner__nav--right'),
};

const bannerCarousel = new Carousel(bannerList, bannerNav);
bannerCarousel.run();

const newsCarousel = new Carousel(
    document.querySelector('.news__list'),
    null,
    document.querySelector('.news__dots')
);
