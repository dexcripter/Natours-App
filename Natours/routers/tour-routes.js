const express = require('express');

const {
  getTours,
  createTour,
  findTour
} = require('../controllers/tour-controller');

const router = express.Router();

router
  .route('/')
  .get(getTours)
  .post(createTour);
router
  .route('/:id')
  .get(findTour)
  .patch()
  .delete();

module.exports = router;
