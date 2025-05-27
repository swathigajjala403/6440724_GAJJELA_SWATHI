const eventName = "Community Festival";
const eventDate = "2025-07-15";
let availableSeats = 10; // starting seats

// Display event info dynamically
const eventInfoDiv = document.getElementById("event-info");
const messageDiv = document.getElementById("message");
const registerBtn = document.getElementById("register-btn");

function updateEventInfo() {
  eventInfoDiv.innerHTML = `
    <p><strong>Event:</strong> ${eventName}</p>
    <p><strong>Date:</strong> ${eventDate}</p>
    <p><strong>Available Seats:</strong> ${availableSeats}</p>
  `;
}

function registerSeat() {
  if (availableSeats > 0) {
    availableSeats--; // decrease seats
    updateEventInfo();
    messageDiv.textContent = "Registration successful! 🎉";
    messageDiv.style.color = "green";
  } else {
    messageDiv.textContent = "Sorry, no seats available.";
    messageDiv.style.color = "red";
  }
}

registerBtn.addEventListener("click", registerSeat);

// Initialize the event info on page load
updateEventInfo();

