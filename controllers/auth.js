const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Signup controller
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({ email });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      'your-secret-key'
    );

    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Generate JWT token without expiration
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'your-secret-key'
    );

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to authenticate' });
  }
};

// Logout controller
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};
