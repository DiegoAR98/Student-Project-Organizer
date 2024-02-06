// Function to handle post updates
async function handlePostUpdate(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Extract title, content, and post ID from the form
  const form = event.target; // Get the form that triggered the event
  const title = form.querySelector('#post-title').value.trim();
  const content = form.querySelector('#post-content').value.trim();
  const postId = form.dataset.id; // Using .dataset.id from the form

  // Only proceed if all fields are filled
  if (title && content && postId) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      // Redirect to dashboard if update is successful
      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        throw new Error('Post update failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  }
}

// Function to handle post deletions
async function handlePostDeletion(event) {
  event.preventDefault(); // Prevent triggering form submission

  // Confirm deletion with the user
  if (!confirm('Are you sure you want to delete this post?')) return;

  const postId = event.target.dataset.id;

  if (postId) {
    try {
      const response = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });

      // Redirect to dashboard if deletion is successful
      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        throw new Error('Failed to delete Project.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  }
}

// Attach the event listener to the form for update submission
document.querySelector('.edit-post-form').addEventListener('submit', handlePostUpdate);

// Attach a separate event listener for the delete button to prevent form submission
document.querySelector('#deleteBtn').addEventListener('click', handlePostDeletion);
