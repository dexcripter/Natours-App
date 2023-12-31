const express = require('express');
// const userController = require('../controllers/user-controller')
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth-controller.js');

const Router = express.Router();

Router.route('/signup').post(signup);
Router.route('/login').post(login);
Router.route('/forgotPassword').post(forgotPassword);
Router.route('/resetPassword/:token').patch(resetPassword);

module.exports = Router;
