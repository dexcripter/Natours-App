// core packages
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const pug = require('pug');
const path = require('path');
const viewRouter = require('./routes/view-route.js');

const globalErrorHandling = require('./utils/global-error-handling.js');
const AppError = require('./utils/appError.js');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

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

// data sanitization against NosQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

// finally
app.use(
  hpp({
    whitelist: ['duration', 'maxGroupSize', 'price'],
  })
);

// routes
app.use('/', viewRouter);
app.use('/api/v1/', version1);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandling);

module.exports = app;
