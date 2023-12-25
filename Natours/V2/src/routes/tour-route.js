const express = require('express');

const controller = require('../controllers/tour-controller');
const { protect } = require('../controllers/auth-controller');

const Router = express.Router();

Router.route('/tour-stats').get(controller.getTourStats);
Router.route('/getmonthlyplan/:year').get(controller.getMonthlyPlan);

Router.route('/').get(protect, controller.getTours).post(controller.createTour);
Router.route('/:id')
  .get(controller.getTour)
  .delete(controller.deleteTour)
  .patch(controller.updateTour);

module.exports = Router;
