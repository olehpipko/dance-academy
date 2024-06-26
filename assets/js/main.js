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
let banner;
const createBannerCarousel = () => {
    if (banner) {
        clearInterval(banner.runInterval);
        banner.destroy(true);
    }

    banner = new Siema({
        selector: '.banner__list',
        duration: 200,
        easing: 'ease-out',
        perPage: 1,
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        threshold: 20,
        loop: true,
        rtl: false,

        onInit: () => {
            //  Size of block
            // const bannerBlock = document.querySelector('.banner__list');
            // const slides = [...bannerBlock.querySelectorAll('.banner__item')];
            // bannerBlock.style.height = `${slides[0].offsetHeight}px`;

            // let maxHeight = slides[0].offsetHeight;
            // slides.forEach((slide) =>
            //     slide.offsetHeight > maxHeight
            //         ? (maxHeight = slide.offsetHeight)
            //         : 0
            // );

            //  Navigation
            const bannerPrev = document.querySelector('.banner__nav--left');
            const bannerNext = document.querySelector('.banner__nav--right');

            // bannerPrev.style.top = bannerNext.style.top =
            //     maxHeight / 2 - bannerPrev.offsetHeight / 2 + 'px';

            bannerPrev.onclick = () => banner.prev();
            bannerNext.onclick = () => banner.next();
        },
        onChange: () => {
            //  Size of block
            // banner.selector.style.height = `${
            //     banner.innerElements[banner.currentSlide].offsetHeight
            // }px`;

            //  Navigation
            clearInterval(banner.runInterval);
            banner.run();
        },
    });

    banner.run = (time = 4000) => {
        banner.runSet = true;
        banner.runInterval = setInterval(() => banner.next(), time);
    };
    banner.run();
};

//  News
let news;
const dotsWrap = document.querySelector('.news__dots');
dotsWrap.innerHTML = '';

[...document.querySelector('.news__list').children].forEach((slide, i) => {
    const dotItem = document.createElement('li');
    dotItem.classList = 'dots__item';

    const dotBtn = document.createElement('button');
    dotBtn.classList = 'dots__button';
    dotBtn.innerHTML = i + 1;

    dotItem.append(dotBtn);
    dotsWrap.append(dotItem);
});
const createNewsCarousel = (newsSelector = '.news__list') => {
    const newsDots = document.querySelectorAll('.news__dots .dots__button');

    if (news) news.destroy(true);
    if (window.innerWidth <= 768)
        news = new Siema({
            selector: newsSelector,
            duration: 200,
            easing: 'ease-out',
            perPage: {
                600: 2,
            },
            startIndex: 0,
            draggable: true,
            multipleDrag: true,
            threshold: 20,
            loop: true,
            rtl: false,
            loop: true,

            onInit: () => {
                if (window.innerWidth <= 600) {
                    const newsBlock = document.querySelector(newsSelector);
                    const articleBlock = newsBlock.querySelector('.article');
                    newsBlock.style.height = `${articleBlock.offsetHeight}px`;
                } else {
                    const wrap =
                        document.querySelector(newsSelector).children[0];
                    wrap.style.display = `flex`;
                    wrap.style.gap = '1rem';
                }

                //  Dots
                newsDots.forEach((dot) =>
                    dot.classList.remove('dots__button--current')
                );
                newsDots[0].classList.add('dots__button--current');

                newsDots.forEach((dot, i) => {
                    dot.onclick = () => {
                        newsDots.forEach((dot) =>
                            dot.classList.remove('dots__button--current')
                        );
                        dot.classList.add('dots__button--current');

                        news.goTo(i);
                    };
                });
            },
            onChange: () => {
                if (window.innerWidth <= 600)
                    news.selector.style.height = `${
                        news.innerElements[news.currentSlide].offsetHeight
                    }px`;

                //  Dots
                newsDots.forEach((dot) =>
                    dot.classList.remove('dots__button--current')
                );
                newsDots[
                    news.currentSlide >= 0
                        ? news.currentSlide
                        : news.innerElements.length - 1
                ].classList.add('dots__button--current');
            },
        });
};

createBannerCarousel();
createNewsCarousel();
window.onresize = () => {
    createBannerCarousel();
    createNewsCarousel();
};
