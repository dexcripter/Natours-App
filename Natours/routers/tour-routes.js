const express = require('express');

const {
  getTours,
  createTour,
  findTour,
  updateTour,
  deleteTour,
  getTourStats,
} = require('../controllers/tour-controller');
const { protect, restrictTo } = require('../controllers/auth-controller');

const router = express.Router();

router.route('/tour-stats').get(getTourStats);
router.route('/').get(protect, getTours).post(createTour);
router
  .route('/:id')
  .get(findTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
