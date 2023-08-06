// toggle navar on mobile
let links = document.querySelector(".links");
let navToggle = document.querySelector("#nav-toggle");
console.log(navToggle);
console.log(links);

navToggle.addEventListener("click",()=>{
links.classList.toggle("active");
});
  