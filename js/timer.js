document.addEventListener('DOMContentLoaded', () => {
    const targetDate = new Date('2025-01-23T15:00:00');
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

        // Function to create a time display with a colon between each digit group
        const timeGroupWithColon = (id, value, showColon = true) => {
            document.getElementById(id).innerHTML = value.split('').map(
                char => `<span class="digit">${char}</span>`
            ).join('') + (showColon ? '<span class="colon">:</span>' : '');
        };

        timeGroupWithColon('days', days);
        timeGroupWithColon('hours', hours);
        timeGroupWithColon('minutes', minutes);
        timeGroupWithColon('seconds', seconds, false); // No colon after the seconds
    };

    const startCountdown = () => {
        const now = new Date();
        const timeRemaining = Math.max(0, Math.floor((targetDate - now) / 1000));
        config.time = timeRemaining;

        updateCountdownDisplay();

        if (timeRemaining > 0) {
            setTimeout(startCountdown, 1000);
        } else {
            console.log('Countdown completed');
        }
    };

    window.onload = () => {
        const now = new Date();
        const timeRemaining = Math.max(0, Math.floor((targetDate - now) / 1000));
        config.time = timeRemaining;

        updateCountdownDisplay();
        startCountdown();

        const handleRedo = () => {
            location.reload();
            console.log('Page reloaded');
        };

        window.handleRedo = handleRedo;
    };
});