const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const apiV1 = require('./api-versioning/apiV1');
const globalErrorHandler = require('./controllers/error-controller');

const app = express();

// middlewares
// app.use(express.static('./public'));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

// routing
app.use('/api/v1', apiV1);

// uncaught routes
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
