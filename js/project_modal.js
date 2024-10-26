document.addEventListener("DOMContentLoaded", () => {
  // Fetch the project data from the JSON file
  fetch("../data/allProject.json") // Make sure the path is correct
    .then((response) => response.json())
    .then((data) => {
      // Render all projects initially
      renderProjects(data);
    })
    .catch((error) => console.error("Error loading projects:", error));

  // Function to render projects
  function renderProjects(data) {
    const tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = ""; // Clear existing projects

    // Loop through the data and create table rows
    data.forEach((project) => {
      const row = document.createElement("tr");

      // Create and append the cells for title, subject, and view button
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

      // Append the row to the table body
      tableBody.appendChild(row);

      // Create the modal for each project
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

  // Function to create a modal for each project
  function createModal(project) {
    const modalHTML = `
      <div id="modal-${project.Title.replace(
        /\s+/g,
        "-"
      ).toLowerCase()}" class="modal">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${project.Title}</h5>
              <button type="button" class="close" onclick="document.getElementById('modal-${project.Title.replace(
                /\s+/g,
                "-"
              ).toLowerCase()}').style.display='none'">&times;</button>
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

    // Append modal to the body
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }
});
