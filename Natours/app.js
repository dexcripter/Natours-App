const express = require('express');
const morgan = require('morgan');

const apiV1 = require('./api-versioning/apiV1');

const app = express();

// middlewares
// app.use(express.static('./public'));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

// routing
app.use('/api/v1', apiV1);

module.exports = app;
