
const accountSid = 'ACab1d56676b71cbf426b095165002b7eb';
const authToken = '0c11de0beccc8e9587f561fdeec644e3';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'testing for scott?',
     from: '+12267991117',
     to: '+14039782967'
   })
  .then(message => console.log(message.sid));