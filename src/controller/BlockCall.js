const BlockModel = require("../model/Blockcall");

const accountSid = process.env.toPhoneNumber; 

exports.addBlockNumber = async (req, res) => {
    try {
        const data = req.body

        const blockData = {
            did:accountSid,
            customer_number: data.customer_number,
           
            

        }
        console.log(data);
        console.log(blockData);
        const mongoAdd = await BlockModel.create(blockData)
        console.log(mongoAdd);
        if (mongoAdd) {
            res.json({
                status: "success",
                message: "Block Number Sucessfully",
            })
        }
        else {
            res.json({
                status: "failed",
            })
        }
    } catch (error) {
        const resError = {}
        resError.status = "fail"
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            resError.error = errors;
        }
        res.json(resError)
    }
}



exports.getBlockNumber = async (req, res) => {
    try {
        const getblockMongo = await BlockModel.find({})
        
        if (getblockMongo) {
            res.json({
                status: "success",
                getblockMongo: getblockMongo
            })
        }
        else {
            res.json({
                status: "failed",
            })
        }
    }
    catch (error) {
        const resError = {}
        resError.status = "fail"
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            resError.error = errors;
        }
        res.json(resError)
    }
}




exports.deleteBlockNumber = async (req, res) => {
    try {
        const block_id = req.params.block_id
        console.log(block_id);
        const delete_mongo = await BlockModel.deleteOne({ _id: block_id })
        if (delete_mongo.deletedCount > 0) {
            res.json({
                status: "success",
                message: "Delete Succsssfully"
            })
        }
        else {
            res.json({
                status: "Failed",
                message: "Delete failed"
            })
        }
    }
    catch (error) {
        const resError = {}
        resError.status = "Failed"
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            resError.error = errors;
        }
        res.json(resError)
    }
}