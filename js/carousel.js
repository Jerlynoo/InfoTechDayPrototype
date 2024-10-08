document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById("image-track");
    const images = document.querySelectorAll("#image-track .image");
    const carouselContainer = document.getElementById("carousel-container");

    if (!track) {
        return;
    }

    // Calculate the track width based on the number of images
    const imageWidth = 40; // 40vmin (same as .image width)
    const gapWidth = 4; // 4vmin (same as .image gap)
    const numberOfImages = images.length;
    const trackWidth = (imageWidth * numberOfImages) + (gapWidth * (numberOfImages - 1));

    // Set the track width
    track.style.width = `${trackWidth}vmin`;

    // Auto-scroll settings
    let autoScrollSpeed = 0.1; // Adjust speed here
    let currentScroll = 0; // Track current scroll percentage
    let autoScrollInterval = null;

    const startAutoScroll = () => {
        if (autoScrollInterval) return; // Prevent multiple intervals from being created
        autoScrollInterval = requestAnimationFrame(autoScroll); // Use requestAnimationFrame for smoother scroll
    };

    const stopAutoScroll = () => {
        cancelAnimationFrame(autoScrollInterval);
        autoScrollInterval = null;
    };

    const autoScroll = () => {
        if (isNaN(currentScroll)) {
            currentScroll = 0;
        }

        currentScroll -= autoScrollSpeed; // Decrease scroll value to move left

        // Reset when it reaches the end of the track
        if (currentScroll <= -100) {
            currentScroll = 0;
        }

        // Apply the scroll transformation
        track.style.transform = `translate(${currentScroll}%, -50%)`;

        // Adjust the images' object-position
        for (const image of images) {
            image.style.objectPosition = `${100 + currentScroll}% center`;
        }

        autoScrollInterval = requestAnimationFrame(autoScroll); // Continue auto-scroll smoothly
    };

    // Start auto-scroll initially
    startAutoScroll();

    // Manual scrolling
    let isDragging = false;
    let startX = 0;
    let startScroll = 0;

    const handleStart = (clientX) => {
        isDragging = true;
        startX = clientX;
        startScroll = currentScroll;
        stopAutoScroll(); // Stop auto-scroll when manually dragging
    };

    let velocity = 0; // Track the velocity for smooth movement

    const handleMove = (clientX) => {
        if (!isDragging) return;

        const deltaX = (clientX - startX) * -1; // Invert the direction
        const maxDelta = window.innerWidth / 2; // Adjust for sensitivity

        const dragSpeed = 0.9; // Control how fast the carousel moves
        let percentage = (deltaX * dragSpeed / maxDelta) * -100;
        let newScroll = startScroll + percentage;

        // Clamp the newScroll between -100 and 0
        newScroll = Math.max(Math.min(newScroll, 0), -100);

        // Calculate velocity for smooth transition
        velocity = newScroll - currentScroll;
        currentScroll += velocity * 0.1; // Adjust 0.1 to control smoothness

        // Apply the manual scroll transformation
        track.style.transform = `translate(${currentScroll}%, -50%)`;

        // Adjust the images' object-position
        for (const image of images) {
            image.style.objectPosition = `${100 + currentScroll}% center`;
        }
    };

    const handleEnd = () => {
        isDragging = false;

        // Restart auto-scroll immediately after ending manual scroll
        startAutoScroll(); // Restart auto-scroll
    };

    // Mouse events
    track.onmousedown = e => handleStart(e.clientX);
    window.onmouseup = handleEnd;
    window.onmousemove = e => handleMove(e.clientX);

    // Touch events
    track.ontouchstart = e => handleStart(e.touches[0].clientX);
    window.ontouchend = handleEnd;
    window.ontouchmove = e => handleMove(e.touches[0].clientX);

    // Stop auto-scroll when hovering over the carousel
    carouselContainer.addEventListener('mouseover', stopAutoScroll);

    // Resume auto-scroll when mouse leaves the carousel
    carouselContainer.addEventListener('mouseout', startAutoScroll);
});
