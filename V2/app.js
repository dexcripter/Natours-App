const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// How to serve static files
// app.use(express.static(`${__dirname}/public`));

// INITIALS
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
