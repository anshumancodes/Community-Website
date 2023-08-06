// toggle navar on mobile
const links = document.querySelector(".links");
const navToggle = document.querySelector("#nav-toggle");
console.log(navToggle);
console.log(links);

navToggle.addEventListener("click", () => {
  links.classList.toggle("active");
});
