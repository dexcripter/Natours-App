const User = require('../models/user-model');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    user: newUser,
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exists
  if (!email || !password) {
    return next(new AppError('Invalid username or password'), 400);
  }

  // check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({ status: 'success', user: { token, user } });
});

exports.protect = catchAsync(async (req, res, next) => {
  // check if the token is present
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    [type, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    return next(new AppError('Please login to access this route', 403));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // const decodeds = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new Error('The user does not exist'));
  }

  // check if the user changed password after jwt was issues
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in!', 401)
    );
  }
  req.loggedUser = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array of allowed roles

    if (!roles.includes(req.loggedUser.role)) {
      return next(
        new AppError(
          'You do not have permission to perform this operation',
          403
        )
      );
    }
    next();
  };
};
