const events = [
  { id: 1, name: "Music Concert", category: "Music", date: "2025-09-01", seats: 5 },
  { id: 2, name: "Art Exhibition", category: "Art", date: "2025-07-20", seats: 0 },
  { id: 3, name: "Tech Meetup", category: "Tech", date: "2025-08-15", seats: 10 },
  { id: 4, name: "Jazz Night", category: "Music", date: "2025-10-05", seats: 8 },
  { id: 5, name: "Cooking Workshop", category: "Workshop", date: "2025-11-12", seats: 12 }
];

// Clone event array using spread operator to avoid mutation
let filteredEvents = [...events];

// Render events with destructuring and default parameters
const renderEvents = (eventList = []) => {
  const container = document.querySelector('#eventsContainer');
  container.innerHTML = '';

  if (!eventList.length) {
    container.textContent = 'No events found.';
    return;
  }

  eventList.forEach(({ name, category, date, seats }) => {
    const card = document.createElement('div');
    card.className = 'event-card';

    card.innerHTML = `
      <div class="event-name">${name}</div>
      <div>Category: ${category}</div>
      <div>Date: ${date}</div>
      <div>Seats Available: ${seats}</div>
    `;

    container.appendChild(card);
  });
};

// Filter by category using default param and spread operator
const filterByCategory = (category = 'all') => {
  filteredEvents = category === 'all' 
    ? [...events] 
    : [...events].filter(event => event.category === category);
  renderEvents(filteredEvents);
};

// Event listener for dropdown change
document.querySelector('#categoryFilter').addEventListener('change', (e) => {
  filterByCategory(e.target.value);
});

// Initial render
filterByCategory();
