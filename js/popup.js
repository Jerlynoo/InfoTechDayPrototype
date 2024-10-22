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

function openModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('expandedImage');
    const img = document.querySelector('.tp-map-img');

    modal.style.display = "block";
    modalImg.src = img.src;

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}
