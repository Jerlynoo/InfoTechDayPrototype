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

      // Add event listener for the search icon to toggle the search bar
      const searchIcon = document.getElementById("search-icon");
      const searchContainer = document.getElementById("search-container");
      searchIcon.addEventListener("click", () => {
        searchContainer.style.display =
          searchContainer.style.display === "none" ? "block" : "none";
        // Optionally, focus the search bar when it becomes visible
        if (searchContainer.style.display === "block") {
          document.getElementById("search-bar").focus();
        }
      });

      // Add event listener for the search bar
      const searchBar = document.getElementById("search-bar");
      searchBar.addEventListener("input", function () {
        const query = this.value.toLowerCase(); // Get the search input
        // Call renderProjects with the current filter and search query
        renderProjects(data, "*", query);
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
            <div class="page-preview">
              <div class="thumb">
                <img src="../project_images/${project.Title.toLowerCase().replace(
                  /\s/g,
                  "_"
                )}.jpg" class="img-responsive" alt="${project.Title}" />
                <div class="overlay-text"></div>
                <div class="overlay">
                  <a href="../project_pages/${project.Title.toLowerCase().replace(
                    /\s/g,
                    "_"
                  )}.html">View Page</a>
                </div>
                <!-- Caption -->
                <div class="caption">
                  <p>${project.Title}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    });
  }
});
