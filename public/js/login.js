// Define an asynchronous function to handle the login form submission event
const loginFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Collect user input values from the login form fields
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  
  // Log the username and password for debugging purposes (consider security implications)
  console.log(username, password);

  // Check if both username and password have been entered
  if (username && password) {
    // Send a POST request to the server with the username and password
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the login was successful by examining the response status
    if (response.ok) {
      // Redirect the user to the dashboard page upon successful login
      document.location.replace('/dashboard');
    } else {
      // Alert the user of login failure using the response status text
      alert(response.statusText);
    }
  }
};

// Attach the login form handler to the submit event of the login form
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
