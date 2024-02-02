// Load environment variables from .env file
require('dotenv').config();

// Importing necessary modules
const express = require('express'); // Express framework for handling HTTP requests
const Sequelize = require('sequelize'); // Sequelize for ORM

// Importing the Sequelize instance and models from the models directory
const sequelize = require('./models').sequelize; // Sequelize instance for DB connection
const { User, Project } = require('./models'); // Destructuring to get User and Project models

// Creating an instance of Express
const app = express();
// Setting the port from environment variables or defaulting to 3000
const PORT = process.env.PORT || 3000;

// Adding middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Route to create a new user
app.post('/users', async (req, res) => {
    try {
        // Extracting username, email, and password from request body
        const { username, email, password } = req.body;
        
        // Creating a new user using the createUser method (assumed to be defined on User model)
        const newUser = await User.createUser(username, email, password);
        // Responding with status 201 (Created) and the new user object
        res.status(201).json(newUser);
    } catch (error) {
        // Logging the error to console and responding with status 500 (Internal Server Error)
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
});

// Synchronizing all models with the database and then starting the server
sequelize.sync().then(() => {
    // Starting the server on the defined PORT
    app.listen(PORT, () => {
        // Logging the server start message
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    // Logging any errors that occur during Sequelize sync
    console.error('Unable to connect to the database:', error);
});
