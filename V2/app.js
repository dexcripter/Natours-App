// Core modules
const express = require('express');
const tourController = require('../V2/contollers/tour-controller');

const app = express();

app.use(express.json());

app.get('/api/v1/tours', tourController.getAllTour);
app.get('/api/v1/tours/:id', tourController.getTour);
app.post('/api/v1/tours', tourController.createTour);
app.delete('/api/v1/tours/:id', tourController.deleteTour);
app.patch('/api/v1/tours', tourController.updateTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is currently listening to port ${port}`);
});
