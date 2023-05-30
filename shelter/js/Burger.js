class Burger {
    constructor(btnCls='.nav__toggle', navCls='.header__nav') {
        this.navEl = document.querySelector(navCls);
        this.btnEl = document.querySelector(btnCls);
        this.navEl.addEventListener('click', (e) => {
            if (e.target.closest(btnCls) || e.target.closest('.nav__item') || !e.target.closest('.nav__list')) {
                this.manageNavigation();
            }
        })
        this.ChangeBurgerStateInWindowWidth()
    }

    addActive() {
        this.navEl.classList.add('nav__active');
        document.body.style.overflow = 'hidden';
    }
    removeActive() {
        this.navEl.classList.remove('nav__active');
        document.body.style.overflow = 'auto';
    }
    closeMenu(e) {
        if (!e.target.closest('.nav__item')) return;
        this.removeActive()
    }
    manageNavigation() {
        if (!this.navEl.classList.contains('burger')) return;
        if (this.navEl.classList.contains('nav__active')) {
            this.removeActive();
        } else {
            this.addActive();
        }
    }

    ChangeBurgerStateInWindowWidth() {
        let windowWidth = window.matchMedia('(max-width: 767px)');
        if (windowWidth.matches) this.navEl.classList.add('burger');
        window.addEventListener('resize', () => {
            if (!windowWidth.matches) {
                this.removeActive();
                this.navEl.classList.remove('burger');
            } else {
                this.navEl.classList.add('burger');
            }
        })
    }
}