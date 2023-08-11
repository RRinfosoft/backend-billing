const Item = require("../models/itemModel");
const purchaseOrder = require("../models/purchaseOrder");
const ApiFeatures = require("../utils/apifeatures");
const multer = require("multer");




// create student --Admin


exports.createItem = (async (req, res, next) => {
    // req.body.image=req.file.filename
    // if (req.file) {
    //     req.body.image = req.file.filename;
    //   }
    const item = await Item.create(req.body);
    const purchase_Order = { ...req.body, createdDate: new Date() }
    await purchaseOrder.create(purchase_Order)
    // console.log(purchase_Order)
    res.status(201).json({
        success: true,
        item,
    });
});


exports.getAllitems = async (req, res) => {


    const apiFeature = new ApiFeatures(Item.find(), req.query).search().filter();

    const items = await apiFeature.query;

    res.status(200).json({
        success: true,
        items,
    });

}




exports.getAllPurchase = async (req, res) => {

    // const date1 = "2023-06-05T10:25:41.597+00:00";
    // const date2 = "2023-08-05T10:25:41.597+00:00";

    const date1 = new Date();
    const date2 = date1.setMonth(date1.getMonth() - 1)
    date1.setHours(0,0,0)
    // console.log(new Date(), date1, "rishi")
    const apiFeature = new ApiFeatures(purchaseOrder.find(
        {
            createdDate: {
                $gte: new Date(date1),
                $lte: new Date()
            }
        }

    ), req.query).search().filter();

    const purchase_Orders = await apiFeature.query;

    res.status(200).json({
        success: true,
        purchase_Orders,
    });

}

exports.getPurchaseDetailsByDate = async (req, res) => {

    // const date1 = "2023-06-05T10:25:41.597+00:00";
    // const date2 = "2023-08-05T10:25:41.597+00:00";
    // console.log(req.params,"deep")
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const date1 = new Date(startDate);
    // const date2 = date1.setMonth(date1.getMonth() - 1)
    const date2=new Date(endDate)
    // date1.setHours(0,0,0)

    const apiFeature = new ApiFeatures(purchaseOrder.find(
        {
            createdDate: {
                $gte: date1,
                $lte: date2
            }
        }

    ), req.query).search().filter();

    const purchase_Orders = await apiFeature.query;

    res.status(200).json({
        success: true,
        purchase_Orders,
    });

}


// get single item 

exports.getItemDetail = async (req, res, next) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
        return res.status(500).json({
            success: false,
            message: "Item not Found"
        });
    }

    res.status(200).json({
        success: true,
        item,
    })

};



exports.updateitem = async (req, res, next) => {
    let item = await Item.findById(req.params.id);

    if (!item) {
        // return next(new ErrorHandler("Item not found ", 404));
        return res.status(500).json({
            success: false,
            message: "Item not Found"
        });
    }
    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    if (res.status(200)) {
        const purchase_Order = { ...req.body, createdDate: new Date() }
        await purchaseOrder.create(purchase_Order)
    }
    res.status(200).json({
        success: true,
        item,
    });

}


exports.deleteItem = async (req, res, next) => {

    // req.body.student=req.student.id

    const item = await Item.findById(req.params.id);


    if (!item) {
        return res.status(500).json({
            success: false,
            message: "Item not Found"
        });
    }

    // ==========================================================================

    // another trick to delete one record

    await item.deleteOne({ _id: req.params.id });

    //   ===========================================================================

    // await Item.findOneAndDelete();

    res.status(200).json({
        success: true,
        message: "Item delete successfully",
    });
};