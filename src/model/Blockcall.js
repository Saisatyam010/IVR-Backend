const mongoose = require('mongoose')
const Collection = require('../config/Collection')
require('../config/Db')

const blockSchema = new mongoose.Schema({
   
    did:{type:String},
    customer_number:{type:String}
     
})

const BlockModel = mongoose.model(Collection.block,blockSchema)


module.exports = BlockModel