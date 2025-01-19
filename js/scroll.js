const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show/hide the button when scrolling
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Smooth scroll to the top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}