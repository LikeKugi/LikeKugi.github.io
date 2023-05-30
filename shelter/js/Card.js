class Card {
    duration=2000;
    rotateNext = [{
        transform: 'rotateY(180deg)'
    }, {
        filter: 'blur(20px)'
    }];
    rotatePrev = [{
        transform: 'rotateY(-180deg)'
    }, {
        filter: 'blur(10px)'
    }];
    animationProperties = {
        duration: this.duration / 2,
        iterations: 1,
    };
    constructor(selector='.card', duration=2000) {
        this.duration = duration;
        this.selector = selector;
    }
    getCardElements() {
        this.cards = document.querySelectorAll(this.selector);
    }
    swapNextCards(data) {
        if (!data) data =[
            {name: "Katrine", img: "img/pets/pets-katrine.png"},
            {name: "Jennifer", img: "img/pets/pets-jennifer.png"},
            {name: "Woody", img: "img/pets/pets-woody.png"}
        ];
        this.getCardElements();
        this.cards.forEach((el, i) => {
            el.animate(this.rotateNext, this.animationProperties);

            el.querySelector('img').src = data[i].img;
            el.querySelector('img').alt = data[i].name;
            el.querySelector('.title').textContent = data[i].name;

            el.animate(this.rotateNext, this.animationProperties);
        });
    }
    swapPrevCards(data) {
        if (!data) data =[
            {name: "Katrine", img: "img/pets/pets-katrine.png"},
            {name: "Jennifer", img: "img/pets/pets-jennifer.png"},
            {name: "Woody", img: "img/pets/pets-woody.png"}
        ];
        this.getCardElements();
        this.cards.forEach((el, i) => {
            el.animate(this.rotatePrev, this.animationProperties);

            el.querySelector('img').src = data[i].img;
            el.querySelector('img').alt = data[i].name;
            el.querySelector('.title').textContent = data[i].name;

            el.animate(this.rotatePrev, this.animationProperties);
        });
    }
}