const app = require('express')();

const tourRoutes = require('../routes/tour-route');
const userRoutes = require('../routes/user-route');

app.use('/tours', tourRoutes);
app.use('/users', userRoutes);

module.exports = app;
