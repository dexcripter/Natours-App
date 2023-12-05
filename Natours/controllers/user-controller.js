const User = require('../models/user-model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getUser = (req, res, next) => {
  res.send('this route has not yet been defined');
};
exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ status: 'success', users });
});
exports.createUser = (req, res, next) => {
  res.send('this route has not yet been defined');
};
exports.deleteUser = (req, res, next) => {
  res.send('this route has not yet been defined');
};
exports.updateUser = (req, res, next) => {
  res.send('this route has not yet been defined');
};

exports.updateMe = catchAsync((req, res, next) => {
  // create an error if user tries to update password
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates!'), 400);
  }

  // update user document
  const filteredBody = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = User.findByIdAndUpdate(req.loggedUser._id, filteredBody, {
    new: true,
    runValidator: true,
  });
});
