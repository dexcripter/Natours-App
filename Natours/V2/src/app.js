// core packages
const express = require('express');
const morgan = require('morgan');

// versioning the api
const version1 = require('./versioning/versionone');

// middlewares
const app = express();
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/v1/', version1);

app.all('*', (req, res, next) => {
  res.status(403).json({ status: 'not found' });
});

// exporting the app to server
module.exports = app;
