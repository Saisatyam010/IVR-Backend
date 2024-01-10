const express = require('express');
// const { adminLogin, adminSignup } = require('../controller/adminLoginPart/Admin_Login_collection');
// const { callCall } = require('../controller/Voise/Voisecall_colntroller');
// const { voicseSend } = require('../controller/Voise/Calluser');
const ivrRoute = express.Router()
const twilio = require('twilio');
const { liveCallData } = require('../controller/Livecall_collection');
const { addBuyer, getAllBuyer } = require('../controller/Add_Buyer_collection');
// const { blockCall } = require('../controller/block_collection');
// const { blockCall } = require('../controller/block_collection');
// const { addBuyer } = require('../controller/adminLoginPart/Add_Buyer_collection');
// admin login

// ivrRoute.post('/login', adminLogin)
// ivrRoute.post('/signup', adminSignup)
// ivrRoute.post('/callblock',blockCall)

// all buyer


ivrRoute.post('/addbuyer',addBuyer)
ivrRoute.get('/getAllBuyerDetail',getAllBuyer)

require('dotenv').config()

ivrRoute.get('/live-calls',liveCallData)

const accountSid = process.env.accountSid;
const authToken = process.env.authToken ;


//call


const client = require('twilio')(accountSid, authToken);



ivrRoute.post('/call/welcome', (req, res) => {
  // console.log(req);
  const response = new twilio.twiml.VoiceResponse();
  const gather = response.gather({
    numDigits: 1,
    action: '/auth/callcongress/call-senators',
    method: 'POST'
  });
  gather.say("Thank you for calling Twriilo! " +
    "We are connecting with you senator");
  return res.redirect('/auth/callcongress/call-senators/')
});







function callSenator(req, res) {
  const response = new twilio.twiml.VoiceResponse();
  response.say("Connecting you to " + "Ashok " + ". ");
  response.dial(+919319344723, {
    action: '/auth/call-status',
    method:'POST',
    
  });
  res.set('Content-Type', 'text/xml');
  return res.send(response.toString());
}



// Route for connecting caller to both of their senators.
ivrRoute.get('/callcongress/call-senators', callSenator);
ivrRoute.post('/callcongress/call-senators', callSenator);



// function callSecondSenator(req, res) {
//   const digitsProvided = req.body.Digits;

//   if (digitsProvided === '1') {
//     const response = new twilio.twiml.VoiceResponse();
//     response.say("Connecting you to " + "Ashok " + ". ");
//     response.dial(+919319344723, {
//       action: '/callcongress/goodbye/',
     
//     });
//     res.set('Content-Type', 'text/xml');
//     return res.send(response.toString());
//   }


//   if (digitsProvided === '2') {
//     const response = new twilio.twiml.VoiceResponse();
//     response.say("Connecting you to " + "Abhinandan " + ". ");
//     response.dial(+919319344723, {
//       action: '/callcongress/goodbye/'
//     });
//     res.set('Content-Type', 'text/xml');
//     return res.send(response.toString());
//   }

// }
// // Forward the caller to their second senator.
// ivrRoute.get('/callcongress/call-second-senator/:senator_id', callSecondSenator);
// ivrRoute.post('/callcongress/call-second-senator/:senator_id', callSecondSenator);
ivrRoute.post('/fallback-number', (req, res) => {
  console.log(req);
  const twiml = new twilio.twiml.VoiceResponse();

  // If the first number is busy, forward the call to the second number
  const secondNumber = '+919315890034'; // Replace with the second forwarding number
  twiml.dial(secondNumber,{
    action: '/auth/goodbye',
    method:'POST',
  });

  res.type('text/xml');
  res.send(twiml.toString());
});
ivrRoute.post('/call-status', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const callStatus=req.body.CallStatus
  console.log(callStatus+"call status")
  if (callStatus === 'in-progress') {
    const secondNumber = '+919315890034'; // Replace with the second forwarding number
    twiml.dial(secondNumber);
  }

  res.type('text/xml');
  res.send(twiml.toString())
});

// Thank user & hang up.
ivrRoute.post('/goodbye', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  console.log(response + " " + " good byy have a save day bhai");
  response.say("Thank you for using Twrilo! " +
    "Your voice makes a difference. Goodbye.");
  response.hangup();
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});










module.exports = ivrRoute;
