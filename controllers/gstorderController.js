const Order = require("../models/gstorderModel");
const ItemModel = require("../models/itemModel");
const GSTOrderHistory = require("../models/GSTSalehistory")
const GSTUnitOrder = require("../models/gstUnitOrder")
const GSTUnitOrderHistry = require("../models/gstUnitOrderHistory")

const ApiFeatures = require("../utils/apifeatures");



// create student --Admin
exports.createOrder = (async (req, res, next) => {

    const order = { ...req.body, createdDate: new Date() }
    await Order.create(order)
    // const order = await Order.create(req.body);
    const gstsalehistory = { ...req.body, createdDate: new Date() }
    await GSTOrderHistory.create(gstsalehistory)

    req.body.Items.forEach(async (product) => {
        const productId = product.productId;


        const item = await ItemModel.findById(productId);
        const totalQuantity = item.stock;
        const quantity = product.quantity
        const remaningQuantity = totalQuantity - quantity

        // console.log(remaningQuantity, "lucky")
        const items = await ItemModel.findByIdAndUpdate(productId, { stock: remaningQuantity }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

    });

    res.status(201).json({
        success: true,
        order,
    });
});

////////////////////////////////////////

exports.createUnitSaleOrder = (async (req, res, next) => {

    const gstsaleorder = { ...req.body, createdDate: new Date() }
    await GSTUnitOrder.create(gstsaleorder)
    // const order = await Order.create(req.body);
    const gstunitsalehistory = { ...req.body, createdDate: new Date() }
    await GSTUnitOrderHistry.create(gstunitsalehistory)

    req.body.Items.forEach(async (product) => {
        const productId = product.productId;


        const item = await ItemModel.findById(productId);
        const totalQuantity = item.stock;
        const quantity = product.quantity
        const remaningQuantity = totalQuantity - quantity

        // console.log(remaningQuantity, "lucky")
        const items = await ItemModel.findByIdAndUpdate(productId, { stock: remaningQuantity }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

    });

    res.status(201).json({
        success: true,
        gstsaleorder,
    });
});

/////////////////////////////////////////////////////////////////////////////////////

exports.getAllOrder = async (req, res) => {
    const orders = await Order.find();
    res.status(200).json({
        success: true,
        orders,
    });

}
///////////////////////////////////////////////

exports.getAllUnitSaleOrder = async (req, res) => {
    const GStUnitorders = await GSTUnitOrder.find();
    res.status(200).json({
        success: true,
        GStUnitorders,
    });

}

///////////////////////////////////////////////////////


exports.getGSTSaleHistory = async (req, res) => {

    // const date1 = "2023-06-05T10:25:41.597+00:00";
    // const date2 = "2023-08-05T10:25:41.597+00:00";

    const date1 = new Date();
    const date2 = date1.setMonth(date1.getMonth() - 1)
    date1.setHours(0, 0, 0)
    // console.log(new Date(), date1, "rishi")
    const apiFeature = new ApiFeatures(GSTOrderHistory.find(
        {
            createdDate: {
                $gte: new Date(date1),
                $lte: new Date()
            }
        }

    ), req.query).search().filter();

    const gstsalehistory_orders = await apiFeature.query;

    res.status(200).json({
        success: true,
        gstsalehistory_orders,
    });

}
//////////////////////////////////////////////////////////////////////




exports.getGSTUnitSaleHistory = async (req, res) => {

    // const date1 = "2023-06-05T10:25:41.597+00:00";
    // const date2 = "2023-08-05T10:25:41.597+00:00";

    const date1 = new Date();
    const date2 = date1.setMonth(date1.getMonth() - 1)
    date1.setHours(0, 0, 0)
    // console.log(new Date(), date1, "rishi")
    const apiFeature = new ApiFeatures(GSTUnitOrderHistry.find(
        {
            createdDate: {
                $gte: new Date(date1),
                $lte: new Date()
            }
        }

    ), req.query).search().filter();

    const gstunitsalehistory_orders = await apiFeature.query;

    res.status(200).json({
        success: true,
        gstunitsalehistory_orders,
    });

}
///////////////////////////////////////////////////////

exports.getGSTSAleDetailsByDate = async (req, res) => {

    // const date1 = "2023-06-05T10:25:41.597+00:00";
    // const date2 = "2023-08-05T10:25:41.597+00:00";
    // console.log(req.params,"deep")
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const date1 = new Date(startDate);
    // const date2 = date1.setMonth(date1.getMonth() - 1)
    const date2 = new Date(endDate)
    // date1.setHours(0,0,0)

    const apiFeature = new ApiFeatures(gstsalehistory.find(
        {
            createdDate: {
                $gte: date1,
                $lte: date2
            }
        }

    ), req.query).search().filter();

    const gstsalehistory_orders = await apiFeature.query;

    res.status(200).json({
        success: true,
        gstsalehistory_orders,
    });

}
///////////////////////////////////////////////////////

exports.getGSTUnitSaleDetailsHistoryByDate = async (req, res) => {

    // const date1 = "2023-06-05T10:25:41.597+00:00";
    // const date2 = "2023-08-05T10:25:41.597+00:00";
    // console.log(req.params,"deep")
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const date1 = new Date(startDate);
    // const date2 = date1.setMonth(date1.getMonth() - 1)
    const date2 = new Date(endDate)
    // date1.setHours(0,0,0)

    const apiFeature = new ApiFeatures(GSTUnitOrderHistry.find(
        {
            createdDate: {
                $gte: date1,
                $lte: date2
            }
        }

    ), req.query).search().filter();

    const gstunitsalehistory_orders = await apiFeature.query;

    res.status(200).json({
        success: true,
        gstunitsalehistory_orders,
    });

}
////////////////////////////////////////////////////////////
// get single item 

exports.getOrderDetail = async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(500).json({
            success: false,
            message: "Order not Found"
        });
    }

    res.status(200).json({
        success: true,
        order,
    })

};

