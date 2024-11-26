const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoute');
const authRoutes = require('./routes/loginRoutes');
const dotenv=require('dotenv');
dotenv.config();


const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // To handle CORS (Cross-Origin Resource Sharing)

// Routes
app.use('/api/employees', employeeRoutes); // Employee routes
app.use('/api/auth', authRoutes); // Authentication routes

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Server Listening
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});