class Details {
  constructor(elem = ".accordion") {
    this.elem = document.querySelector(elem);
    console.log(this.elem);
    this.elem.addEventListener("click", (e) => {
      this.clickAction(e);
    });
  }

  clickAction(e) {
    console.log(e.target);
    const targetEl = e.target.closest(".accordion__details");
    console.log(targetEl);
    let textEl = targetEl.querySelector(".accordion__box-text");
    console.log(textEl);
    targetEl.classList.toggle("accordion--active");
    textEl.classList.toggle("accordion__hidden");
    textEl.style.height = textEl.scrollHeight + "px";
    targetEl.querySelector(".accordion__box-title svg").webkitTransform +=
      "rotateX(45deg)";
  }
}
