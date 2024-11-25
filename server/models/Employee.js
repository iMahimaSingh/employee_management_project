const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/  // Email validation regex
  },
  mobile: {
    type: String,
    required: true,
    match: /^\d{10}$/  // Mobile number validation (numeric and 10 digits)
  },
  designation: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  course: [String],
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
