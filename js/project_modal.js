const buttons = document.querySelectorAll(".btn-view");
const modals = document.querySelectorAll(".modal");

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    modals[index].style.display = "block";
  });
});

window.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    modals.forEach((modal) => {
      modal.style.display = "none";
    });
  }
});

document.querySelectorAll(".close").forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const modal = closeButton.closest(".modal");
    modal.style.display = "none";
  });
});
