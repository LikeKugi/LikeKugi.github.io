class Slider {
    getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    constructor(container = '.our-friends__slider') {
        this.countCards = 3;
        this.container = document.querySelector(container);

        this.cardsController = new Card();
        this.currentCards = ["Katrine", "Jennifer", "Woody"];
        this.prevCards = [];
        this.nextCards = [];

        this.cardsContainer = this.container.querySelector('.cards');

        this.nextBtn = this.container.querySelector('.slider__controls--right');
        this.nextBtn.addEventListener('click', () => {
            this.nextClick();
        })

        this.prevBtn = this.container.querySelector('.slider__controls--left');
        this.prevBtn.addEventListener('click', () => {
            this.prevClick();
        })

        this.cardEls = this.container.querySelectorAll('.card');

        this.putCardsOnPage();
        this.changeCardsOnWindowWidth();
    }

    nextClick() {

        let next;

        if (this.nextCards.length > 0) {
            next = this.matchCards(this.nextCards, PETS);
        } else {
            next = this.createNextCardsData(PETS);
        }

        this.cardsController.swapNextCards(next);
        this.prevCards = this.currentCards;
        this.currentCards = this.nextCards;
        this.nextCards = [];
    }

    prevClick() {

        let pushing;
        if (this.prevCards.length > 0) {
            pushing = this.matchCards(this.prevCards, PETS);
            this.nextCards = this.currentCards;
            this.currentCards = this.prevCards;
        } else {
            this.nextCards = [];
            pushing = this.createNextCardsData(PETS);
            console.log(this.currentCards);
            console.log('NEXT:', this.nextCards);
            this.prevCards = this.currentCards;
            this.currentCards = this.nextCards;
            this.nextCards = this.prevCards;
        }

        this.prevCards = [];
        this.cardsController.swapPrevCards(pushing);
    }

    createNextCardsData(pets) {
        const availableContent = [];
        for (const available of pets) {
            if (this.currentCards.includes(available.name)) continue;
            availableContent.push(available);
        }

        availableContent.forEach(el => console.log(`Available: ${el.name}`));

        const nextContent = [];
        while (nextContent.length < this.countCards) {
            const available = availableContent[this.getRandomInt(0, availableContent.length - 1)];
            if (this.nextCards.includes(available.name)) continue;
            nextContent.push(available);
            this.nextCards.push(available.name);
        }

        return nextContent;
    };

    matchCards(names, pets) {
        const out = [];
        pets.forEach(el => {
            if (names.includes(el.name)) out.push(el)
        })
        return out;
    };

    changeCardsOnWindowWidth() {
        window.addEventListener('resize', () => {
            this.putCardsOnPage();
        })
    };

    putCardsOnPage() {
        const tabletWidth = window.matchMedia('(max-width: 1100px)');
        const phoneWidth = window.matchMedia('(max-width: 600px)');
        const initialState = this.countCards;
        if (phoneWidth.matches) {
            this.countCards = 1;
        } else if (tabletWidth.matches) {
            this.countCards = 2;
        } else {
            this.countCards = 3;
        }
        if (initialState !== this.countCards) {
            this.nextCards = [];
            this.prevCards = [];
            this.currentCards = [];
            this.renderDefault();
        }
    }

    renderDefault() {
        this.cardsContainer.innerHTML = '';
        const defaultPets = [
            {name: "Katrine", img: "img/pets/pets-katrine.png"},
            {name: "Jennifer", img: "img/pets/pets-jennifer.png"},
            {name: "Woody", img: "img/pets/pets-woody.png"}
        ];

        for (let i = 0; i < this.countCards; i++) {
            const defaultCard = `<div class="slider__card card">
                                <div class="card__box-img">
                                    <img src="${defaultPets[i].img}" alt="${defaultPets[i].name}">
                                </div>
                                <div class="card__box-text">
                                    <h3 class="card__title title title--card">${defaultPets[i].name}</h3>
                                    <button class="btn card__btn btn--transparent" type="button">Learn more</button>
                                </div>
                            </div>`
            this.currentCards.push(defaultPets[i].name);
            this.cardsContainer.innerHTML += defaultCard;
        }
    }
}