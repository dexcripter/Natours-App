const express = require('express');

const {
  getTours,
  createTour,
  findTour,
  updateTour,
  deleteTour,
  getTourStats,
} = require('../controllers/tour-controller');

const router = express.Router();

router.route('/tour-stats').get(getTourStats);
router.route('/').get(getTours).post(createTour);
router.route('/:id').get(findTour).patch(updateTour).delete(deleteTour);

module.exports = router;
