const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.USER_LOGIN,
    pass: process.env.USER_PASS,
    
  },secure:true
});

module.exports = transporter