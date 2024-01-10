const mongoose = require('mongoose')
mongoose.connect(`mongodb://127.0.0.1:27017/twirilo`,{
    useNewUrlParser:true,useUnifiedTopology:true 
})

//  mongodb://127.0.0.1:27017 