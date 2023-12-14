// core packages
const express = require('express');
const morgan = require('morgan');

// versioning the api
const version1 = require('./versioning/versionone');

// middlewares
const app = express();
app.use(morgan('dev'));

// routes
app.use('/api/v1/', version1);

// exporting the app to server
module.exports = app;
