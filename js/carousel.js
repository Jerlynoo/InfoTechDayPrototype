document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is working!');

    const track = document.getElementById("image-track");
    const images = document.querySelectorAll("#image-track .image");

    if (!track) {
        console.error("Element with id 'image-track' not found.");
        return;
    }

    // Calculate the track width based on the number of images
    const imageWidth = 40; // 40vmin (same as .image width)
    const gapWidth = 4; // 4vmin (same as .image gap)
    const numberOfImages = images.length;
    const trackWidth = (imageWidth * numberOfImages) + (gapWidth * (numberOfImages - 1));

    // Set the track width
    track.style.width = `${trackWidth}vmin`;

    let velocity = 0;
    let animationFrameId;

    // Mouse down only within the image track
    track.onmousedown = e => {
        track.dataset.mouseDownAt = e.clientX;
        cancelAnimationFrame(animationFrameId);
    }

    // Mouse up anywhere on the window to end dragging
    window.onmouseup = () => {
        if (track.dataset.mouseDownAt !== "0") {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage;

            // Apply momentum
            velocity = (e.clientX - parseFloat(track.dataset.mouseDownAt)) * 0.1; // Adjust momentum factor
            applyMomentum();
        }
    }

    // Mouse move anywhere on the window, but dragging only happens if mousedown was on the track
    window.onmousemove = e => {
        if (track.dataset.mouseDownAt === "0") return;

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
        const maxDelta = window.innerWidth / 2; // Adjust to control overall sensitivity

        const dragSpeed = 0.5; // Adjust this to control how fast the carousel moves
        let percentage = (mouseDelta * dragSpeed / maxDelta) * -100;
        let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

        // Clamp the nextPercentage between -100 and 0
        nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

        track.dataset.percentage = nextPercentage;

        const animationDuration = 20000 / dragSpeed; // Increase duration as drag speed decreases

        // Adjust the track animation speed
        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: animationDuration, fill: "forwards" });

        // Adjust the images animation speed
        for (const image of track.getElementsByClassName("image")) {
            image.animate({
                objectPosition: `${100 + nextPercentage}% center`
            }, { duration: animationDuration, fill: "forwards" });
        }
    }

    // Apply momentum to the track
    function applyMomentum() {
        if (Math.abs(velocity) > 0.1) {
            const deceleration = 0.9; // Adjust this to control how quickly the track slows down

            track.dataset.percentage = parseFloat(track.dataset.percentage) + velocity;
            velocity *= deceleration;

            track.animate({
                transform: `translate(${track.dataset.percentage}%, -50%)`
            }, { duration: 900, fill: "forwards" });

            // Adjust the images animation speed
            for (const image of track.getElementsByClassName("image")) {
                image.animate({
                    objectPosition: `${100 + track.dataset.percentage}% center`
                }, { duration: 900, fill: "forwards" });
            }

            animationFrameId = requestAnimationFrame(applyMomentum);
        } else {
            track.dataset.percentage = Math.max(Math.min(track.dataset.percentage, 0), -100);
        }
    }
});
