// Import necessary modules and middleware
const router = require('express').Router(); // Sets up an instance of an express router to define routes
const { Comment, Post } = require('../../models'); // Destructures Comment (and adds Post for deletion) model from the models directory for database operations
const withAuth = require('../../utils/auth'); // Middleware to check if the user is authenticated

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new comment using the Comment model, passing the body content, user id, and post id from the request
    const newComment = await Comment.create({
      commentBody: req.body.commentBody, // Content of the comment from request body
      user_id: req.session.user_id, // User ID from the session (ensures user is logged in)
      post_id: req.body.post_id, // Post ID to which the comment belongs, from request body
    });

    // If comment creation is successful, return the newly created comment object as JSON
    res.status(200).json(newComment);
  } catch (err) {
    // If an error occurs (e.g., database error), return an error status and message
    res.status(400).json(err);
  }
});

// Route to delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Attempts to delete a post based on the ID provided in the route parameters and the user ID from session
    const postData = await Post.destroy({
      where: {
        id: req.params.id, // ID of the post to delete from route parameters
        user_id: req.session.user_id, // User ID from session to ensure ownership
      },
    });

    // If no post is found or deletion was not successful, return a 404 error with a message
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // If deletion is successful, return the result
    res.status(200).json(postData);
  } catch (err) {
    // If an error occurs, return a 500 internal server error status and the error message
    res.status(500).json(err);
  }
});

// Export the router to be used in the main server file
module.exports = router;
