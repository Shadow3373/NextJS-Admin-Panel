const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.verify.v2
  .services("VA93050622ada4afa49ba053181d91e711")
  .verifications.create({ to: "+917299582073", channel: "sms" })
  .then((verification) => console.log(verification.sid));
