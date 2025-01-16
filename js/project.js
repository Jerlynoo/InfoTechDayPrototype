document.addEventListener("DOMContentLoaded", () => {
  // Fetch the project data from the JSON file
  fetch("../data/project.json")
    .then((response) => response.json())
    .then((data) => {
      // Render all projects initially
      renderProjects(data);

      // Add click event listeners to filter buttons
      const filterButtons = document.querySelectorAll(
        ".isotope-nav .nav-item:not(#search-icon)"
      );
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Get the filter from the data-filter attribute
          const filterValue = button.getAttribute("data-filter");
          // Call renderProjects with the selected filter
          renderProjects(data, filterValue);
          // Update active class
          filterButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
        });
      });
    })
    .catch((error) => console.error("Error loading projects:", error));

  // Function to render projects based on the selected filter
  function renderProjects(data, filter = "*", query = "") {
    const container = document.querySelector(".isotope-content .row");
    container.innerHTML = ""; // Clear existing projects

    // Filter and render projects
    data.forEach((project) => {
      const projectClass = project.Filter.toLowerCase().replace(/\s/g, "-");
      const isMatch = project.Title.toLowerCase().includes(query); // Check if the title includes the search query
      if (
        (filter === "*" || filter === `.${projectClass}`) &&
        (query === "" || isMatch)
      ) {
        container.innerHTML += `
          <div class="item col-md-3 col-sm-6 col-xs-12 ${projectClass}" style="position: relative;">
      <!-- <a href="../project_pages/${project.Page.toLowerCase().replace(/\s/g,"_")}.html" style="display: block; text-decoration: none; color: inherit;"> -->
            <a href="#" style="display: block; text-decoration: none; color: inherit;">
              <div class="page-preview">
                <div class="thumb">
                  <img src="../project_images/${project.Page.toLowerCase().replace(
                    /\s/g,
                    "_"
                  )}.jpg" class="img-responsive" alt="${project.Title}" />
                  <div class="overlay-text"></div>
                  <div class="overlay">
                    <span></span>
                  </div>
                  <!-- Caption -->
                  <div class="caption">
                    <p>${project.Title}</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `;
      }
    });
  }
});
