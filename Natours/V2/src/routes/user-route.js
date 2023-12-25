const express = require('express');
// const userController = require('../controllers/user-controller')
const { signup, login } = require('../controllers/auth-controller.js');

const Router = express.Router();

Router.route('/signup').post(signup);
Router.route('/login').post(login);

module.exports = Router;
