const newComment = async (event) => {
    event.preventDefault();

    const form = event.currentTarget; // Use the form that triggered the submit event
    const commentBody = form.querySelector('#comment').value.trim();
    const post_id = form.getAttribute('data-id'); // Get the post ID from the form's data attribute

    if (commentBody && post_id) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ commentBody, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
};

document.querySelector('.new-comment-form').addEventListener('submit', newComment);
