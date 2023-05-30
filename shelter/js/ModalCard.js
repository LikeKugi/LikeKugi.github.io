class ModalCard {
    #container;
    constructor(elem='.cards') {
        this.container = elem;
    }
    set container(val) {
        const nodeEl = document.querySelector(val);
        if (nodeEl) {
            this.#container = nodeEl;
            this.#container.addEventListener("click", (e) => {
                this.checkTarget(e);
            });
        } else {
            return false;
        }
    }
    get container() {
        return this.#container;
    }
    checkTarget(e) {
        const point = e.target.closest(".card");
        if (!point) return;
        const petName = point.querySelector(".title").textContent;
        this.findPetInfo(petName);
    }
    findPetInfo(petName) {
        for (let pet of PETS) {
            if (pet.name === petName) {
                this.createModal(pet);
                return pet;
            }
        }
        return false;
    }

    createModal(pet) {
        document.body.style.overflow = "hidden";
        const modal = this.renderCard(pet);
        document.body.insertAdjacentHTML("beforeend", modal);
        const modalEl = document.querySelector('.modal');
        modalEl.addEventListener("click", (e) => {
            if (!e.target.closest('.modal__btn') && e.target.closest('.modal__window')) return;
            this.removeModal();
        });
    }

    removeModal() {
        document.body.style.overflow = "auto";
        let modal = document.querySelector(".modal");
        document.body.removeChild(modal);
    }

    renderCard(card) {
        const {
            name,
            modal,
            type,
            breed,
            description,
            age,
            inoculations,
            diseases,
            parasites,
        } = card;
        return `<div class="modal">
    <div class="modal__window">
        <button class="modal__btn">
            <span class="modal__cross">&#9587;</span>
        </button>
        <div class="modal__box-img">
            <img src="${modal}" alt="pet">
        </div>
        <div class="modal__box-txt">
            <h3 class="modal__title title title--3">${name}</h3>
            <h4 class="modal__subtitle title title--4">${type} - ${breed}</h4>
            <p class="modal__text">${description}</p>
            <ul class="modal__list">
                <li class="modal__item">
                    <span class="modal__annotation">Age:</span> <span class="modal__value">${age}</span>
                </li>
                <li class="modal__item">
                    <span class="modal__annotation">Inoculations:</span> <span class="modal__value">${inoculations.join(
            ", "
        )}</span>
                </li>
                <li class="modal__item">
                    <span class="modal__annotation">Diseases:</span> <span class="modal__value">${diseases.join(
            ", "
        )}</span>
                </li>
                <li class="modal__item">
                    <span class="modal__annotation">Parasites:</span><span class="modal__value">${parasites.join(
            ", "
        )}</span>
                </li>
            </ul>
        </div>
    </div>
</div>`;
    }
}