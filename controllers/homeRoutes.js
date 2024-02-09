// Import Express router and models
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
// Route for the homepage
router.get('/', async (req, res) => {
  try {
    // Retrieve all posts and their associated user data
    const postData = await Post.findAll({
      include: [{ model: User }],
    });
    // Prepare data for rendering
    const posts = postData.map((post) => post.get({ plain: true }));
    // Render homepage with posts data and login status
    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});
// Route for viewing a single post
router.get('/post/:id', async (req, res) => {
  try {
    // Retrieve post by id and include associated user and comments
    const postData = await Post.findByPk(req.params.id, {
      include: [User, { model: Comment, include: [User] }],
    });
    // Prepare post data for rendering
    const post = postData.get({ plain: true });
    // Render post view with edit options for post owner or normal view for others
    if (req.session.logged_in) {
      res.render(post.user_id === req.session.user_id ? 'editpost' : 'post', {
        ...post,
        logged_in: true
      });
    } else {
      // Render post view for non-logged-in users
      res.render('post', { ...post, logged_in: false });
    }
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});
// Route for creating a new post
router.get('/newpost', (req, res) => {
  // Render the page for creating a new post with user logged in status
  res.render('newpost', { logged_in: true });
});
// Dashboard route with authentication
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Retrieve user data excluding password and include user's posts and comments
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post, Comment }],
    });
    // Prepare user data for rendering
    const user = userData.get({ plain: true });
    // Render dashboard with user data and logged in status
    res.render('dashboard', { ...user, logged_in: true });
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});
// Login route
router.get('/login', (req, res) => {
  // Redirect logged-in users to dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  // Render login page for guests
  res.render('login');
});
// Signup route
router.get('/signup', (req, res) => {
  // Redirect logged-in users to dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  // Render signup page for guests
  res.render('signup');
});
// Export the router
module.exports = router;












