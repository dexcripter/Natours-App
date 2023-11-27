const express = require('express');
const morgan = require('morgan');

const apiV1 = require('./api-versioning/apiV1');

const app = express();
const port = 3000;

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1', apiV1);

app.listen(port, () => {
  console.log(`server is currently listening to port ${port}`);
});
