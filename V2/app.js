// Core modules
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is currently listening to port ${port}`);
});
