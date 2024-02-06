const newComment = async (event) => {
    event.preventDefault();

    const commentBody = document.querySelector('#comment').value.trim();
    // Corrected to use getAttribute('data-id') for retrieving the post's ID
    const post_id = document.querySelector('.post_id').getAttribute('data-id');

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
            alert('Failed to create comment'); // Corrected the alert message
        }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newComment);
