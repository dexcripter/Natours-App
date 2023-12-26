const nodemailer = require('nodemailer');

const sendEmail = (options) => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail', // using gmail

    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    // active the "less secure app" option in your email settings
  });

  // define the email options

  // send the email
};
