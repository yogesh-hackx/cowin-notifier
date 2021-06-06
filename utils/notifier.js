const twilio = require('twilio');

const authToken = process.env.AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const accountSid = process.env.ACC_SID; // Your Account SID from www.twilio.com/console

const sendNotif = async (message = 'ping!', to) => {
  // eslint-disable-next-line new-cap
  const client = new twilio(accountSid, authToken);

  const res = await client.messages.create({
    body: message,
    from: 'whatsapp:+14155238886', // From a valid Twilio number
    to: `whatsapp:${to}`, // Text this number
  });

  console.log(res.sid);
};

module.exports = sendNotif;
