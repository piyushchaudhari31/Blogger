const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "9cd389001@smtp-brevo.com",
    pass: "xsmtpsib-7040ac0a91e705fc3ebb414778bad58154170218d4a06e87d7b100d760dc12b4-QNQMmKE1HJ3SXFei",
  },
});

module.exports = transporter