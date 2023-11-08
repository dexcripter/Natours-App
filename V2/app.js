// Core modules
const express = require('express');
const morgan = require('morgan');
const tourController = require('../V2/contollers/tour-controller');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));
// const route = express.Router;

app
  .route('/api/v1/tours/:id')
  .all(tourController.checkId)
  .get(tourController.getTour)
  .delete(tourController.deleteTour)
  .patch(tourController.updateTour);

app
  .route('/api/v1/tours')
  .get(tourController.getAllTour)
  .post(tourController.createTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is currently listening to port ${port}`);
});
