document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById("image-track");
    const images = document.querySelectorAll("#image-track .image");
    const carouselContainer = document.getElementById("carousel-container");

    if (!track) {
        return;
    }

    const cards = [...document.querySelectorAll("#image-track .polaroid")];

    // Duplicate the entire content for seamless scrolling
    const duplicateCards = cards.map(card => card.cloneNode(true));
    duplicateCards.forEach(duplicate => track.appendChild(duplicate));

    // Calculate the track width based on the number of cards (original + duplicate)
    const cardWidth = 40; 
    const gapWidth = 4; 
    const numberOfCards = cards.length * 2; // Original + duplicate
    const trackWidth = (cardWidth * numberOfCards) + (gapWidth * (numberOfCards - 1));

    // Set the track width
    track.style.width = `${trackWidth}vmin`;

    // Auto-scroll settings
    let autoScrollSpeed = 0.03; // Adjust speed here
    let currentScroll = 0;
    let autoScrollInterval = null;

    const autoScroll = () => {
        currentScroll -= autoScrollSpeed;

        // Reset seamlessly to the start of the duplicated content
        if (currentScroll <= -50) { // When halfway through (half of the original content)
            currentScroll = 0; // Reset scroll position to the start of the original set
        }

        // Apply the scroll transformation
        track.style.transform = `translate(${currentScroll}%, -50%)`;

        // Adjust the images' object-position dynamically
        for (const image of images) {
            image.style.objectPosition = `${100 + currentScroll}% center`;
        }

        // Store the animation frame ID in the variable
        autoScrollInterval = requestAnimationFrame(autoScroll);
    };

    const startAutoScroll = () => {
        if (autoScrollInterval) return; // Prevent multiple intervals from being created
        autoScrollInterval = requestAnimationFrame(autoScroll); // Start scrolling
    };

    const stopAutoScroll = () => {
        cancelAnimationFrame(autoScrollInterval); // Stop the animation
        autoScrollInterval = null; // Clear the variable
    };

    // Start auto-scroll initially
    startAutoScroll();

    // Stop auto-scroll when hovering over the carousel
    carouselContainer.addEventListener('mouseover', stopAutoScroll);

    // Resume auto-scroll when mouse leaves the carousel
    carouselContainer.addEventListener('mouseout', startAutoScroll);
});