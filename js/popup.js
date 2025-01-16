function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = "block";

    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            closePopup(popupId);
        }
    });
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = "none";
}

function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = "block";
    document.body.classList.add("modal-open"); // Disable background scrolling

    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            closePopup(popupId);
        }
    });
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = "none";
    document.body.classList.remove("modal-open"); // Re-enable background scrolling
}
