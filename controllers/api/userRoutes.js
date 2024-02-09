// Import Express router and User model
const router = require('express').Router();
const { User } = require('../../models');

// Endpoint to register a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user with request body data
    const userData = await User.create(req.body);

    // Save session with user ID and logged-in status
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Respond with user data on successful registration
      res.status(200).json(userData);
    });
  } catch (err) {
    // Handle errors, such as user already exists
    res.status(400).json(err);
  }
});

// Endpoint for user login
router.post('/login', async (req, res) => {
  try {
    // Attempt to find the user by username
    const userData = await User.findOne({ where: { username: req.body.username } });

    // Check if user data exists
    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Verify the password
    const validPassword = await userData.checkPassword(req.body.password);

    // Check if password is valid
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Save session with user ID and logged-in status on successful login
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      // Respond with user data and login message
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // Handle errors, such as database errors
    console.error(err);
    res.status(400).json(err);
  }
});

// Endpoint for user logout
router.post('/logout', (req, res) => {
  // Check if user is logged in
  if (req.session.logged_in) {
    // Destroy session to log out user
    req.session.destroy(() => {
      res.status(204).end(); // No content to send back
    });
  } else {
    // Handle case where user is not logged in
    res.status(404).end();
  }
});

// Export the router for use in the main app
module.exports = router;
