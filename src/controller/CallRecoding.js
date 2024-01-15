const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.authToken ; 
const client = require('twilio')(TWILIO_ACCOUNT_SID, authToken);
  
exports.getCallRecordings=async(req,res)=>{
    client.recordings.list({limit: 20})
    .then(recordings => res.json({recordings:recordings}));
}

exports.getAllCallRecordings=async(req,res)=>{
    client.recordings.list()
    .then(recordings => res.json({recordings:recordings}));
}
