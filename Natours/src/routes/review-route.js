const express = require('express');

const {
  createReview,
  getAllReviews,
} = require('../controllers/review-controller');
const { protect, restrictTo } = require('../controllers/auth-controller');

const Router = express.Router();

Router.route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

module.exports = Router;
