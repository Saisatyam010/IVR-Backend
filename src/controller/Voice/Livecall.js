require('dotenv').config()
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.authToken ;


const client = require('twilio')(TWILIO_ACCOUNT_SID, authToken);

exports.liveCallData = async (req, res) => {
    try {
      const calls = await client.calls.list({
        status: 'in-progress',
      });
      if(calls.length>0){
        res.json({calls:calls});
      }else{
        res.json({calls:[]})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }