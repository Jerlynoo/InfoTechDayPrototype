console.log('csv.js file is loaded');

async function loadCSV() {
    try {
        const response = await fetch('csv/data.csv'); // Ensure CSV is located correctly
        const data = await response.text();

        const rows = data.split('\n'); // Split CSV by rows
        const headers = rows[0].split(',');  // Get headers (first row)
        const eventArray = [];

        rows.slice(1).forEach(row => {  // Skip header row
            const cols = row.split(',');
            if (cols.length === headers.length) {
                let event = {};
                headers.forEach((header, i) => {
                    event[header.trim()] = cols[i].trim();  // Create event object
                });
                eventArray.push(event);
            }
        });

        displayEventInfo(eventArray);  // Call correct function
        console.log(eventArray);

    } catch (error) {
        console.error('Error loading CSV:', error);
    }
}

function displayEventInfo(events) {
    const eventDisplay = document.getElementById('eventDisplay'); // Use correct ID

    console.log('Events:', events); // Debugging output to ensure function is called
    
    eventDisplay.innerHTML = '';  // Clear previous content
    
    events.forEach(event => {
        // Create event card with event name and quote
        const eventCard = document.createElement('header');
        eventCard.classList.add('event-card');
        eventCard.innerHTML = `<h1>${event.eventName}</h1><h2>${event.quote}</h2>`; // Adjust keys as per CSV headers
        
        eventDisplay.appendChild(eventCard); // Append to display area
    });
}

window.onload = loadCSV();
