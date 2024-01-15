require('dotenv').config()


const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.authToken ;

 
const twilioPhoneNumber = process.env.twilioPhoneNumber;
const toPhoneNumber = process.env.toPhoneNumber;
const client = require('twilio')(TWILIO_ACCOUNT_SID, authToken);


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