const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'hoaro57@gmail.com',
      pass: 'poxt xsey tzxq toka'
    }
  });

module.exports = { transporter };
