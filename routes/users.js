const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Define salt rounds
    const saltRounds = 10;

    // Generate salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to database (pseudo code)
    // await saveUserToDatabase({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;