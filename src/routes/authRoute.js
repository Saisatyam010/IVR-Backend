const express = require('express');

const ivrRoute = express.Router()


const { welcomeCall, callSenator, fallBackNumber, goodBye, callStatus } = require('../controller/Voice/CallForwarding');
const { liveCallData } = require('../controller/Voice/Livecall');
const { addBuyer, getAllBuyer } = require('../controller/Voice/Buyer');
// admin login

// ivrRoute.post('/login', adminLogin)
// ivrRoute.post('/signup', adminSignup)
// ivrRoute.post('/callblock',blockCall)

// all buyer


ivrRoute.post('/addbuyer',addBuyer)
ivrRoute.get('/getAllBuyerDetail',getAllBuyer)

require('dotenv').config()

ivrRoute.get('/live-calls',liveCallData)

// call forverding 
 
ivrRoute.post('/call/welcome',welcomeCall);
ivrRoute.get('/call-senators', callSenator);
ivrRoute.post('/call-senators', callSenator);
ivrRoute.post('/fallback-number',fallBackNumber);
ivrRoute.post('/call-status',callStatus);

// Thank user & hang up.
ivrRoute.post('/goodbye',goodBye);










module.exports = ivrRoute;
