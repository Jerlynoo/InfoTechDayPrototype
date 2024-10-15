const toggler = document.querySelector(".menu__toggler");
const menu = document.querySelector(".menu");

// Toggles on and off the 'active' class on the menu and the toggler button.
toggler.addEventListener("click", (event) => {
  toggler.classList.toggle("active");
  menu.classList.toggle("active");
  event.stopPropagation(); // Prevents the click from triggering the document listener.
});

// Closes the menu when clicking outside of it.
document.addEventListener("click", (event) => {
  const isClickInsideMenu = menu.contains(event.target);
  const isClickOnToggler = toggler.contains(event.target);

  if (!isClickInsideMenu && !isClickOnToggler) {
    toggler.classList.remove("active");
    menu.classList.remove("active");
  }
});
