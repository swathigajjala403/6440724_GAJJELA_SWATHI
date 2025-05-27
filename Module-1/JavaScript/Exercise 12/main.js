const form = document.getElementById('registrationForm');
const message = document.getElementById('responseMessage');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    event: formData.get('event')
  };

  // Show loading message
  message.textContent = 'Submitting...';
  message.className = 'message loading';

  // Simulate delay
  setTimeout(() => {
    // POST using fetch to mock API (jsonplaceholder used here as example)
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) throw new Error('Server error');
      return res.json();
    })
    .then(json => {
      console.log('Response:', json);
      message.textContent = `Registration successful! Welcome, ${data.name}.`;
      message.className = 'message success';
      form.reset();
    })
    .catch(err => {
      console.error(err);
      message.textContent = 'Registration failed. Please try again.';
      message.className = 'message error';
    });
  }, 1500); // simulate 1.5s server delay
});
