const express = require('express');
const tourController = require('../../V2/contollers/tour-controller');

const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .delete(tourController.deleteTour)
  .patch(tourController.updateTour);

// exports
module.exports = router;