//////////////////////////////////////////////



/////////////////////////////////////////////

exports.getGstUnitOrderDetail = async (req, res, next) => {
    const gstunitorder = await GSTUnitOrder.findById(req.params.id);

    if (!gstunitorder) {
        return res.status(500).json({
            success: false,
            message: "Order not Found"
        });
    }

    res.status(200).json({
        success: true,
        gstunitorder,
    })

};
/////////////////////////////////

exports.getGstUnitOrderHistoryDetail = async (req, res, next) => {
    const gstunitorderhistory = await GSTUnitOrderHistry.findById(req.params.id);

    if (!gstunitorderhistory) {
        return res.status(500).json({
            success: false,
            message: "Order not Found"
        });
    }

    res.status(200).json({
        success: true,
        gstunitorderhistory,
    })

};


exports.updateOrder = async (req, res, next) => {
    let order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(500).json({
            success: false,
            message: "order not Found"
        });
    }
    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        order,
    });

}

exports.updateGstBagSaleOrder = async (req, res, next) => {
    let gstbagsale = await GSTUnitOrder.findById(req.params.id);

    if (!gstbagsale) {
        return res.status(500).json({
            success: false,
            message: "BagSale not Found"
        });
    }
    gstbagsale = await GSTUnitOrder.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        gstbagsale,
    });

}
// exports.updateOrderStatus = async (req, res, next) => {
//   try {
//     const orderId = req.params.id;
//     const { newStatus } = req.body;
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { Status: newStatus },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       order: updatedOrder,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update order status',
//     });
//   }
// };

exports.deleteGstUnitOrder = async (req, res, next) => {

    // req.body.student=req.student.id
    const gstunitorder = await GSTUnitOrder.findById(req.params.id);

    if (!gstunitorder) {
        return next(new ErrorHandler("Order Not Found ", 404));
    }

    // ==========================================================================

    // another trick to delete one record

    await GSTUnitOrder.deleteOne({ _id: req.params.id });

    //   ===========================================================================

    // await Order.findOneAndDelete();

    res.status(200).json({
        success: true,
        message: "Order delete successfully",
    });
};
////////////////////////////////////

exports.deleteOrder = async (req, res, next) => {

    // req.body.student=req.student.id
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found ", 404));
    }

    // ==========================================================================

    // another trick to delete one record

    await order.deleteOne({ _id: req.params.id });

    //   ===========================================================================

    // await Order.findOneAndDelete();

    res.status(200).json({
        success: true,
        message: "Order delete successfully",
    });
};