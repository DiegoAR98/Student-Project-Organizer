// Define an asynchronous function to handle the new comment submission event
const newComment = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve the comment text entered by the user
    const commentBody = document.querySelector('#comment').value.trim();
    // Retrieve the post's ID from a data attribute
    const post_id = document.querySelector('.post_id').getAttribute('data-id');

    // Check if both the comment body and post ID are present
    if (commentBody && post_id) {
        // Send a POST request to the server to create a new comment
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ commentBody, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // If the response is okay, reload the page to show the new comment
        if (response.ok) {
            document.location.reload();
        } else {
            // If the response is not okay, alert the user that comment creation failed
            alert('Failed to create comment');
        }
    }
};

// Attach the new comment function to the submit event of the comment form
document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newComment);
