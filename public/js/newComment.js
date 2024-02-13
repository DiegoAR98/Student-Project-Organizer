// Define an asynchronous function to handle new comment submissions
const newComment = async (event) => {
    // Prevent the default form submission behavior to handle with JavaScript
    event.preventDefault();

    // Access the form element that triggered the submit event
    const form = event.currentTarget;
    // Retrieve and trim the user's input from the textarea with ID 'comment'
    const commentBody = form.querySelector('#comment').value.trim();
    // Retrieve the post's ID stored in the form's data-id attribute
    const post_id = form.getAttribute('data-id');

    // Proceed only if both the comment body and post ID are not empty
    if (commentBody && post_id) {
        // Send a POST request to the server to create a new comment
        const response = await fetch(`/api/comments`, {
            method: 'POST', // Specify the request method
            body: JSON.stringify({ commentBody, post_id }), // Convert the comment body and post ID into a JSON string
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
        });

        // If the server responds positively, reload the page to display the new comment
        if (response.ok) {
            document.location.reload();
        } else {
            // If the server responds negatively, alert the user of failure
            alert('Failed to create comment');
        }
    }
};

// Attach the newComment function to the 'submit' event of the form for submitting comments
document.querySelector('.new-comment-form').addEventListener('submit', newComment);
