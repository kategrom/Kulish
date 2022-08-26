const button = document.querySelector(".button-order");
const buttonClose = document.querySelector(".popup-close");
const submitClose = document.querySelector(".button")
const popup = document.querySelector(".popup");

function togglePopup() {
    popup.classList.toggle("popup-active");
}

button.addEventListener("click", togglePopup);
buttonClose.addEventListener("click", togglePopup);
// submitClose.addEventListener("click", togglePopup);