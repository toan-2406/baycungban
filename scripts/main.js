const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const menuToggleEl = $(".toggle-menu");
const menuEL = $(".menu");

menuToggleEl.addEventListener("click", (e) => {
  e.stopPropagation();
  menuEL.classList.toggle("active");
  document.body.style.overflow ="hidden"
});

//When click elm outside auto unmount
document.body.addEventListener("click", () => {
  menuEL.classList.remove("active");
  document.body.style.overflow="scroll"
});
