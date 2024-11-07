document.addEventListener("DOMContentLoaded", () => {
  const targetDate = new Date("2025-01-23T15:00:00");
  const eventEndDate = new Date("2025-01-24T00:00:00"); // After midnight, event is over
  const config = {
    transitionDuration: 3000,
    time: 0,
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return ["00", "00", "00", "00"];
    const days = Math.floor(seconds / 86400)
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((seconds % 86400) / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return [days, hours, minutes, secs];
  };

  const updateCountdownDisplay = () => {
    const [days, hours, minutes, seconds] = formatTime(config.time);

    const timeGroupWithColon = (id, value, showColon = true) => {
      document.getElementById(id).innerHTML =
        value
          .split("")
          .map((char) => `<span class="digit">${char}</span>`)
          .join("") + (showColon ? '<span class="colon">:</span>' : "");
    };

    timeGroupWithColon("days", days);
    timeGroupWithColon("hours", hours);
    timeGroupWithColon("minutes", minutes);
    timeGroupWithColon("seconds", seconds, false);
  };

  const displayMessage = (message, fontSize = "6rem", lineHeight = "7rem") => {
    const prizeText = document.getElementById("prize-text");
    prizeText.innerHTML = `<div class="welcome-message">${message}</div>`;
    prizeText.style.fontSize = fontSize;
    prizeText.style.lineHeight = lineHeight;

    const prizeLabel = document.getElementById("prize-label");
    prizeLabel.innerHTML = "";

    const registrationButtons = document.querySelector(".registration-buttons");
    if (registrationButtons) {
      registrationButtons.style.display = "none";
    }
  };

  const checkEventStatus = () => {
    const now = new Date();
    const timeRemaining = Math.max(0, Math.floor((targetDate - now) / 1000));
    config.time = timeRemaining;

    if (timeRemaining > 0) {
      updateCountdownDisplay();
    } else if (now >= targetDate && now < eventEndDate) {
      // Show Welcome message on the day of the event
      displayMessage("WELCOME TO TP INFOTECH DAY 2025");
    } else if (now >= eventEndDate) {
      // After the event is over (24th Jan onwards)
      displayMessage("THANK YOU!<br>The Event is Over :)", "5rem", "6rem");
      clearInterval(intervalId); // Stop checking after the thank-you message
    }
  };

  // Set an interval to check every second
  const intervalId = setInterval(checkEventStatus, 1000);

  // Initial check to update the display immediately on page load
  checkEventStatus();
});
