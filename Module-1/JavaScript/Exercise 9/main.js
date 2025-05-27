const eventsContainer = document.getElementById('eventsContainer');
const loading = document.getElementById('loading');
const fetchThenBtn = document.getElementById('fetchThenBtn');
const fetchAsyncBtn = document.getElementById('fetchAsyncBtn');

// Mock API URL — use a public dummy API or your own file
const API_URL = 'https://mocki.io/v1/4a4d4bfb-0d46-49bb-8db1-e1bfe2b6e91a'; 
// This URL returns JSON array of event objects like:
// [
//   { "id": 1, "name": "Music Fest", "date": "2025-09-01", "seats": 10 },
//   { "id": 2, "name": "Tech Meetup", "date": "2025-08-15", "seats": 0 },
//   ...
// ]

// Utility: Render events to DOM
function renderEvents(events) {
  eventsContainer.innerHTML = '';
  if (!events.length) {
    eventsContainer.textContent = 'No events found.';
    return;
  }
  events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <h3>${event.name}</h3>
      <p>Date: ${event.date}</p>
      <p>Seats: ${event.seats}</p>
    `;
    eventsContainer.appendChild(card);
  });
}

// Fetch using .then() and .catch()
function fetchEventsThen() {
  loading.style.display = 'block';
  eventsContainer.innerHTML = '';
  fetch(API_URL)
    .then(response => {
      if (!response.ok) throw new Error('Network response not OK');
      return response.json();
    })
    .then(data => {
      renderEvents(data);
      loading.style.display = 'none';
    })
    .catch(err => {
      loading.style.display = 'none';
      eventsContainer.innerHTML = `<p class="error">Error fetching events: ${err.message}</p>`;
    });
}

// Fetch using async/await
async function fetchEventsAsync() {
  loading.style.display = 'block';
  eventsContainer.innerHTML = '';
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response not OK');
    const data = await response.json();
    renderEvents(data);
  } catch (err) {
    eventsContainer.innerHTML = `<p class="error">Error fetching events: ${err.message}</p>`;
  } finally {
    loading.style.display = 'none';
  }
}

// Event listeners for buttons
fetchThenBtn.onclick = fetchEventsThen;
fetchAsyncBtn.onclick = fetchEventsAsync;
