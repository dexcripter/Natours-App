// core packages
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const globalErrorHandling = require('./utils/global-error-handling.js');
const AppError = require('./utils/appError.js');
const app = express();

// versioning the api
const version1 = require('./versioning/versionone');

// middleware controllers
const limiter = rateLimit({
  // allows 100 requests from an IP in one hour
  max: 100,
  window: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});

// middlewares
app.use(helmet());
app.use('/api/v1', limiter);
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

// routes
app.use('/api/v1/', version1);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandling);

module.exports = app;
