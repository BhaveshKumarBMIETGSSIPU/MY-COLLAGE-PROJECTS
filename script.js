// You can add JavaScript code here to enhance the functionality of your Event Management System

// Example: Fetching upcoming events from a server
function fetchUpcomingEvents() {
    fetch('upcoming_events.php')
        .then(response => response.json())
        .then(data => {
            // Display the upcoming events on the webpage
            displayUpcomingEvents(data);
        })
        .catch(error => {
            console.error('Error fetching upcoming events:', error);
        });
}

// Example: Displaying upcoming events on the webpage
function displayUpcomingEvents(events) {
    const upcomingEventsSection = document.getElementById('upcoming-events');
    upcomingEventsSection.innerHTML = ''; // Clear previous content

    if (events.length === 0) {
        upcomingEventsSection.innerHTML = '<p>No upcoming events found.</p>';
    } else {
        const ul = document.createElement('ul');
        events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = event.name + ' - ' + event.date; // Adjust as per your event object structure
            ul.appendChild(li);
        });
        upcomingEventsSection.appendChild(ul);
    }
}

// Example: Handling form submission for creating a new event
const createEventForm = document.getElementById('create-event');
createEventForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(this);

    // Example: Sending form data to server using Fetch API
    fetch('create_event.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle response from server
        console.log('Event created successfully:', data);
        // Optionally, you can display a success message or update the UI
        // Reset the form after successful submission
        createEventForm.reset();
        // Fetch and display updated list of upcoming events
        fetchUpcomingEvents();
    })
    .catch(error => {
        console.error('Error creating event:', error);
        // Optionally, display an error message to the user
    });
});

// Fetch upcoming events when the page loads
window.addEventListener('load', function() {
    fetchUpcomingEvents();
});