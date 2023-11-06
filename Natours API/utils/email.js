const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) CREATE A TRANSPORTER

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail "less secure app" option
  });
  // 2) DEFINE THE EMAIL OPTIONS
  const mailOptions = {
    from: 'Johnpaul Nnaji <indisputable.jay@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.email,
    // html
  };
  // 3) SENDING THE EMAIL WITH NODEMAILER
  await transporter.sendMail({ mailOptions });
};

module.exports = sendEmail;
