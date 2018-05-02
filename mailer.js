const { promisify } = require('util');
const nodemailer = require('nodemailer');
const transport = require('nodemailer-sendgrid-transport');

const options = {
  auth: {
    api_key: process.env.SENDGRID_API_KEY,
  },
};

const mailer = nodemailer.createTransport(transport(options));
const sendMailAsync = promisify(mailer.sendMail.bind(mailer));

const send = email => (
  sendMailAsync(email).catch((err) => {
    console.error(`Issue sending email
Email: ${JSON.stringify(email, null, 2)}
Error: ${err}`);
    throw err;
  })
);


const sendDownAlert = (to, from, url, body) => {
  const email = {
    to,
    from,
    subject: `[Down alert] ${url} is down`,
    text: body,
  };
  return send(email);
};

const sendTestEmail = (to, from, urls) => {
  const text = `[Down alert] successfully polling URLs: ${urls.join(', ')}`;
  const email = {
    to,
    from,
    subject: text,
    text,
  };
  return send(email);
};

module.exports = {
  sendDownAlert,
  sendTestEmail,
};
