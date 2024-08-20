document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is working!');

    const track = document.getElementById("image-track");

    if (!track) {
        console.error("Element with id 'image-track' not found.");
        return;
    }

    // Mouse down only within the image track
    track.onmousedown = e => {
        track.dataset.mouseDownAt = e.clientX;
    }

    // Mouse up anywhere on the window to end dragging
    window.onmouseup = () => {
        if (track.dataset.mouseDownAt !== "0") {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage;
        }
    }

    // Mouse move anywhere on the window, but dragging only happens if mousedown was on the track
    window.onmousemove = e => {
        if (track.dataset.mouseDownAt === "0") return;

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2; // Adjust to control overall sensitivity

        const dragSpeed = 0.5; // Adjust this to control how fast the carousel moves
        let percentage = (mouseDelta * dragSpeed / maxDelta) * -100,
            nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

        // Clamp the nextPercentage between -100 and 0
        nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

        track.dataset.percentage = nextPercentage;

        const animationDuration = 1200 / dragSpeed; // Increase duration as drag speed decreases

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
});
