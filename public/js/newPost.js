const newPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const courseName = document.querySelector('#course-name').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const dueDate = document.querySelector('#due-date').value;
  const priority = document.querySelector('#priority').value;
  const status = document.querySelector('#status').value;

  if (title && content && courseName && dueDate && priority && status) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content, course_name: courseName, due_date: dueDate, priority, status }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create assignment');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPost);
