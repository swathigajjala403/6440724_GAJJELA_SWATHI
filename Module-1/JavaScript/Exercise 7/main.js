// Sample array of events
const events = [
  { id: 1, name: "Music Concert", date: "2025-09-01", seats: 5 },
  { id: 2, name: "Art Workshop", date: "2025-07-20", seats: 0 },
  { id: 3, name: "Tech Meetup", date: "2025-08-15", seats: 10 },
];

// Access container div using querySelector
const eventsContainer = document.querySelector('#eventsContainer');

// Function to create and append event cards dynamically
function renderEvents() {
  eventsContainer.innerHTML = ''; // Clear previous content

  events.forEach(event => {
    // Create card div
    const card = document.createElement('div');
    card.className = 'event-card';

    // Event name
    const nameEl = document.createElement('div');
    nameEl.className = 'event-name';
    nameEl.textContent = event.name;

    // Event date and seats info
    const infoEl = document.createElement('div');
    infoEl.className = 'event-info';
    infoEl.textContent = `Date: ${event.date} | Seats available: ${event.seats}`;

    // Register button
    const registerBtn = document.createElement('button');
    registerBtn.textContent = 'Register';
    registerBtn.disabled = event.seats === 0;

    // On click, reduce seats and update UI
    registerBtn.addEventListener('click', () => {
      if (event.seats > 0) {
        event.seats--;
        infoEl.textContent = `Date: ${event.date} | Seats available: ${event.seats}`;
        if (event.seats === 0) {
          registerBtn.disabled = true;
        }
      }
    });

    // Append elements to card
    card.appendChild(nameEl);
    card.appendChild(infoEl);
    card.appendChild(registerBtn);

    // Append card to container
    eventsContainer.appendChild(card);
  });
}

// Initial render
renderEvents();
