const express = require('express');

const controller = require('../controllers/tour-controller');
const { protect, restrictTo } = require('../controllers/auth-controller');

const Router = express.Router();

Router.route('/tour-stats').get(controller.getTourStats);
Router.route('/getmonthlyplan/:year').get(controller.getMonthlyPlan);

Router.route('/').get(protect, controller.getTours).post(controller.createTour);
Router.route('/:id')
  .get(controller.getTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), controller.deleteTour)
  .patch(controller.updateTour);

module.exports = Router;
