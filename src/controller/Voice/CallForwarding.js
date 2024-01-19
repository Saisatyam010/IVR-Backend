const twilio = require("twilio");
const BuyerModel = require("../../model/Add_Buyer_model");
const UserCallDataModel = require("../../model/Usercalldata");
require("dotenv").config();
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.authToken;
const client = twilio(TWILIO_ACCOUNT_SID, authToken);

let forwardCallers = []
exports.incomingCall = async (req, res) => {
  // console.log(JSON.stringify(req.body)+"phone number");
  const twiml = new twilio.twiml.VoiceResponse();



  const addcallData = await UserCallDataModel.findOne({ customer_number: req.body.From })
  console.log(addcallData + "addcallData");
  if (addcallData) {
    forwardCallers.push(addcallData.buyer_number)
    twiml.dial({
      action: '/auth/handle-forward-call',
      method: 'POST',
      record: 'record-from-answer',
      timeout: 10
    }, addcallData.buyer_number)
  } else {
    const buyers = await BuyerModel.find({})
    // Retrieve forwardcaller priority and status from the database
    const forwardCaller = buyers.filter((caller) => !forwardCallers.includes(caller) && caller.buyer_status !== false)
      .sort((a, b) => a.priority - b.priority)[0];

    if (forwardCaller) {
      forwardCallers.push(forwardCaller.destination_number)
      twiml.dial({
        action: '/auth/handle-forward-call',
        method: 'POST',
        record: 'record-from-answer',
        timeout: 10
      }, forwardCaller.destination_number)

    }
    else {
      twiml.say('All executives are busy Please try again later');
      twiml.hangup();
    }

  }


  // twiml.dial().conference('MyConference', {
  //   startConferenceOnEnter: true,
  //   endConferenceOnExit: true,
  // });
  // const twimll = new VoiceResponse();

  //res.redirect('/auth/forward-and-join-conference');
  res.type('text/xml');
  res.send(twiml.toString());
}
exports.handleForwardCall = async (req, res) => {
  // console.log(JSON.stringify(req.body), "body");
  const callStatus = req.body.DialCallStatus
  // console.log(callStatus, "callStatus");
  const twiml = new twilio.twiml.VoiceResponse();
  if (callStatus == "completed") {


    const call = await client.calls.list({ limit: 1 })

    const addcallData = await UserCallDataModel.find({ customer_number: call[0].from })
    console.log(addcallData);

    if (addcallData.length == 0) {
      const addcallData = await UserCallDataModel.create({ customer_number: call[0].from, buyer_number: call[0].to })

    }
    else {
      const addcallData = await UserCallDataModel.updateOne({ customer_number: call[0].from }, { buyer_number: call[0].to })
    }
    // console.log(call+"call");

    twiml.say('Thank you for calling');
    forwardCallers = [];
    twiml.hangup();
  }
  else if (callStatus === 'no-answer' || callStatus === 'busy') {
    const buyers = await BuyerModel.find({})
    const nextForwardCaller = buyers.filter((caller) => !forwardCallers.includes(caller.destination_number) && caller.buyer_status !== false)
      .sort((a, b) => a.priority - b.priority)[0];
    if (nextForwardCaller) {
      forwardCallers.push(nextForwardCaller.destination_number)
      twiml.dial({
        action: '/auth/handle-forward-call',
        method: 'POST',
        timeout: 10
      }, nextForwardCaller.destination_number);
    }
    else {
      forwardCallers = [];
      twiml.say('All executives are busy Please try again later');
      twiml.hangup();
    }
  }
  else {
    forwardCallers = []
    twiml.say('Something Went Wrong');
    twiml.hangup();
  }
  res.type('text/xml');
  res.send(twiml.toString());
}
exports.callSenator = (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('Please wait while we connect your call')
  const dial = response.dial();
  dial.number({
    statusCallbackEvent: 'completed',
    statusCallback: 'https://be84-103-216-143-60.ngrok-free.app/auth/goodBye',
    url: 'https://be84-103-216-143-60.ngrok-free.app/auth/goodBye',
    method: 'POST',
  }, '+919319344723');
  // twiml.dial(+919319344723,{
  //     action:'/auth/call-status',
  //     timeout:20,
  // });
  res.set('Content-Type', 'text/xml');
  res.send(twiml.toString());
}
exports.fallBackNumber = (req, res) => {
  console.log(req);
  const twiml = new twilio.twiml.VoiceResponse();
  // If the first number is busy, forward the call to the second number
  const secondNumber = '+919315890034'; // Replace with the second forwarding number
  twiml.dial(secondNumber, {
    action: '/auth/goodbye',
    method: 'POST',
  });
  res.type('text/xml');
  res.send(twiml.toString());
}
exports.goodBye = (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const callStatus = req.body.DialCallStatus

  if (callStatus === 'no-answer' || callStatus === 'busy') {
    twiml.say('All executives are busy Please try again later');
    twiml.hangup();

  }
  console.log(twiml + " " + " good byy have a save day bhai");
  twiml.say("Thank you for using Twrilo! " +
    "Your voice makes a difference. Goodbye.");
  twiml.hangup();
  res.set('Content-Type', 'text/xml');
  res.send(twiml.toString());
}
exports.callStatus = (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const callStatus = req.body.DialCallStatus
  console.log(callStatus, "callStatus");
  if (callStatus === 'no-answer' || callStatus === 'busy') {
    twiml.say('Please wait all lines are busy')
    const secondNumber = '+919315890034';
    twiml.dial(secondNumber, {
      action: '/auth/goodbye',
      method: 'POST',
    });
  }
  else {
    twiml.say('Thank u for calling')
    twiml.hangup();
  }
  res.type('text/xml');
  res.send(twiml.toString())
}
exports.voicseSend = async (req, res) => {
  const twiml = new voiseResept()
  twiml.say("hello for pals")
  console.log(res);
  res.type('text/xml');
  res.send(twiml.toString());
}

exports.recoding = () => {

}