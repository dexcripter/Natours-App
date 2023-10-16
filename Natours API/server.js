const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// SERVER
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
