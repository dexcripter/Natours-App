const express = require('express');
const {
  getAllUsers,
  updateMe,
  deleteMe,
} = require('../controllers/user-controller');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/auth-controller.js');

const Router = express.Router();

Router.route('/signup').post(signup);
Router.route('/login').post(login);
Router.route('/forgotPassword').post(forgotPassword);
Router.route('/resetPassword/:token').patch(resetPassword);
Router.route('/updateme').patch(protect, updateMe);

Router.route('/')
  .post(protect, updateMe)
  .delete(protect, deleteMe)
  .get(protect, getAllUsers);

module.exports = Router;
