const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/loginRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // To handle CORS (Cross-Origin Resource Sharing)

// Routes
app.use('/api/employees', employeeRoutes); // Employee routes
app.use('/api/auth', authRoutes); // Authentication routes

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/your_database')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
