require('dotenv').config();



const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.authToken ;
 
const client = require('twilio')(TWILIO_ACCOUNT_SID, authToken);
exports.getCallHistory=async (req, res) => {
    try {
       const startTime=req.query.startDate;
       const endTime=req.query.endDate;
       console.log(startTime,endTime+"startTime")

       const calls = await client.calls.list({

        // Add your filters here
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      });

      
      res.status(200).json({callHistory:calls});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }