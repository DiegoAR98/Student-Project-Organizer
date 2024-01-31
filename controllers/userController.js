const bcrypt = require('bcrypt');
const User = require('../models/user');

// Function to create a new user
exports.createUser = async (username, email, password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            username,
            email,
            passwordHash: hashedPassword
        });

        return newUser;
    } catch (error) {
        throw error;
    }
};

// Function to update a user's password
exports.updateUserPassword = async (userId, newPassword) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const updatedUser = await User.update({ passwordHash: hashedPassword }, {
            where: { id: userId }
        });

        return updatedUser;
    } catch (error) {
        throw error;
    }
};
