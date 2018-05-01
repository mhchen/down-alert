const nodemailer = require('nodemailer');
const transport = require('nodemailer-sendgrid-transport');

const options = {
  auth: {
    api_user: process.env.SENDGRID_USER,
    api_key: process.env.SENDGRID_PASSWORD,
  },
};

module.exports = nodemailer.createTransport(transport(options));
