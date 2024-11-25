// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // To handle CORS for React-Node communication
const employeeRoute = require('./routes/employeeRoute'); // Check this path
require('./server');  // Entry point for the backend server


const app = express();

// Middleware
app.use(express.json());  // To parse incoming JSON data
app.use(cors());  // Allow cross-origin requests from frontend
app.use('/api/employee', employeeRoute);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your_database')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Connection error:', err));


// Define the port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
