const mongoose = require('mongoose')
const Collection = require('../config/Collection')
require('../config/Db')

const buyerSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    campaign_name:{type:String},
    buyer_name:{type:String},
    destination_number:{type:String},
    distribution_weightage:{type:Number},
    ring_timeout:{type:String},
    call_control_strategy:{type:String},
    live_call_limit:{type:String},
    daily_call_limit:{type:String},
    monthly_call_limit:{type:String},
    buyer_status:{type:String},
    active_hours:{type:String},

})

const BuyerModel = mongoose.model(Collection.Buyer,buyerSchema)


module.exports = BuyerModel