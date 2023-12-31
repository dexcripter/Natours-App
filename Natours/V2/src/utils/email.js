const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail', // using gmail
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    // active the "less secure app" option in your email settings if you use gmail
  });

  // define the email options
  const details = {
    from: 'Johnpaul <indisputable.jay@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // send the email
  await transporter.sendMail(details);
};

module.exports = sendEmail;
