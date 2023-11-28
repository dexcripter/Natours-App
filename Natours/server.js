/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(app.get('env'));
// console.log(process.env);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => console.log('Connected to the databsae 🚀'));

const port = 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
