// Import necessary Node.js modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// Import route controllers and utility functions
const routes = require('./controllers');
const helpers = require('./utils/helpers'); // Import custom helpers for Handlebars

// Import Sequelize configuration and setup session store with Sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001; // Set the port to be used by the Express app

// Initialize Handlebars view engine with custom helpers
const hbs = exphbs.create({ helpers }); // Helpers are now accessible in your Handlebars templates

// Session configuration object
const sess = {
  secret: 'Super secret secret', // Secret used to sign the session ID cookie
  cookie: {
    maxAge: 300000, // Cookie expiration time in milliseconds
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: false, // Should be set to true in production for HTTPS
    sameSite: 'strict', // Lax or Strict cookie sending with requests
  },
  resave: false, // Prevents session from being saved back to the session store if it was never modified
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  store: new SequelizeStore({
    db: sequelize // Set up session store to use Sequelize for storing session data
  })
};

// Use session middleware configured with the above settings
app.use(session(sess));

// Set Handlebars as the view engine for the Express app
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files located in the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in the 'controllers' directory
app.use(routes);

// Synchronize the Sequelize models and then start the Express server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`)); // Log the listening port
});
