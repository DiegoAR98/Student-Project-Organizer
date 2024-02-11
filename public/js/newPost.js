// Define an asynchronous function to handle new post submissions
const newPost = async (event) => {
  // Prevent the form from submitting in the default manner
  event.preventDefault();

  // Retrieve user inputs from the form, trimming whitespace from text inputs
  const title = document.querySelector('#post-title').value.trim();
  const courseName = document.querySelector('#course-name').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const dueDate = document.querySelector('#due-date').value; // No trim needed for date input
  const priority = document.querySelector('#priority').value;
  const status = document.querySelector('#status').value;

  // Ensure all fields have been filled out before proceeding
  if (title && content && courseName && dueDate && priority && status) {
    // Send a POST request to create a new post with the user inputs
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content, course_name: courseName, due_date: dueDate, priority, status }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If the request is successful, redirect the user to the dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // If the request fails, alert the user of the failure
      alert('Failed to create assignment');
    }
  }
};

// Attach the newPost function to the submit event of the .new-post-form element
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPost);
