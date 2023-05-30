class Pagination {
    constructor(pets, cardsContainer='.pets__cards', paginationContainer='.friends__pagination') {
        this.cardsContainer = document.querySelector(cardsContainer);
        this.paginationContainer = document.querySelector(paginationContainer);
        this.firstBtn = document.querySelector('#first');
        this.firstBtn.addEventListener('click', () => {
            this.toStartPage();
        })
        this.lastBtn = document.querySelector('#last');
        this.lastBtn.addEventListener('click', () => {
            this.toEndPage();
        })
        this.nextBtn = document.querySelector('#next');
        this.nextBtn.addEventListener('click', () => {
            this.toNextPage();
        })
        this.prevBtn = document.querySelector('#prev');
        this.prevBtn.addEventListener('click', () => {
            this.toPreviousPage();
        })

        this.currentBtn = document.querySelector('#current');

        this.pets = this.createPetsArray(pets, 6);
        this.countCardsOnPage = 8;
        this.currentPage = 0;

        this.onInitPage();

        window.addEventListener('resize', () => {
            this.onWindowResizing();
        })
    }

    createPetsArray(pets, maxPages) {
        if (!pets || !Array.isArray(pets) || !pets.length) pets = this.defaultPets();
        const arr = [];
        const availableContent = this.createMaskOfRandomArray(pets, maxPages);

        for (const index of availableContent) {
            arr.push({name: pets[index].name, img: pets[index].img});
        }
        // console.log(arr);
        return arr;
    }
    onInitPage() {
        this.checkCardsContent();
        this.renderDefault();
    }
    onWindowResizing() {
        const initialState = this.checkCardsContent();
        if (initialState !== this.countCardsOnPage) {
            this.currentPage = 0;
            this.renderDefault();
        }
    }
    checkCardsContent() {
        const tabletWidth = window.matchMedia('(max-width: 1279px)');
        const phoneWidth = window.matchMedia('(max-width: 619px)');
        const initialState = this.countCardsOnPage;

        if (phoneWidth.matches) {
            this.countCardsOnPage = 3;
        } else if (tabletWidth.matches) {
            this.countCardsOnPage = 6;
        } else {
            this.countCardsOnPage = 8;
        }
        return initialState;
    }
    renderDefault() {
        this.buttonsActiveManagement();
        this.cardsContainer.innerHTML = '';
        const start = this.countCardsOnPage * this.currentPage;
        for (let i = start; i < start + this.countCardsOnPage; i++) {
            this.cardsContainer.innerHTML += `<div class="pets__card card">
                                <div class="card__box-img">
                                    <img src="${this.pets[i].img}" alt="${this.pets[i].name}">
                                </div>
                                <div class="card__box-text">
                                    <h3 class="card__title title title--card">${this.pets[i].name}</h3>
                                    <button class="btn card__btn  btn--transparent" type="button">Learn more</button>
                                </div>
                            </div>`
        }
    }
    buttonsActiveManagement() {
        this.currentBtn.textContent = `${this.currentPage + 1}`;
        if (this.currentPage === 0) {
            this.firstBtn.classList.add('pagination__link--inactive');
            this.prevBtn.classList.add('pagination__link--inactive');
            this.lastBtn.classList.remove('pagination__link--inactive');
            this.nextBtn.classList.remove('pagination__link--inactive');
        } else if (this.currentPage === Math.floor(this.pets.length / this.countCardsOnPage) - 1) {
            this.lastBtn.classList.add('pagination__link--inactive');
            this.nextBtn.classList.add('pagination__link--inactive');
            this.firstBtn.classList.remove('pagination__link--inactive');
            this.prevBtn.classList.remove('pagination__link--inactive');
        } else {
            this.firstBtn.classList.remove('pagination__link--inactive');
            this.prevBtn.classList.remove('pagination__link--inactive');
            this.lastBtn.classList.remove('pagination__link--inactive');
            this.nextBtn.classList.remove('pagination__link--inactive');
        }
    }
    toStartPage() {
        if (this.firstBtn.classList.contains('pagination__link--inactive')) return;
        this.currentPage = 0;
        this.renderDefault();
    }
    toEndPage() {
        if (this.lastBtn.classList.contains('pagination__link--inactive')) return;
        this.currentPage = Math.floor(this.pets.length / this.countCardsOnPage) - 1;
        this.renderDefault();
    }
    toNextPage() {
        if (this.currentPage >= Math.floor(this.pets.length / this.countCardsOnPage) - 1) return;
        this.currentPage += 1;
        this.renderDefault();
    }
    toPreviousPage() {
        if (this.currentPage < 1) return;
        this.currentPage -= 1;
        this.renderDefault();
    }
    shuffle(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }
    randint(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    createMaskOfRandomArray(arr, maxPages) {
        let mask = [];
        for (let i = 0; i < arr.length; i++) mask.push(i);
        mask = this.shuffle(mask);
        const out = [...mask];
        for (let i = 0; i < maxPages - 1; i++) {
            const currentPushes = new Set();
            while (currentPushes.size < arr.length) {
                const candidate = this.randint(0, arr.length);
                if (currentPushes.has(candidate) || out.slice(-6).includes(candidate)) continue;
                currentPushes.add(candidate);
                out.push(candidate);
            }
        }
        return out;
    }
    defaultPets() {
        return [
            {name: 'Katrine', img: 'img/pets/pets-katrine.png'},
            {name: 'Jennifer', img: 'img/pets/pets-jennifer.png'},
            {name: 'Woody', img: 'img/pets/pets-woody.png'},
            {name: 'Sophia', img: 'img/pets/pets-sophia.png'},
            {name: 'Timmy', img: 'img/pets/pets-timmy.png'},
            {name: 'Charly', img: 'img/pets/pets-charly.png'},
            {name: 'Scarlett', img: 'img/pets/pets-scarlet.png'},
            {name: 'Freddie', img: 'img/pets/pets-freddie.png'}
        ]
    }
}