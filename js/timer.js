document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is working!');
    
    const MINIMUM_ADDITIONAL_ITERATION_COUNT = 2;

    // Define the target date and time
    const targetDate = Date('2025-01-23T15:00:00');

    const config = {
        additionalIterationCount: Math.max(MINIMUM_ADDITIONAL_ITERATION_COUNT, 3),
        transitionDuration: 3000,
        digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        time: 0  // Initialize with 0
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds) || seconds < 0) return '000:00:00:00'; // Handle invalid values

        const days = Math.floor(seconds / 86400).toString().padStart(2, '0');
        const hours = Math.floor((seconds % 86400) / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${days}:${hours}:${minutes}:${secs}`;
    };

    const getPrizeText = () => document.getElementById("prize-text"),
        getTracks = () => document.querySelectorAll(".digit > .digit-track");

    const getFormattedTime = () => formatTime(config.time),
        getTimeDigitByIndex = index => parseInt(getFormattedTime().replace(/:/g, '').charAt(index)) || 0,
        determineIterations = index => index + config.additionalIterationCount;

    const createElement = (type, className, text) => {
        const element = document.createElement(type);
        element.className = className;
        if (text !== undefined) element.innerText = text;
        return element;
    };

    const createCharacter = character => createElement("span", "character", character);

    const createDigit = (digit, trackIndex) => {
        const digitElement = createElement("span", "digit"),
            trackElement = createElement("span", "digit-track");

        let digits = [],
            iterations = determineIterations(trackIndex);

        for (let i = 0; i < iterations; i++) {
            digits = [...digits, ...config.digits];
        }

        trackElement.innerText = digits.join(" ");

        trackElement.style.transitionDuration = `${config.transitionDuration}ms`;

        digitElement.appendChild(trackElement);

        return digitElement;
    };

    const setup = () => {
        let index = 0;

        const prizeText = getPrizeText();

        for (const character of getFormattedTime()) {
            const element = isNaN(character)
                ? createCharacter(character) : createDigit(character, index++);

            prizeText.appendChild(element);
        }
    };

    const animate = () => {
        getTracks().forEach((track, index) => {
            const digit = getTimeDigitByIndex(index),
                iterations = determineIterations(index),
                activeDigit = ((iterations - 1) * 10) + digit;

            track.style.translate = `0rem ${activeDigit * -10}rem`;
        });
    };

    const resetTrackPosition = track => {
        track.style.transitionDuration = "0ms";
        track.style.translate = "0rem 0rem";
        track.offsetHeight;
        track.style.transitionDuration = `${config.transitionDuration}ms`;
    };

    const resetAnimation = () => {
        for (const track of getTracks()) resetTrackPosition(track);
    };

    const startCountdown = () => {
        const now = new Date();
        const timeRemaining = Math.max(0, Math.floor((targetDate - now) / 1000));

        config.time = timeRemaining; // Update config.time with the calculated remaining time
        resetAnimation();
        animate();

        if (timeRemaining > 0) {
            setTimeout(startCountdown, 1000); // Update countdown every second
        } else {
            // Handle countdown completion if needed
            console.log('Countdown completed');
        }
    };

    window.onload = () => {
        setup();
        startCountdown();

        const handleRedo = () => {
            // Reset the countdown and start again
            const now = new Date();
            const timeRemaining = Math.max(0, Math.floor((targetDate - now) / 1000));
            
            config.time = timeRemaining; // Reset time to the remaining time
            resetAnimation();
            animate();
            
            console.log('Countdown restarted');
        };
        
        // Ensure handleRedo is available globally by attaching it to the window object
        window.handleRedo = handleRedo;
    };
});