document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById("image-track");
    const images = document.querySelectorAll("#image-track .image");
    const carouselContainer = document.getElementById("carousel-container");

    if (!track) {
        return;
    }

    // Calculate the track width based on the number of images
    const imageWidth = 40; 
    const gapWidth = 4; 
    const numberOfImages = images.length;
    const trackWidth = (imageWidth * numberOfImages) + (gapWidth * (numberOfImages - 1));

    // Set the track width
    track.style.width = `${trackWidth}vmin`;

    // Auto-scroll settings
    let autoScrollSpeed = 0.03; // Adjust speed here
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
        currentScroll -= autoScrollSpeed; // Move left

        // When the scroll reaches the end, reset seamlessly
        if (currentScroll <= -100) {
            currentScroll += 100; // Shift the scroll position back seamlessly
        }

        // Apply the scroll transformation
        track.style.transform = `translate(${currentScroll}%, -50%)`;

        // Adjust the images' object-position dynamically
        for (const image of images) {
            image.style.objectPosition = `${100 + currentScroll}% center`;
        }

        // Continue auto-scrolling smoothly
        autoScrollInterval = requestAnimationFrame(autoScroll);
    };

    // Start auto-scroll initially
    startAutoScroll();

    const handleEnd = () => {
        isDragging = false;

        // Reset velocity and ensure alignment
        velocity = 0;
        currentScroll = Math.round(currentScroll / -100) * -100; // Snap to 0 or -100
        track.style.transform = `translate(${currentScroll}%, -50%)`;

        // Restart auto-scroll
        startAutoScroll();
    };

    // Mouse events
    track.onmousedown = e => handleStart(e.clientX);
    window.onmouseup = handleEnd;

    // Touch events
    track.ontouchstart = e => handleStart(e.touches[0].clientX);
    window.ontouchend = handleEnd;
    window.ontouchmove = e => handleMove(e.touches[0].clientX);

    // Stop auto-scroll when hovering over the carousel
    carouselContainer.addEventListener('mouseover', stopAutoScroll);

    // Resume auto-scroll when mouse leaves the carousel
    carouselContainer.addEventListener('mouseout', startAutoScroll);
});
