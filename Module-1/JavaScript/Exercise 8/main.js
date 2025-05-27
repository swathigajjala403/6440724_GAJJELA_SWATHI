// Sample events data
const events = [
  { id: 1, name: "Music Concert", category: "Music", date: "2025-09-01", seats: 5 },
  { id: 2, name: "Art Exhibition", category: "Art", date: "2025-07-20", seats: 0 },
  { id: 3, name: "Tech Meetup", category: "Tech", date: "2025-08-15", seats: 10 },
  { id: 4, name: "Jazz Night", category: "Music", date: "2025-10-05", seats: 8 },
  { id: 5, name: "Cooking Workshop", category: "Workshop", date: "2025-11-12", seats: 12 }
];

// Cached DOM elements
const eventsContainer = document.querySelector('#eventsContainer');
const categoryFilter = document.querySelector('#categoryFilter');
const searchInput = document.querySelector('#searchInput');

let filteredEvents = [...events]; // to hold filtered events

// Render events on the page
function renderEvents(eventList) {
  eventsContainer.innerHTML = '';

  if(eventList.length === 0) {
    eventsContainer.textContent = 'No events found.';
    return;
  }

  eventList.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';

    const nameEl = document.createElement('div');
    nameEl.className = 'event-name';
    nameEl.textContent = event.name;

    const infoEl = document.createElement('div');
    infoEl.className = 'event-info';
    infoEl.textContent = `Category: ${event.category} | Date: ${event.date} | Seats: ${event.seats}`;

    const btn = document.createElement('button');
    btn.textContent = 'Register';
    btn.disabled = event.seats === 0;

    // Register button onclick
    btn.onclick = () => {
      if(event.seats > 0) {
        event.seats--;
        infoEl.textContent = `Category: ${event.category} | Date: ${event.date} | Seats: ${event.seats}`;
        if(event.seats === 0) btn.disabled = true;
      }
    };

    card.appendChild(nameEl);
    card.appendChild(infoEl);
    card.appendChild(btn);

    eventsContainer.appendChild(card);
  });
}

// Filter events based on category dropdown
function filterByCategory() {
  const selectedCategory = categoryFilter.value;
  if(selectedCategory === 'all') {
    filteredEvents = [...events];
  } else {
    filteredEvents = events.filter(event => event.category === selectedCategory);
  }
  filterBySearch(); // apply search on filtered results
}

// Filter events based on search input
function filterBySearch() {
  const query = searchInput.value.trim().toLowerCase();
  if(query === '') {
    renderEvents(filteredEvents);
  } else {
    const searched = filteredEvents.filter(event => event.name.toLowerCase().includes(query));
    renderEvents(searched);
  }
}

// Event listeners
categoryFilter.onchange = filterByCategory;
searchInput.onkeydown = filterBySearch;

// Initial render
renderEvents(events);
