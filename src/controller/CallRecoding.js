const accountSid = process.env.accountSid;
const authToken = process.env.authToken ; 
const client = require('twilio')(accountSid, authToken);
  
exports.getCallRecordings=async(req,res)=>{
    client.recordings.list({limit: 20})
    .then(recordings => res.json({recordings:recordings}));
}

exports.getAllCallRecordings=async(req,res)=>{
    client.recordings.list()
    .then(recordings => res.json({recordings:recordings}));
}
