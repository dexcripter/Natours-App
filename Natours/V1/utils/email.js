const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // create a transporter - a service that sends email
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
      user: process.env.USERNAME_SMTP,
      pass: process.env.PASSWORD,
    },
    // always remember to activate "less secure app" option
  });

  // define the email options
  const mailOptions = {
    from: 'Johnpaul <hello@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
