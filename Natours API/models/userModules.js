const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please input your name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please input your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    minlength: 8,
    validator: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not thesame',
    },
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
