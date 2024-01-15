const mongoose = require('mongoose')
const Collection = require('../config/Collection')
require("../config/Db")

const userCallSchema = new mongoose.Schema({
        
    customer_number:{
        type:String,
       
    },
    buyer_number:{
        type:String,
       
    }
   

})

const   UserCallDataModel = mongoose.model(Collection.callData,userCallSchema)
module.exports = UserCallDataModel;
