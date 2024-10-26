document.addEventListener("DOMContentLoaded", () => {
  fetch('../data/project.json')
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector('.isotope-content .row');
      data.forEach(project => {
        const projectClass = project.Subject.toLowerCase().replace(/\s/g, '-');
        container.innerHTML += `
          <div class="item col-md-3 col-sm-6 col-xs-12 ${projectClass}" style="position: relative;">
            <div class="page-preview">
              <div class="thumb">
                <img src="../project_images/${project.Title.toLowerCase().replace(/\s/g, '_')}.jpg" class="img-responsive" alt="${project.Title}" />
                <div class="overlay-text"></div>
                <div class="overlay">
                  <a href="../project_pages/${project.Title.toLowerCase().replace(/\s/g, '_')}.html">View Page</a>
                </div>
                <!-- Caption -->
                <div class="caption">
                  <p>${project.Title}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(error => console.error('Error loading projects:', error));
});