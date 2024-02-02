jest.mock('../models/user', () => ({
    create: jest.fn().mockImplementation(({ username, email, passwordHash }) => Promise.resolve({
      id: 1,
      username,
      email,
      passwordHash,
    })),
    findOne: jest.fn().mockImplementation(({ where: { email } }) => Promise.resolve({
      id: 1,
      username: 'testuser',
      email,
      passwordHash: 'hashedPassword123',
    }))
  }));
  
  
  const { createUser } = require('../controllers/userController');
  const { User } = require('../models');
  
  describe('User Controller Tests', () => {
    test('createUser creates a user with a hashed password', async () => {
      const mockEmail = 'test@email.com';
      const mockPassword = 'password123';
      const mockUsername = 'testuser';
  
      // Call the createUser function from the userController
      await createUser(mockUsername, mockEmail, mockPassword);
  
      // Mock the User.findOne method to simulate fetching user from the database
      const savedUser = await User.findOne({ where: { email: mockEmail } });
  
      // Assertions
      expect(User.create).toHaveBeenCalledWith({
        username: mockUsername,
        email: mockEmail,
        passwordHash: expect.any(String),
      });
      expect(savedUser).toBeDefined();
      expect(savedUser.username).toBe(mockUsername);
      expect(savedUser.passwordHash).not.toBe(mockPassword);
    });
  });
  