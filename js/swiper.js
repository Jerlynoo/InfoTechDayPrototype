var swiper = new Swiper(".swiper-container", {
  slidesPerView: 1, // Number of slides to show at once
  spaceBetween: 10, // Space between images
  loop: true, // Enable looping of slides
  autoplay: {
    delay: 10000, // 10 seconds between each slide
    disableOnInteraction: false, // Keeps autoplay running even after user interaction
  },
  speed: 20000, // Transition speed (1 second)
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
