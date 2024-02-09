// Import Express router and other required modules
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
// Route to create a new post, protected by authentication
router.post('/', withAuth, async (req, res) => {
  try {
    // Creates a new post with request body data and user session ID
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      course_name: req.body.course_name, // Additional field: course_name
      due_date: req.body.due_date, // Additional field: due_date
      priority: req.body.priority, // Additional field: priority
      status: req.body.status, // Additional field: status
      user_id: req.session.user_id,
    });
    // Responds with the newly created post object
    res.status(200).json(newPost);
  } catch (err) {
    // Handles errors
    res.status(400).json(err);
  }
});
// Route to update an existing post, protected by authentication
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Updates an existing post identified by URL parameter with request body data
    const updatePost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        course_name: req.body.course_name, // Update course_name
        due_date: req.body.due_date, // Update due_date
        priority: req.body.priority, // Update priority
        status: req.body.status, // Update status
      },
      {
        where: {
          id: req.params.id, // Identifies which post to update
        }
      });
    // Checks if the update was successful
    if (updatePost[0] > 0) {
      res.status(200).json({ message: 'Post updated successfully' });
    } else {
      res.status(404).json({ message: 'No post found with this id' });
    }
  } catch (err) {
    // Handles errors
    res.status(400).json(err);
  }
});
// Route to delete a post, protected by authentication
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Deletes a post identified by URL parameter
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    // Checks if the deletion was successful
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    // Handles errors
    res.status(500).json(err);
  }
});
// Export the router to be used in the main application
module.exports = router;












