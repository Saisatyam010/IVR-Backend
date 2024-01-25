const WalletModel = require("../../model/Wallet");

exports.addWallet = async (req, res) => {
    const data = req.body
    console.log(data);

    const data_come = {
        userId: data.userId,
        amount: data.amount,
        type: data.type,
        status: data.status,
        date: data.date,
    }



    try {
        const ress = await WalletModel.create(data_come)
        console.log(ress);

        if (ress) {
            res.json({
                status: "success",
                message: "Wallet added sucessfully",
                data: ress,

            })
        }
        else {
            res.json({
                status: "fail",
            })
        }
    } catch (error) {
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

exports.getWallet = async (req, res) => {

    try {
        const ress = await WalletModel.find({})
        if (ress) {
            res.json({
                status: "success",
                message: "Wallet get sucessfully",
                data: ress,

            })
        }
        else {
            res.json({
                status: "fail",
            })
        }
    } catch (error) {
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


exports.updateWallet = async (req, res) => {
    const data = req.body
    console.log(data);
try{
    const data_come = {
        userId: data.userId,
        amount: data.amount,
        type: data.type,
        status: data.status,
        date: data.date,
    }

    const res = await   WalletModel.findByIdAndUpdate(data.id, data_come)
    console.log(res);
    if(res){
        res.json({
            status: "success",
            message: "Wallet updated sucessfully",
            data: res,

        })
    }
    else{
        res.json({
            status: "fail",
        })
    }
}catch(error){
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