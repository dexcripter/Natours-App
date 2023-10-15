const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkID);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.updateTourBody, tourController.createTour);

module.exports = router;
