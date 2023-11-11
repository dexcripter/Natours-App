const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
