const nodemailer = require('nodemailer')

const sendEmail = {
  // create a transporter - a service that sends email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD
    }
    // always remember to activate "less secure app" option
  })

  // define the email options

  // send the email
}