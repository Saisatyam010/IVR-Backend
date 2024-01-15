const express = require('express');

const ivrRoute = express.Router()


const { welcomeCall, callSenator, fallBackNumber, goodBye, callStatus, incomingCall, handleForwardCall } = require('../controller/Voice/CallForwarding');
const { liveCallData } = require('../controller/Voice/Livecall');
const { addBuyer, getAllBuyer } = require('../controller/Voice/Buyer');
const { getCallHistory } = require('../controller/Voice/CallHistory');
const { addBlockNumber, getBlockNumber, deleteBlockNumber } = require('../controller/BlockCall');
const { callVoise, callWisper } = require('../controller/Voice/CallBearging');
const { getCallRecordings, getAllCallRecordings } = require('../controller/CallRecoding');
// admin login

// ivrRoute.post('/login', adminLogin)
// ivrRoute.post('/signup', adminSignup)
// ivrRoute.post('/callblock',blockCall)

// all buyer


ivrRoute.post('/addbuyer', addBuyer)
ivrRoute.get('/getAllBuyerDetail', getAllBuyer)

require('dotenv').config()

ivrRoute.get('/live-calls', liveCallData)

// call forverding 

ivrRoute.post('/incoming-call', incomingCall);
ivrRoute.post('/handle-forward-call', handleForwardCall);
ivrRoute.get('/handle-forward-call', handleForwardCall);
ivrRoute.get('/call-senators', callSenator);
ivrRoute.post('/call-senators', callSenator);
ivrRoute.post('/fallback-number', fallBackNumber);
ivrRoute.post('/call-status', callStatus);

// block calls

ivrRoute.post('/call-block', addBlockNumber)
ivrRoute.get('/all-blocks', getBlockNumber);
ivrRoute.delete('/delete-blocks/:block_id', deleteBlockNumber);


// Thank user & hang up.
ivrRoute.post('/goodbye', goodBye);

//call history

ivrRoute.get('/call-history', getCallHistory);



ivrRoute.get("/call-recording",getCallRecordings)
ivrRoute.get("/all-call-recording",getAllCallRecordings)

// ivrRoute.post('/voice', callVoise);

// ivrRoute.post('/whisper', callWisper);





module.exports = ivrRoute;
