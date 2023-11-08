// Core modules
const express = require('express');
const morgan = require('morgan');
const tourController = require('../V2/contollers/tour-controller');
const userController = require('./contollers/user-controller');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));
const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/users', userRouter);

app.use('/api/v1/tours', tourRouter);
tourRouter
  .route('/:id')
  .all(tourController.checkId)
  .get(tourController.getTour)
  .delete(tourController.deleteTour)
  .patch(tourController.updateTour);

tourRouter
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.createTour);

userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
userRouter
  .route('/:id')
  .delete(userController.deleteUser)
  .get(userController.getUser)
  .patch(userController.updateUser);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is currently listening to port ${port}`);
});
