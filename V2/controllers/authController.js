const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModes');
const AppError = require('../utils/appError');
// const { decode } = require('punycode');
const sendEmail = require('../utils/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: { newUser }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password'), 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password'), 401);
  }

  const token = signToken(user._id);
  res.status(200).json({ token, status: 'success' });
});

exports.protection = catchAsync(async (req, res, next) => {
  // validating if the token is present
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return next(new AppError('Access denied: Please log in!'), 401);

  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check user
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(new AppError('This user no longer exists', 401));

  // check if user chamged password
  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password. Log in again'));
  }

  // GRANT ACCESS
  req.user = currentUser;
  next();
});

exports.restictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission', 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // getting the user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address'));
  }

  // generating the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSafe: false });

  // 3) send it to the user
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a fetch request with your new password to: ${resetUrl}. \nIf you didnt initiate this, kindly ignore this message`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token is valid for 10 mins',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSafe: false });

    return next(new AppError('There was a problem sending the email', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired'));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = signToken(user._id);

  // Logging in the user
  res.status(200).json({
    status: 'success',
    token
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get the user from the collection
  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );
  // Check if the posted password is correct
  if (
    !user ||
    !(await user.correctPassword(req.body.password, user.password))
  ) {
    return next(new AppError('Incorrect credientials', 401));
  }

  // if the password is correct, then update the password
  user.password = req.body.newPassword;
  user.save({ validateBeforeSafe: false });
  // log user in, send JWT
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token
  });
});
