const nodemailer = require("nodemailer");
const dotenv = require("dotenv/config");

const { NODEMAILER_FROM_EMAIL, EMAIL_PASS } = process.env;
const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: NODEMAILER_FROM_EMAIL,
    pass: EMAIL_PASS,
  },
});

const sendEmail = (data) => {
  const email = { ...data, from: NODEMAILER_FROM_EMAIL };
  return transporter.sendMail(email);
};

module.exports = sendEmail;
