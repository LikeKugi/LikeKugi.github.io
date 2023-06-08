class Slider {
  #timerID;
  #current;
  constructor(elem = ".banner__wrapper") {
    this.elem = document.querySelector(elem);
    this.controls = [...document.querySelectorAll(".banner__swiper")];
    this.addListenersToControls();
    this.#current = 0;
    this.slides = ["/img/proj-1.png", "/img/proj-2.png", "/img/proj-3.png"];
    this.startInterval();
  }

  changeBG(i = null) {
    if (i) this.#current = i;
    else this.#current = (this.#current + 1) % this.slides.length;
    this.controls.forEach((el, index) => {
      if (index === this.#current) el.classList.add("banner__swiper--active");
      else el.classList.remove("banner__swiper--active");
    });
    this.elem.style.backgroundImage = `url(${this.slides[this.#current]})`;
  }

  addListenersToControls() {
    this.controls.forEach((el, i) =>
      el.addEventListener("click", () => {
        this.changeBG(i);
        this.startInterval();
      })
    );
  }

  startInterval() {
    if (this.#timerID) clearInterval(this.#timerID);
    this.#timerID = setInterval(() => {
      this.changeBG();
    }, 6000);
  }
}
