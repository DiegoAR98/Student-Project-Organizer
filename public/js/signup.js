// Define an asynchronous function to handle signup form submission
const signupFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve and trim the username and password input by the user
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Proceed only if both username and password are provided
  if (username && password) {
    // Send a POST request to the server to create a new user
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the request is successful, redirect the user to the dashboard page
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // If the request fails, display the error message to the user
      alert(response.statusText);
    }
  }
};

// Attach the signup form handler to the submit event of the signup form
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
