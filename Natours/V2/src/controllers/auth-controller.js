const User = require('../model/user-model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // get the user based on the email and password inputed
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('password');
  console.log(password, user.password);

  // check if user exists and the passwords match the existing user
  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  // response
  const token = signToken(user._id);
  return res
    .status(200)
    .json({ status: 'success', token, message: 'user logged in' });
});
