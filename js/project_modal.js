document.addEventListener("DOMContentLoaded", () => {
  let allProjects = []; // Store all projects for easy filtering

  fetch("../data/allProject.json")
    .then((response) => response.json())
    .then((data) => {
      allProjects = data; // Save the full project data
      renderProjects(allProjects);
    })
    .catch((error) => console.error("Error loading projects:", error));

  // Function to render projects
  function renderProjects(data) {
    const tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = "";

    data.forEach((project) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${project.Title}</td>
        <td>${project.Subject || "N/A"}</td>
        <td>
          <button class="minimalistic-button btn-view" data-modal-id="modal-${project.Title.replace(/\s+/g, "-").toLowerCase()}">View More</button>
        </td>
      `;
      tableBody.appendChild(row);
      createModal(project);
    });

    // Event listeners for the view buttons
    const buttons = document.querySelectorAll(".btn-view");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal-id");
        const modal = document.querySelector(`#${modalId}`);
        if (modal) {
          modal.style.display = "block";
        }
      });
    });
  }

  function createModal(project) {
    const modalHTML = `
      <div id="modal-${project.Title.replace(/\s+/g, "-").toLowerCase()}" class="modal">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${project.Title}</h5>
              <button type="button" class="close" onclick="document.getElementById('modal-${project.Title.replace(/\s+/g, "-").toLowerCase()}').style.display='none'">&times;</button>
            </div>
            <div class="modal-body">
              <p><b>Description:</b><br />${project.Description}</p>
              <p><b>Students:</b><br />${project.Student}</p>
              <p><b>Supervisor:</b><br />${project.Supervisor}</p>
              <p><b>Industrial Partner:</b><br />${project.Industrial_Partner || "N.A"}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  // Search function
  document.getElementById("search_input_all").addEventListener("keyup", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProjects = allProjects.filter((project) =>
      project.Title.toLowerCase().includes(searchTerm) ||
      (project.Subject && project.Subject.toLowerCase().includes(searchTerm))
    );

    renderProjects(filteredProjects);
  });
});
