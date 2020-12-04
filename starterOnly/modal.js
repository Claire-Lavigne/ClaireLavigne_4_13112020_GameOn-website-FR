// DOM Elements
const modal = document.querySelector(".bground");
const modalOpen = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");


function editNav() {
  var topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}

function launchModal() {
  modal.style.display = "block";
}
modalOpen.forEach((btn) => btn.addEventListener("click", launchModal));

function closeModal() {
  modal.style.display = "none";
}
modalClose.addEventListener("click", closeModal);

