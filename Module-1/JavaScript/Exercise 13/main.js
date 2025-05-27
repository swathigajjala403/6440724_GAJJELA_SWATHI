const form = document.getElementById('registrationForm');
const message = document.getElementById('message');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  console.log('[LOG] Form submission started');

  const formData = new FormData(form);
  const userData = {
    name: formData.get('name'),
    email: formData.get('email'),
    event: formData.get('event')
  };

  console.log('[LOG] Collected Data:', userData);

  // Add a manual breakpoint for debugging
  debugger;

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    console.log('[LOG] Response status:', response.status);
    if (!response.ok) throw new Error('Server error');
    return response.json();
  })
  .then(data => {
    console.log('[LOG] Server response data:', data);
    message.textContent = 'Registration successful!';
    message.className = 'message success';
    form.reset();
  })
  .catch(error => {
    console.error('[ERROR] Registration failed:', error);
    message.textContent = 'Failed to register. Check console.';
    message.className = 'message error';
  });
});
