class Find {
  constructor(elem = "find") {
    this.container = document.querySelector(".find");
    this.fieldEl = this.container.querySelector(".find__box");

    this.inputEl = this.container.querySelector("#findField");

    this.btnStart = this.container.querySelector("#findStart");
    this.btnStart.addEventListener("click", () => {
      this.showField();
    });

    this.btnSearch = this.container.querySelector("#findSearch");
    this.btnReset = this.container.querySelector("#findReset");
    this.btnReset.addEventListener("click", () => {
      this.hideField();
    });
  }

  hideField() {
    console.log(this.inputEl.value === true);
    if (this.inputEl.value) {
      this.inputEl.value = "";
      return;
    }
    this.fieldEl.style.top = "-10%";
    this.btnStart.style.visibility = "visible";
  }

  showField() {
    this.fieldEl.style.top = "2.5%";
    this.btnStart.style.visibility = "hidden";
  }
}
