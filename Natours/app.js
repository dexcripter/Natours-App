const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const apiV1 = require('./api-versioning/apiV1');
const globalErrorHandler = require('./controllers/error-controller');

const app = express();

// middlewares
// app.use(express.static('./public'));
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: ['duration'],
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({
  max: 100,
  windowMs: 3600 * 1000,
  message: 'Too many requirest from this IP, please try again later',
});
app.use('/api', limiter);

// routing
app.use('/api/v1', apiV1);

// uncaught routes
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
