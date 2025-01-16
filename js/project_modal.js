document.addEventListener("DOMContentLoaded", () => {
  let allProjects = []; // Store all projects for easy filtering
  let filteredProjects = []; // Store the filtered projects for rendering
  let currentPage = 1;
  let entriesPerPage = 10; // Default number of entries per page
  let selectedSubjects = []; // Store selected subjects for filtering

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

  // Event listener for maxRows <select> element
  document.getElementById("maxRows").addEventListener("change", (e) => {
    entriesPerPage = parseInt(e.target.value);
    currentPage = 1; // Reset to first page on entries change
    renderProjects();
    setupPagination();
    updateEntryCount(); // Update entry count after change
  });

  // Event listener for manual row input
  document.getElementById("manualRowInput").addEventListener("input", (e) => {
    const input = parseInt(e.target.value);
    if (!isNaN(input) && input > 0) {
      entriesPerPage = input;
      currentPage = 1; // Reset to first page
      renderProjects();
      setupPagination();
      updateEntryCount();
    }
  });

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
      createModal(project); // Create modal for each project
    });

    setupModalEvents(); // Setup modal events for newly added buttons
    updateEntryCount(); // Update entry count after rendering
  }

  // Function to create modals for each project
  function createModal(project) {
    const modalId = `modal-${project.Title.replace(/\s+/g, "-").toLowerCase()}`;
    const modalHTML = `
      <div id="${modalId}" class="modal">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">  
              <h5 class="modal-title">${project.Title}</h5>
              <button type="button" class="close" data-close="true">&times;</button>
            </div>
            <div class="modal-body">
              <p><b>Description:</b><br />${project.Description}</p>
              <p><b>Students:</b><br />${project.Student}</p>
              <p><b>Supervisor:</b><br />${project.Supervisor}</p>
              <p><b>Industrial Partner:</b><br />${
                project.Industrial_Partner || "N.A"
              }</p>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modal = document.getElementById(modalId);

    // Event listener for the close button
    modal.querySelector(".close").addEventListener("click", () => {
      closeModal(modalId);
    });

    // Event listener for clicking outside modal dialog
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modalId);
      }
    });
  }

  // Function to open the modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
    }
  }

  // Function to close the modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

  // Event listeners for modal view buttons
  function setupModalEvents() {
    const buttons = document.querySelectorAll(".btn-view");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal-id");
        // console.log(`Modal ID: ${modalId}`); // Debugging
        const modal = document.querySelector(`#${CSS.escape(modalId)}`);
        if (modal) {
          modal.style.display = "block"; // Show the modal when clicked
        } else {
          console.error(`Modal with ID ${modalId} not found.`);
        }
      });
    });
  }

  // Setup pagination controls
  function setupPagination() {
    const paginationContainer = document.querySelector("#pagination");
    paginationContainer.innerHTML = "";

    const pageCount = Math.ceil(filteredProjects.length / entriesPerPage);

    for (let i = 1; i <= pageCount; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.add("page-link");

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

  // Search function
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
    updateEntryCount();
  });

  // Toggle filter panel visibility
  document.getElementById("filter-icon").addEventListener("click", () => {
    const filterPanel = document.getElementById("filter-panel");
    filterPanel.style.display =
      filterPanel.style.display === "block" ? "none" : "block";
  });

  // Handle subject filtering
  document.querySelectorAll(".subject-filter").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const subject = e.target.value;
      if (e.target.checked) {
        selectedSubjects.push(subject);
      } else {
        selectedSubjects = selectedSubjects.filter((s) => s !== subject);
      }
      filterProjectsBySubjects();
    });
  });

  // Filter projects by subjects
  function filterProjectsBySubjects() {
    if (selectedSubjects.length > 0) {
      filteredProjects = allProjects.filter((project) =>
        selectedSubjects.includes(project.Subject)
      );
    } else {
      filteredProjects = allProjects; // Reset to all projects
    }
    renderProjects();
    setupPagination();
    updateEntryCount();
  }
});
