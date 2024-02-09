document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");

  // Attach event listener to the edit post form
  const editForm = document.querySelector('.edit-post-form');
  if (editForm) {
    editForm.addEventListener('submit', handlePostUpdate);
    console.log("Edit post form listener attached.");
  } else {
    console.log("Edit post form not found.");
  }

  // Attach event listener to the delete button
  const deleteButton = document.getElementById('deleteBtn');
  if (deleteButton) {
    deleteButton.addEventListener('click', handlePostDeletion);
    console.log("Delete button listener attached.");
  } else {
    console.log("Delete button not found.");
  }
});

// Function to handle post updates
async function handlePostUpdate(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const form = event.currentTarget;
  const title = form.querySelector('#post-title').value.trim();
  const content = form.querySelector('#post-content').value.trim();
  const courseId = form.querySelector('#course-name').value.trim();
  const dueDate = form.querySelector('#due-date').value;
  const priority = form.querySelector('#priority').value;
  const status = form.querySelector('#status').value;
  const postId = form.getAttribute('data-id');

  if (title && content && postId) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, courseId, dueDate, priority, status }),
      });

      if (response.ok) {
        console.log("Post updated successfully");
        window.location.href = '/dashboard';
      } else {
        throw new Error('Post update failed: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  } else {
    console.log("Missing required fields");
  }
}

// Function to handle post deletions
async function handlePostDeletion(event) {
  event.preventDefault(); // Prevent triggering form submission

  if (!confirm('Are you sure you want to delete this post?')) return;

  const postId = event.currentTarget.getAttribute('data-id');

  if (postId) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log("Post deleted successfully");
        window.location.href = '/dashboard';
      } else {
        throw new Error('Failed to delete post: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  } else {
    console.log("Post ID not found for deletion");
  }
}
