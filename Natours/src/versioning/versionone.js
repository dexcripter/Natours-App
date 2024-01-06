const app = require('express')();

const tourRoutes = require('../routes/tour-route');
const userRoutes = require('../routes/user-route');
const reviews = require('../routes/review-route');

app.use('/tours', tourRoutes);
app.use('/users', userRoutes);
app.use('reviews', reviews);

module.exports = app;
