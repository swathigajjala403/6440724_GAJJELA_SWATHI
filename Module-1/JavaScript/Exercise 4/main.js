const events = [];

// Closure to track total registrations per category
function createRegistrationTracker() {
  const registrations = {};
  return {
    register: function(category) {
      registrations[category] = (registrations[category] || 0) + 1;
      return registrations[category];
    },
    getTotalRegistrations: function(category) {
      return registrations[category] || 0;
    }
  };
}

const tracker = createRegistrationTracker();
const today = new Date();
const eventsDiv = document.getElementById('events');
const messageDiv = document.getElementById('message');

function addEvent(name, date, seats, category) {
  events.push({ name, date, seats, category });
}

// Higher-order filter function
function filterEventsByCategory(callback) {
  return events.filter(callback);
}

function displayEvents(filteredEvents) {
  eventsDiv.innerHTML = '';

  if (filteredEvents.length === 0) {
    eventsDiv.textContent = "No upcoming events available.";
    return;
  }

  filteredEvents.forEach(event => {
    const eventDate = new Date(event.date);
    if (eventDate > today && event.seats > 0) {
      const div = document.createElement('div');
      div.className = 'event';
      div.innerHTML = `
        <strong>${event.name}</strong> (${event.category}) - ${event.date} — Seats: ${event.seats}
        <button onclick="registerUser('${event.name}')">Register</button>
      `;
      eventsDiv.appendChild(div);
    }
  });
}

function registerUser(eventName) {
  try {
    const event = events.find(e => e.name === eventName);
    if (!event) throw new Error("Event not found");
    if (new Date(event.date) <= today) throw new Error("Cannot register for past events");
    if (event.seats <= 0) throw new Error("No seats available");

    event.seats--;
    const totalRegs = tracker.register(event.category);
    messageDiv.textContent = `Registered for "${event.name}" in category "${event.category}". Total registrations in this category: ${totalRegs}`;
    messageDiv.className = 'message';

    handleFilter();  // Refresh list display

  } catch (error) {
    messageDiv.textContent = `Error: ${error.message}`;
    messageDiv.className = 'message error';
  }
}

function handleAddEvent() {
  const name = document.getElementById('eventName').value.trim();
  const date = document.getElementById('eventDate').value;
  const seats = parseInt(document.getElementById('eventSeats').value, 10);
  const category = document.getElementById('eventCategory').value;

  if (!name || !date || !seats || seats <= 0) {
    messageDiv.textContent = "Please enter valid event details.";
    messageDiv.className = 'message error';
    return;
  }

  addEvent(name, date, seats, category);
  messageDiv.textContent = `Event "${name}" added successfully!`;
  messageDiv.className = 'message';

  // Clear input fields
  document.getElementById('eventName').value = '';
  document.getElementById('eventDate').value = '';
  document.getElementById('eventSeats').value = '';
  document.getElementById('eventCategory').value = 'Social';

  handleFilter();
}

function handleFilter() {
  const selectedCategory = document.getElementById('filterCategory').value;
  let filtered;

  if (selectedCategory === '') {
    // Show all upcoming with seats
    filtered = events.filter(event => new Date(event.date) > today && event.seats > 0);
  } else {
    // Use the higher-order function with callback
    filtered = filterEventsByCategory(event => event.category === selectedCategory && new Date(event.date) > today && event.seats > 0);
  }

  displayEvents(filtered);
}

// Initial call to display empty state
handleFilter();
