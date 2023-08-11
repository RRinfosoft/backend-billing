const Unit = require("../models/unitModal");
const unithistory = require("../models/unithistory");
const ApiFeatures = require("../utils/apifeatures");
const multer = require("multer");




// create student --Admin


exports.createUnit = (async (req, res, next) => {
    // req.body.image=req.file.filename
    // if (req.file) {
    //     req.body.image = req.file.filename;
    //   }
    const unit = await Unit.create(req.body);
    const unit_history = { ...req.body, createdDate: new Date() }
    await unithistory.create(unit_history)
    // console.log(purchase_Order)
    res.status(201).json({
        success: true,
        unit,
    });
});


exports.getAllUnits = async (req, res) => {


    const apiFeature = new ApiFeatures(Unit.find(), req.query).search().filter();

    const units = await apiFeature.query;

    res.status(200).json({
        success: true,
        units,
    });

}




exports.getAllUnitHistory = async (req, res) => {

    // const date1 = "2023-06-05T10:25:41.597+00:00";
    // const date2 = "2023-08-05T10:25:41.597+00:00";

    const date1 = new Date();
    const date2 = date1.setMonth(date1.getMonth() - 1)
    date1.setHours(0,0,0)
    // console.log(new Date(), date1, "rishi")
    const apiFeature = new ApiFeatures(unithistory.find(
        {
            createdDate: {
                $gte: new Date(date1),
                $lte: new Date()
            }
        }

    ), req.query).search().filter();

    const allunit_history = await apiFeature.query;

    res.status(200).json({
        success: true,
        allunit_history,
    });

}

exports.getUnitHistoryDetailsByDate = async (req, res) => {

    // const date1 = "2023-06-05T10:25:41.597+00:00";
    // const date2 = "2023-08-05T10:25:41.597+00:00";
    // console.log(req.params,"deep")
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const date1 = new Date(startDate);
    // const date2 = date1.setMonth(date1.getMonth() - 1)
    const date2=new Date(endDate)
    // date1.setHours(0,0,0)

    const apiFeature = new ApiFeatures(unithistory.find(
        {
            createdDate: {
                $gte: date1,
                $lte: date2
            }
        }

    ), req.query).search().filter();

    const allunit_history = await apiFeature.query;

    res.status(200).json({
        success: true,
        allunit_history,
    });

}


// get single item 

exports.getUnit = async (req, res, next) => {
    const unit = await Unit.findById(req.params.id);

    if (!unit) {
        return res.status(500).json({
            success: false,
            message: "Unit not Found"
        });
    }

    res.status(200).json({
        success: true,
        unit,
    })

};



exports.updateunit = async (req, res, next) => {
    let unit = await Unit.findById(req.params.id);

    if (!unit) {
        // return next(new ErrorHandler("Item not found ", 404));
        return res.status(500).json({
            success: false,
            message: "Unit not Found"
        });
    }
    unit = await Unit.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    if (res.status(200)) {
        const unit_history = { ...req.body, createdDate: new Date() }
        await unithistory.create(unit_history)
    }
    res.status(200).json({
        success: true,
        unit,
    });

}


exports.deleteUnit = async (req, res, next) => {

    // req.body.student=req.student.id

    const unit = await Unit.findById(req.params.id);


    if (!unit) {
        return res.status(500).json({
            success: false,
            message: "Unit not Found"
        });
    }

    // ==========================================================================

    // another trick to delete one record

    await unit_history.deleteOne({ _id: req.params.id });

    //   ===========================================================================

    // await Item.findOneAndDelete();

    res.status(200).json({
        success: true,
        message: "Unit delete successfully",
    });
};