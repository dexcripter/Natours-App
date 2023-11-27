const express = require('express');
const tourRoutes = require('../routers/tour-routes');

const app = express();

app.use('/tours', tourRoutes);

// exporting the module
module.exports = app;
