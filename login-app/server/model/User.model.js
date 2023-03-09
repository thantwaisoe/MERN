const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide unique Username'],
        unique: [true, 'Username exist'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    email: {
        type: String,
        required: [true, 'Please provide unique Email'],
        unique: [true, 'Email exist'],
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    address: {
        type: String,
    },
    profile: {
        type: String,
    },
});
const UserModal = mongoose.model('Users', userSchema); //* Use the existing model | or create model

module.exports = UserModal
