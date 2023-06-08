class Works {
  #articles;
  constructor(elem = '.working') {
    this.section = document.querySelector(elem);
    this.controls = [...this.section.querySelectorAll('.tabs__btn')];
    this.title = this.section.querySelector('.working__subtitle');
    this.text = this.section.querySelector('.working__text');
    this.image = this.section.querySelector('.working__img');
    this.#articles = [];
    this.fetchData();
    this.createListeners();
  }

  async fetchData() {
    let response = await fetch(
      'https://likekugi.github.io/euclid/js/works.json',
    );
    try {
      if (!response.ok) return false;
      let ans = await response.json();
      this.#articles = ans;
    } catch (e) {
      return false;
    }
  }

  markActive(target) {
    console.log(target);
    this.controls.forEach((el, i) => {
      console.log(el);
      if (i === target) el.classList.add('tabs__btn--active');
      else el.classList.remove('tabs__btn--active');
    });
  }

  renderData(index) {
    this.markActive(index);
    this.title.textContent = this.#articles[index]['title'];
    this.text.textContent = this.#articles[index]['text'];
    this.image.src = this.#articles[index]['image'];
  }

  createListeners() {
    this.controls.forEach((el, i) => {
      el.addEventListener('click', () => {
        this.renderData(i);
      });
    });
  }
}
