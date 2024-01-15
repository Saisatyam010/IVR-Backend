const mongoose = require('mongoose')
const Collection = require('../config/Collection')
require("../config/db")

const liveCallSchema = new mongoose.Schema({
    campaign:{type:String},
    did:{type:String},
    buyer:{type:String},
    target_number:{type:String},
    caller_id:{type:String},
    duration:{type:String},
    hangup:{type:String}

})

const LiveCallModel = mongoose.model(Collection.live_call,liveCallSchema)
module.exports = LiveCallModel;
