window.addEventListener("load", function () {
  const menuHTML = `
    <div class="menu">
      <p class="navbarP"><a class="navbarA" href="../index.html">Home</a></p>
      <p class="navbarP"><a class="navbarA" href="../pages/project.html">Projects</a></p>
      <p class="navbarP"><a class="navbarA" href="../pages/seminar.html">Seminar</a></p>
      <p class="navbarP"><a class="navbarA" href="https://forms.office.com/r/CwyyHHLfag" target="_blank">Project Voting</a></p>
      <p class="navbarP"><a class="navbarA" href="../pages/direction.html">Getting to TP</a></p>
      <p class="navbarP"><a class="navbarA" href="https://www.tp.edu.sg/schools-and-courses/students/all-diploma-courses.html" id="iit-courses-link">IIT Courses</a></p>
      <p class="navbarP"><a class="navbarA" href="https://www.tp.edu.sg/research-and-industry/centres-of-excellence/centres-under-school-of-informatics-it.html">Centers of Excellence</a></p>
    </div>
    <div class="menu__toggler"><span></span></div>
  `;
  document.body.insertAdjacentHTML("afterbegin", menuHTML);

  // Select the newly added toggler and menu elements
  const toggler = document.querySelector(".menu__toggler");
  const menu = document.querySelector(".menu");

  // Toggle the 'active' class on the menu and toggler button
  toggler.addEventListener("click", (event) => {
    toggler.classList.toggle("active");
    menu.classList.toggle("active");
    event.stopPropagation(); // Prevents the click from triggering the document listener.
  });

  // Close the menu when clicking outside of it
  document.addEventListener("click", (event) => {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnToggler = toggler.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggler) {
      toggler.classList.remove("active");
      menu.classList.remove("active");
    }
  });
});
