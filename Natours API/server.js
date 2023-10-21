const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   /<PASSWORD>/,
//   process.env.DATABASE_PASSWORD,
// );

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
  })
  .catch(() => {
    console.log('There was an error');
  });
const app = require('./app');

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
