const express = require('express');

const {
  createReview,
  getAllReviews,
  deleteReview,
} = require('../controllers/review-controller');
const { protect, restrictTo } = require('../controllers/auth-controller');

const Router = express.Router();

Router.route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

Router.route('/:id').delete(deleteReview);

module.exports = Router;
