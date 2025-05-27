// Event class definition
class Event {
  constructor(name, date, seats, category) {
    this.name = name;
    this.date = date;
    this.seats = seats;
    this.category = category;
  }

  checkAvailability() {
    const eventDate = new Date(this.date);
    const today = new Date();
    return this.seats > 0 && eventDate > today;
  }

  listDetails() {
    return Object.entries(this).map(([key, val]) => `${key}: ${val}`);
  }
}

// Example event instance
const myEvent = new Event("Tech Conference", "2025-08-01", 100, "Technology");

// Elements
const showEventBtn = document.getElementById('showEventBtn');
const eventDetailsDiv = document.getElementById('eventDetails');
const eventNameEl = document.getElementById('eventName');
const eventCategoryEl = document.getElementById('eventCategory');
const eventDateEl = document.getElementById('eventDate');
const eventSeatsEl = document.getElementById('eventSeats');
const availabilityEl = document.getElementById('availability');
const propsListEl = document.getElementById('propsList');

// Show event info on button click
showEventBtn.addEventListener('click', () => {
  eventDetailsDiv.style.display = 'block';

  eventNameEl.textContent = myEvent.name;
  eventCategoryEl.textContent = myEvent.category;
  eventDateEl.textContent = myEvent.date;
  eventSeatsEl.textContent = myEvent.seats;

  const available = myEvent.checkAvailability();
  availabilityEl.textContent = available ? "Seats Available - Register Now!" : "Event Full or Past Date";
  availabilityEl.className = available ? "availability" : "availability unavailable";

  // List all keys and values
  propsListEl.innerHTML = ''; // clear old list
  myEvent.listDetails().forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    propsListEl.appendChild(li);
  });
});
