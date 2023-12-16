// core packages
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');

// versioning the api
const version1 = require('./versioning/versionone');

// middlewares
const app = express();
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/v1/', version1);

app.all('*', (req, res, next) => {
  next(new AppError()`cant find ${req.originalUrl} on this server!`);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({ status: err.status, message: err.message });
});

// exporting the app to server
module.exports = app;
