const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please enter your name']
  },
  email: {
    type: String,
    require: [true, 'Please enter your email'],
    unique: [true, 'This email is already registered!'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: { type: String },
  password: {
    type: String,
    require: true,
    minLength: 8
  },
  passwordConfirm: {
    type: String,
    require: true,
    minLength: 8,
    validate: function(val) {
      return val === this.password;
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
