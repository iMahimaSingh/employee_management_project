const Login = require('../models/Login');
const bcrypt = require('bcryptjs');

// Login controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Login.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid login details' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid login details' });
    }

    // Set the token in cookies or localStorage
    res.json({ message: 'Login successful', token: 'your_jwt_token_here' });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
