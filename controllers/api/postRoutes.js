const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      course_name: req.body.course_name, // Add course_name
      due_date: req.body.due_date, // Add due_date
      priority: req.body.priority, // Add priority
      status: req.body.status, // Add status
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update an existing post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        course_name: req.body.course_name, // Add course_name
        due_date: req.body.due_date, // Add due_date
        priority: req.body.priority, // Add priority
        status: req.body.status, // Add status
      },
      {
        where: {
          id: req.params.id, // Changed to use URL parameter for post ID
        }
      });

    if (updatePost[0] > 0) {
      res.status(200).json({ message: 'Post updated successfully' });
    } else {
      res.status(404).json({ message: 'No post found with this id' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
