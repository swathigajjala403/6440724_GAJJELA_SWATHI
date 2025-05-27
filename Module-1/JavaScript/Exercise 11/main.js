const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // stop default form submit

  // Clear previous messages
  successMessage.textContent = '';
  clearErrors();

  // Get form inputs via form.elements
  const { name, email, event: selectedEvent } = form.elements;

  let hasError = false;

  // Validation
  if (!name.value.trim()) {
    showError('nameError', 'Name is required.');
    hasError = true;
  }
  if (!email.value.trim()) {
    showError('emailError', 'Email is required.');
    hasError = true;
  } else if (!validateEmail(email.value.trim())) {
    showError('emailError', 'Invalid email format.');
    hasError = true;
  }
  if (!selectedEvent.value) {
    showError('eventError', 'Please select an event.');
    hasError = true;
  }

  if (!hasError) {
    successMessage.textContent = `Thank you, ${name.value.trim()}! You are registered for "${selectedEvent.value}".`;
    form.reset();
  }
});

// Helper to show error messages
function showError(id, message) {
  document.getElementById(id).textContent = message;
}

// Clear all error messages
function clearErrors() {
  ['nameError', 'emailError', 'eventError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
}

// Simple email format check
function validateEmail(email) {
  // Basic email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
