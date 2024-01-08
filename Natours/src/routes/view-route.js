const express = require('express');
const Router = express.Router();

const { getTour, getOverview } = require('../controllers/views-controller');

Router.route('/').get(getOverview);
Router.route('/tour').get(getTour);

module.exports = Router;
