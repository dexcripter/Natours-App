const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transit
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  //   2) Defining email options
  const mailOptions = {
    from: 'Johnpaul',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  //  3) Sending the email

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
