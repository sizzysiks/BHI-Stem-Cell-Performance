const body = document.querySelector("body");
const navBtn = document.querySelector(".nav-btn");
const closeBtn = document.querySelector(".x-icon");

navBtn.addEventListener("click", function () {
  body.classList.remove("hide-nav");
});

closeBtn.addEventListener("click", function () {
  body.classList.add("hide-nav");
});
