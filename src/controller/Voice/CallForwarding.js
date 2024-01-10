const twilio = require("twilio")

exports.welcomeCall= (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse(); 
    twiml.say("Thank you for calling Twriilo! " +
      "We are connecting with you senator");
    return res.redirect('/auth/call-senators/')
  }
exports.callSenator=(req, res)=> {
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.dial(+919319344723,{
        action:'/auth/call-status',
        
    });
    twiml.say('goodbye')
    twiml.asnwerOnBridge=true
    res.set('Content-Type', 'text/xml');
   
    res.send(twiml.toString());

  }
  
  
exports.fallBackNumber= (req, res) => {
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
  }


exports.goodBye= (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();
    console.log(twiml + " " + " good byy have a save day bhai");
    twiml.say("Thank you for using Twrilo! " +
      "Your voice makes a difference. Goodbye.");
      twiml.hangup();
    res.set('Content-Type', 'text/xml');
    res.send(twiml.toString());
  }

exports.callStatus= (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();
    const callStatus=req.body.DialCallStatus
    twiml.say('please wait all lines are bisi')
    if (callStatus === 'no-answer' || callStatus === 'busy') {
      const secondNumber = '+919315890034';  
      twiml.dial(secondNumber,{
        action: '/auth/goodbye',
        method:'POST',
      });
    }
  
    res.type('text/xml');
    res.send(twiml.toString())
  }



exports.voicseSend = async(req,res)=>{
    const twiml = new voiseResept()
    twiml.say("hello for pals")
console.log(res);
    res.type('text/xml');
    res.send(twiml.toString());
}


