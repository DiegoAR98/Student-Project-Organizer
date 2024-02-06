const newComment = async (event) => {
    event.preventDefault();

    const commentBody = document.querySelector('#comment').value.trim();
    const post_id = document.querySelector('.post_id').getAttribute('value');

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
            alert('Failed to create post');
        }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newComment);