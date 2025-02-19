const User = require('../models/userModel');

const userController = {
  // Register new user
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const user = new User({
        username,
        email,
        password, // Note: In real app, password should be hashed
      });

      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user || user.password !== password) { // Note: In real app, use proper password comparison
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      res.json({ message: 'Login successful', userId: user._id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;