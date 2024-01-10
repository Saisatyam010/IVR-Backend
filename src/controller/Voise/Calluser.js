const voiseResept = require("twilio").twiml.VoiceResponse



exports.voicseSend = async(req,res)=>{
    const twiml = new voiseResept()
    twiml.say("hello for pals")
console.log(res);
    res.type('text/xml');
    res.send(twiml.toString());
}


