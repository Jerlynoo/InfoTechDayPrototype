// Show Popup Function (unchanged)
function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = "block";

    // Add a click event listener on the window to detect clicks outside the popup content
    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            closePopup(popupId);
        }
    });
}

// Close Popup Function (unchanged)
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = "none";
}

// Open the Modal
function openModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('expandedImage');
    const img = document.querySelector('.tp-map-img');

    modal.style.display = "block";
    modalImg.src = img.src;

    // Add a click event listener on the window to detect clicks outside the modal content
    window.addEventListener('click', function (event) {
        // If the target of the click is the modal itself, close the modal
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Close the Modal
function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}
