const mongoose = require('mongoose')
const Collection = require('../config/Collection')
require("../config/Db")

const walletSchema = new mongoose.Schema({
        
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
    },
    wallet:{
        type:String,
       
    }
   

})

const   WalletModel = mongoose.model(Collection.wallet,walletSchema)
module.exports = WalletModel;
