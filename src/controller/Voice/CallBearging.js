const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.authToken ;
const client = twilio(TWILIO_ACCOUNT_SID, authToken);

exports.callVoise =  (req, res) => {
    const conferenceName = "Ashok";
    const twiml = new twilio.twiml.VoiceResponse();
  
    twiml.dial().conference(conferenceName);
  
    res.type('text/xml');
    res.send(twiml.toString());
  }
 
exports.callWisper =  (req, res) => {
    const agentName = req.params.agentName;
    const conferenceName = req.params.conferenceName || 'DefaultConference';
    const twiml = createWhisperTwiML("Ump", "Ashok");
  
    res.type('text/xml');
    res.send(twiml);
  }

  function createWhisperTwiML(agentName, conferenceName) {
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say(`You are now joining the call with ${agentName}`);
    twiml.dial().conference(conferenceName);
  
    return twiml.toString();
  }