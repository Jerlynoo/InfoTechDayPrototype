document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    // Remove the opening sequence after it fades out
    const openingSequence = document.getElementById("opening-sequence");
    openingSequence.style.display = "none";
  }, 9000); // The total duration for fade-in and fade-out
});
