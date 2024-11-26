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
  mobile: { type: String, required: true, validate: /^[0-9]{10}$/ },
  designation: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  course:{

   type:[String],
   required:true,
  },
  image: {
    type: String,
    required: true, // Store the Base64 string directly in the database
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
