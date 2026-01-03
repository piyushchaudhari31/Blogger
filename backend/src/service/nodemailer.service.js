const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "mrpiyushchaudhari2006@gmail.com",
    pass: "fmrj ykxe rcau yibt",
  },
});

module.exports = transporter