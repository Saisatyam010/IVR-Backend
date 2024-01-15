const BuyerModel = require("../../model/Add_Buyer_model");

exports.addBuyer = async (req, res) => {
    try {
        const data = req.body

        const buyerData = {
            campaign_name: data.campaign_name,
            buyer_name: data.buyer_name,
            destination_number: data.destination_number,
            distribution_weightage: 1,
            ring_timeout: data.ring_timeout,
            call_control_strategy: "Weightage",
            live_call_limit: data.live_call_limit,
            daily_call_limit: data.daily_call_limit,
            monthly_call_limit: data.monthly_call_limit,
            buyer_status: data.buyer_status,
            active_hours: data.active_hours,
            priority:data.priority,
            time_Taken:data.time_Taken,
            // userId:req.user._id

        }
        const mongoAdd = await BuyerModel.create(buyerData)
        console.log(mongoAdd);
        if (mongoAdd) {
            res.json({
                status: "success",
                message: "Buyer Data Add Sucessfully",
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


exports.getAllBuyer = async (req, res) => {
    try {
        const addBuyerMongo = await BuyerModel.find({})
        console.log(addBuyerMongo);
        if (addBuyerMongo) {
            res.json({
                status: "success",
                addBuyerMongo: addBuyerMongo
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

exports.deleteBuyerData = async (req, res) => {
    try {
        const buyer_id = req.params.buyer_id
        const delete_mongo = await BuyerModel.deleteOne({ _id: buyer_id })
        if (delete_mongo.deletedCount > 0) {
            res.json({
                status: "success",
                message: "Product Delete Succsssfully"
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


exports.updateBuyerData = async (req, res) => {
    try {
        const data = req.body;
       console.log(data);
        const buyer_id = req.params.buyer_id
        const update_data = {
            campaign_name: data.campaign_name,
            buyer_name: data.buyer_name,
            destination_number: data.destination_number,
            distribution_weightage: 1,
            ring_timeout: data.ring_timeout,
            call_control_strategy: "Weightage",
            live_call_limit: data.live_call_limit,
            daily_call_limit: data.daily_call_limit,
            monthly_call_limit: data.monthly_call_limit,
            buyer_status: data.buyer_status,
            active_hours: data.active_hours,
            priority:data.priority,
            time_Taken:data.time_Taken,
        }
        const update_mongo = await BuyerModel.updateOne({ _id: buyer_id }, update_data)
        if (update_mongo) {
            res.json({
                status:"success",
                message: "Buyer Updated Successfully",
                updateData: update_mongo
            })
        }
        else {
            res.json({
                status:"failure",
                message: "Something Went Wrong"
            })
        }
    }
    catch (error) {
        const resError = {}
        resError.status = "failed"
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



exports.singleBuyerData = async (req, res) => {
    try {
        const buyer_id = req.params.buyer_id
        let singleAddBuyer_mongo = await BuyerModel.findOne({ _id: buyer_id })

        
        if (singleAddBuyer_mongo) {
            res.json({
                status: "success",
                message: "Find  Successfully",
                singleBuyer: singleAddBuyer_mongo
            })
        }
        else {
            res.json({
                status: "Fail",
                message: "Not Found"
            })
        }
    }
    catch (error) {
        res.json({
            states: "Failed",
            message: "Error"

        })
    }
}
