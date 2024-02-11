// Define an asynchronous function to handle user logout
const logout = async () => {
  // Send a POST request to the logout endpoint of the API
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // If the logout is successful, redirect to the home page
  if (response.ok) {
    document.location.replace('/');
  } else {
    // If the logout fails, display an alert with the error message
    alert(response.statusText);
  }
};

// Attach the logout function to the click event of the logout button
document.querySelector('#logout').addEventListener('click', logout);
