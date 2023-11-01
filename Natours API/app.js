const express = require('express');

const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'falied',
  //   message: `There is no ${req.originalUrl} defined on this server!`,
  // });

  // const err = new Error(
  //   `There is no ${req.originalUrl} defined on this server!`,
  // );
  // err.status = 'failed';
  // err.statusCode = 404;

  next(new AppError(`There is no ${req.originalUrl} defined on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
