const mailer = require('./mailer');
const { promisify } = require('util');
const sendMailAsync = promisify(mailer.sendMail.bind(mailer));

const send = (email) => {
  return sendMailAsync(email).catch((err) => {
    console.error(`Issue sending email
Email: ${JSON.stringify(email, null, 2)}
Error: ${err}`);
    throw err;
  });
};


const sendDownAlert = (to, from, body) => {
  const email = {
    to,
    from,
    subject: 'One of your sites is down',
    text: body,
  };
  return send(email);
};

const sendTestEmail = (to, from) => {
  const text = 'down-alert successfully polling your URLs';
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
