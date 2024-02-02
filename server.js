// Load environment variables from .env file
require('dotenv').config();

// Importing necessary modules
const express = require('express');
const { sequelize } = require('./models'); // Adjust this path as necessary to where your Sequelize instance is exported

// Importing routes
const userRoutes = require('./routes/userRoutes'); // Adjust this path as necessary

// Creating an instance of Express
const app = express();

// Setting the port from environment variables or defaulting to 3000
const PORT = process.env.PORT || 3000;

// Adding middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Using the userRoutes for any '/users' endpoint
app.use('/users', userRoutes);

// Synchronizing all models with the database and then starting the server
sequelize.sync({ force: false }) // Set 'force: true' only if you want to drop and re-create tables
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });


const mainRoutes = require('./routes/mainRoutes');
