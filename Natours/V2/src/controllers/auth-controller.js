const { decode } = require('punycode');
const User = require('../model/user-model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body); /// bad practice though
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  if (!token) return next(new AppError('Error generaing token'));
  res.status(201).json({
    status: 'success',
    token,
    data: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // get the user based on the email and password inputed
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('password');

  // check if user exists and the passwords match the existing user
  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  // response
  const token = signToken(user._id);
  return res
    .status(200)
    .json({ status: 'success', token, message: 'User logged in' });
});

exports.protect = catchAsync(async (req, res, next) => {
  // get the token
  const [bearer, token] = `${req.headers.authorization}`.split(' ');

  if (!bearer.startsWith('Bearer') || !token) {
    return next(new AppError('Please sign in to access this route', 401));
  }
  // validate the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  req.decoded = decoded;

  // Check if user still exists
  const currentUser = await User.findById(req.decoded.id);
  if (!currentUser)
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );

  // check if the password has been changed
  if (currentUser.changePasswordAfter(req.decoded.iat))
    return next(new AppError('The password has been changed, Please log in'));

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have persissiom to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get user from posted email
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return next(new AppError('There is no user with this email address', 404));

  const resetToken = createPasswordResetToken();
});
