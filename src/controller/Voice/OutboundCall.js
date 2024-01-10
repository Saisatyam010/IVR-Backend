require('dotenv').config()


const accountSid = process.env.accountSid;
const authToken = process.env.authToken ;

 
const twilioPhoneNumber = process.env.twilioPhoneNumber;
const toPhoneNumber = process.env.toPhoneNumber;
const client = require('twilio')(accountSid, authToken);


exports.callToUser = async (req, res) => {
    const data = req.body
    console.log(data);
    client.calls
    .create({
       url: 'http://demo.twilio.com/docs/voice.xml',
       to: twilioPhoneNumber,
       from: toPhoneNumber
     })
    .then(call => res.json({status:200,message:"call sucess"}))
}