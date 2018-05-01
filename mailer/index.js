const mailer = require('./mailer');
const { promisify } = require('util');

const sendDownAlert = (to, from, body) => {
  const sendMailAsync = promisify(mailer.sendMail.bind(mailer));
  const email = {
    to,
    from,
    subject: 'One of your sites is down',
    text: body,
  };
  return sendMailAsync(email).catch((err) => {
    console.error(`Issue sending email
Email: ${JSON.stringify(email, null, 2)}
Error: ${err}`);
    throw err;
  });
};

module.exports = {
  sendDownAlert,
};
