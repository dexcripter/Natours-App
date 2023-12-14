/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(app.get('env'));
// console.log(process.env);

mongoose
  .connect(process.env.DATABASE, {})
  .then((con) => console.log('Connected to the databsae 🚀'))
  .catch((err) =>
    console.log('oops, there was an error connecting to the database. 🔥')
  );

const port = 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
