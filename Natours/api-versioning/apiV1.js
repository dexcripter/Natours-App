const express = require('express');
const tourRoutes = require('../routers/tour-routes');
const userRoutes = require('../routers/user-routes');

const app = express();

app.use('/tours', tourRoutes);
app.use('/users', userRoutes);

// exporting the module
module.exports = app;
