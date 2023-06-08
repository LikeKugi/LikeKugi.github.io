class Burger {
  constructor(elem = ".header__nav") {
    this.container = document.querySelector(elem);
    this.togglerEls = this.container.querySelectorAll(".nav__toggler");
    this.togglerEls.forEach((el) =>
      el.addEventListener("click", () => {
        this.toggleList();
      })
    );
    this.navList = this.container.querySelector(".nav__list");
    this.windowsQuery();
  }

  hideList() {
    this.navList.classList.add("nav__hidden");
    this.navList.style.height = 0;
  }
  showList() {
    this.navList.classList.remove("nav__hidden");
    this.navList.style.height = "100vh";
  }

  toggleList() {
    if (this.navList.classList.contains("nav__hidden")) {
      this.showList();
    } else {
      this.hideList();
    }
  }

  windowsQuery() {
    let query = window.matchMedia("(max-width: 1200px)");
    window.addEventListener("resize", () => {
      if (query.matches) {
        this.navList.classList.add("nav__hidden");
      } else {
        this.navList.classList.remove("nav__hidden");
        this.navList.style.height = "auto";
      }
    });
  }
}
