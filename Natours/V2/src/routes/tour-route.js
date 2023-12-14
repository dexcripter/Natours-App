const express = require('express');

const controller = require('../controllers/tour-controller');

const Router = express.Router();

Router.route('/').get(controller.getTours).post();

module.exports = Router;
