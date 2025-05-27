const events = [
  { name: "Community Meetup", date: "2025-06-15", seats: 5 },
  { name: "Past Event", date: "2024-12-01", seats: 10 },
  { name: "Full Event", date: "2025-07-20", seats: 0 },
  { name: "Tech Talk", date: "2025-06-30", seats: 15 }
];

const today = new Date();
const eventsDiv = document.getElementById('events');

// Display only upcoming events with available seats
function displayEvents() {
  eventsDiv.innerHTML = ""; // Clear existing content

  events.forEach(event => {
    const eventDate = new Date(event.date);
    if (eventDate > today && event.seats > 0) {
      const eventElem = document.createElement('div');
      eventElem.className = 'event';
      eventElem.innerHTML = `
        <strong>${event.name}</strong> on ${event.date} — Seats Available: ${event.seats}
        <button onclick="register('${event.name}')">Register</button>
        <span class="message" id="msg-${event.name.replace(/\s+/g, '')}"></span>
      `;
      eventsDiv.appendChild(eventElem);
    }
  });

  if (!eventsDiv.hasChildNodes()) {
    eventsDiv.textContent = "No upcoming events with available seats.";
  }
}

// Register function with error handling
function register(eventName) {
  try {
    const event = events.find(e => e.name === eventName);
    if (!event) throw new Error("Event not found");
    if (new Date(event.date) <= today) throw new Error("Cannot register for past events");
    if (event.seats <= 0) throw new Error("No seats available");

    event.seats--;

    // Update events display
    displayEvents();

    // Show success message
    alert(`Successfully registered for ${event.name}. Seats left: ${event.seats}`);
  } catch (error) {
    alert(`Registration error: ${error.message}`);
  }
}

// Initial load
displayEvents();
