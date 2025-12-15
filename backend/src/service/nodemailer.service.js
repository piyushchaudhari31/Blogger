const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "apikey", 
    pass: process.env.USER_PASS, 
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
