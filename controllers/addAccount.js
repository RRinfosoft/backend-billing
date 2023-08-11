const Account = require("../models/addAccount");



// create category --Admin
exports.createAccount = (async (req, res, next) => {
    const account = await Account.create(req.body);

    res.status(201).json({
        success: true,
        account,

    });
});




exports.getAllaccount = async (req, res) => {
    const accounts = await Account.find();
    res.status(200).json({
        success: true,
        accounts,
    });

}

// get single item 

exports.getAccountDetail = async (req, res, next) => {
    const account = await Account.findById(req.params.id);

    if (!account) {
        return res.status(500).json({
            success: false,
            message: "Account not Found"
        });
    }

    res.status(200).json({
        success: true,
        account,
    })

};




exports.updateAccount = async (req, res, next) => {
    let account = await Account.findById(req.params.id);

    if (!account) {
        return res.status(500).json({
            success: false,
            message: "Account not Found"
        });
    }
    account = await Account.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        account,
    });

}


exports.deleteAccount = async (req, res, next) => {

    // req.body.student=req.student.id
    // console.log(res.params)
    const account = await Account.findById(req.params.id);
   

    if (!account) {
        return next(new ErrorHandler("Account not found ", 404));
    }

    // ==========================================================================

    // another trick to delete one record

    await account.deleteOne({_id:req.params.id});

    //   ===========================================================================

    // await Item.findOneAndDelete();

    res.status(200).json({
        success: true,
        message: "Account delete successfully",
    });
};