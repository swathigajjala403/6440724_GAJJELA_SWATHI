// Array to store all events
const events = [
  { name: "Art Exhibition", category: "Art" },
  { name: "Music Fest", category: "Music" },
  { name: "Cooking Workshop", category: "Workshop" },
];

// Function to render events cards from an array
function renderEvents(eventArray) {
  const eventsList = document.getElementById('eventsList');
  eventsList.innerHTML = '';

  // Use map() to create card HTML strings
  const cards = eventArray.map(event => {
    return `
      <div class="card">
        <h3>${event.name}</h3>
        <p>Category: ${event.category}</p>
      </div>
    `;
  });

  // Join all cards and insert into DOM
  eventsList.innerHTML = cards.join('');
}

// Add a new event using push()
function addNewEvent() {
  const newEvent = { name: "Jazz Night", category: "Music" };
  events.push(newEvent);
  alert(`Added event: "${newEvent.name}"`);
  renderEvents(events);
}

// Filter to show only music events
function showMusicEvents() {
  const musicEvents = events.filter(event => event.category.toLowerCase() === 'music');
  renderEvents(musicEvents);
}

// Show all events
function showAllEvents() {
  renderEvents(events);
}

// Initially show all events
renderEvents(events);
