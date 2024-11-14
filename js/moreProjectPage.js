document.addEventListener("DOMContentLoaded", () => {
    let allProjects = []; // Store all projects for easy filtering
    let filteredProjects = []; // Store the filtered projects for rendering
    let currentPage = 1;
    let entriesPerPage = 10; // Default number of entries per page
  
    // Fetch and render projects
    fetch("../data/allProject.json")
      .then((response) => response.json())
      .then((data) => {
        allProjects = data; // Save the full project data
        filteredProjects = data; // Initially, all projects are displayed
        renderProjects();
        setupPagination();
        updateEntryCount();
      })
      .catch((error) => console.error("Error loading projects:", error));
  
    // Function to render projects based on current page and entriesPerPage
    function renderProjects() {
      const tableBody = document.querySelector("#table-body");
      tableBody.innerHTML = "";
  
      const start = (currentPage - 1) * entriesPerPage;
      const end = start + entriesPerPage;
      const paginatedProjects = filteredProjects.slice(start, end);
  
      paginatedProjects.forEach((project) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${project.Title}</td>
            <td>${project.Subject || "N/A"}</td>
            <td>
              <button class="minimalistic-button btn-view" data-modal-id="modal-${project.Title.replace(
                /\s+/g,
                "-"
              ).toLowerCase()}">View More</button>
            </td>
          `;
        tableBody.appendChild(row);
      });
  
      setupModalEvents();
      updateEntryCount(); // Update entry count after rendering
    }
  
    // Event listeners for search input
    document.getElementById("search_input_all").addEventListener("keyup", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      currentPage = 1; // Reset to first page on search
  
      filteredProjects = allProjects.filter(
        (project) =>
          project.Title.toLowerCase().includes(searchTerm) ||
          (project.Subject && project.Subject.toLowerCase().includes(searchTerm))
      );
  
      renderProjects();
      setupPagination();
      updateEntryCount(); // Update entry count after search
    });
  
    // Entries per page selector
    document.getElementById("entries_per_page").addEventListener("change", (e) => {
      entriesPerPage = parseInt(e.target.value);
      currentPage = 1; // Reset to first page on entries change
      renderProjects();
      setupPagination();
      updateEntryCount(); // Update entry count after change
    });
  
    // Setup pagination controls
    function setupPagination() {
      const paginationContainer = document.querySelector("#pagination");
      paginationContainer.innerHTML = "";
  
      const pageCount = Math.ceil(filteredProjects.length / entriesPerPage);
  
      for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("pagination-button");
  
        if (i === currentPage) pageButton.classList.add("active");
  
        pageButton.addEventListener("click", () => {
          currentPage = i;
          renderProjects();
          setupPagination();
        });
  
        paginationContainer.appendChild(pageButton);
      }
    }
  
    // Function to update the entry count display
    function updateEntryCount() {
      const entryCountDisplay = document.querySelector("#entry-count");
      if (entryCountDisplay) {
        const start = (currentPage - 1) * entriesPerPage + 1;
        const end = Math.min(start + entriesPerPage - 1, filteredProjects.length);
        entryCountDisplay.textContent = `Showing ${start}-${end} out of ${filteredProjects.length} entries`;
      }
    }
  });
  