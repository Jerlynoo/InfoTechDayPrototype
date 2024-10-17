document.addEventListener('DOMContentLoaded', () => {
    const targetDate = new Date('2024-01-23T15:00:00');
    const config = {
        transitionDuration: 3000,
        time: 0,
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds) || seconds < 0) return ['00', '00', '00', '00'];
        const days = Math.floor(seconds / 86400).toString().padStart(2, '0');
        const hours = Math.floor((seconds % 86400) / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return [days, hours, minutes, secs];
    };

    const updateCountdownDisplay = () => {
        const [days, hours, minutes, seconds] = formatTime(config.time);

        const timeGroupWithColon = (id, value, showColon = true) => {
            document.getElementById(id).innerHTML = value.split('').map(
                char => `<span class="digit">${char}</span>`
            ).join('') + (showColon ? '<span class="colon">:</span>' : '');
        };

        timeGroupWithColon('days', days);
        timeGroupWithColon('hours', hours);
        timeGroupWithColon('minutes', minutes);
        timeGroupWithColon('seconds', seconds, false);
    };

    const displayWelcomeMessage = () => {
        const prizeText = document.getElementById('prize-text');
        prizeText.innerHTML = '<div class="welcome-message">WELCOME TO TP INFOTECH DAY 2025</div>';
        prizeText.style.fontSize = '6rem'; 
        prizeText.style.lineHeight = '7rem';

        const prizeLabel = document.getElementById('prize-label');
        prizeLabel.innerHTML = '';

        const registrationButtons = document.querySelector('.registration-buttons');
        registrationButtons.style.display = 'none';
    };

    const startCountdown = () => {
        const now = new Date();
        const timeRemaining = Math.max(0, Math.floor((targetDate - now) / 1000));
        config.time = timeRemaining;

        if (timeRemaining > 0) {
            updateCountdownDisplay();
            setTimeout(startCountdown, 1000);
        } else {
            displayWelcomeMessage();
        }
    };

    window.onload = () => {
        const now = new Date();
        const timeRemaining = Math.max(0, Math.floor((targetDate - now) / 1000));
        config.time = timeRemaining;

        if (timeRemaining > 0) {
            updateCountdownDisplay();
            startCountdown();
        } else {
            displayWelcomeMessage();
        }

        const handleRedo = () => {
            location.reload();
            console.log('Page reloaded');
        };

        window.handleRedo = handleRedo;
    };
});