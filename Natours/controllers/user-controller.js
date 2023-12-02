const User = require('../models/user-model');
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
