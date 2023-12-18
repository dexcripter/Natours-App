// core packages
const express = require('express');
const morgan = require('morgan');

const globalErrorHandling = require('./utils/global-error-handling.js');
const AppError = require('./utils/appError.js');

// versioning the api
const version1 = require('./versioning/versionone');

// middlewares
const app = express();
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/v1/', version1);

app.all('*', (req, res, next) => {
  // const error = new Error(`Can't find ${req.originalUrl} on this server`);
  // error.statusCode = 404;
  // error.status = 'Not found';

  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandling);

// exporting the app to server
module.exports = app;
