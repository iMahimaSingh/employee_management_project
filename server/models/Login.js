const mongoose = require('mongoose');

// Define the Login schema
const loginSchema = new mongoose.Schema({
    f_sno: {
        type: Number,
        required: true,
        unique: true
    },
    f_userName: {
        type: String,
        required: true
    },
    f_Pwd: {
        type: String,
        required: true
    }
});

// Create the Login model
const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
