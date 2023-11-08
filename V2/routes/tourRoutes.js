const express = require('express');
const tourController = require('../../V2/contollers/tour-controller');

const router = express.Router();

router
  .route('/:id')
  .all(tourController.checkId)
  .get(tourController.getTour)
  .delete(tourController.deleteTour)
  .patch(tourController.updateTour);

router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.createTour);

module.exports = router;
