export default class Carousel {
    constructor(list, nav, dots) {
        this.list = list;
        this.nav = nav;
        this.dots = dots;

        if (nav) {
            nav.left.onclick = () => {
                this.slide('left');
            };
            nav.right.onclick = () => {
                this.slide('right');
            };
        }

        if (dots) {
            this.dotsList = [];

            [...list.children].forEach((item, i) => {
                const li = document.createElement('li');
                li.classList = 'dots__item';

                const btn = document.createElement('button');
                btn.classList = 'dots__button';
                btn.innerText = i + 1;

                li.append(btn);
                dots.append(li);

                this.dotsList.push({
                    btn,
                    slide: item,
                    current: !i,
                });
            });

            this.dotsList[0].btn.classList.add('dots__button--current');

            this.dotsList.forEach((dot) => {
                dot.btn.onclick = () => {
                    this.dotsList.forEach((d) => {
                        d.btn.classList.remove('dots__button--current');
                        d.current = false;
                    });
                    dot.current = true;
                    dot.btn.classList.add('dots__button--current');

                    const currentPosition = this.positions.indexOf(
                        Number(dot.slide.style.left.slice(0, -1))
                    );

                    while (this.positions[currentPosition] !== 0) {
                        this.slide();
                    }
                };
            });
        }

        this.listItems = [...list.children];

        list.style.position = 'relative';
        list.style.overflow = 'hidden';
        list.style.zIndex = 0;
        list.style.height = this.listItems[0].offsetHeight + 'px';

        this.positions = [];

        for (let i = 0; i < this.listItems.length - 1; i++)
            this.positions.push(i * 100);
        this.positions.push(-100);

        for (let [i, listItem] of this.listItems.entries()) {
            listItem.style.position = 'absolute';
            listItem.style.left = this.positions[i] + '%';
            listItem.style.transition = 'all 0.3s';
        }
    }

    slide = (direction) => {
        if (this.runSet) {
            clearInterval(this.runInterval);
            this.run();
        }

        const { positions, listItems, list } = { ...this };

        switch (direction) {
            default:
            case 'right':
                positions.unshift(positions.pop());
                break;
            case 'left':
                positions.push(positions.shift());
                break;
        }

        for (let [i, listItem] of listItems.entries()) {
            listItem.style.left = positions[i] + '%';
            listItem.style.zIndex = 0;

            if (positions[i] === 0) {
                list.style.height = listItem.offsetHeight + 'px';
                listItem.style.zIndex = 1;
            }
        }
    };

    run = (time = 3000) => {
        const { slide } = { ...this };
        this.runSet = true;

        this.runInterval = setInterval(() => {
            slide();
        }, time);
    };
}
