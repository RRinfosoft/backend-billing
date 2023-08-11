const SaleOrder = require("../models/saleOrderModel");
const allSaleHistory = require("../models/saleorderhistory")
const ItemModel = require("../models/itemModel");
const BagSale = require("../models/bagSale")
const BagSaleHistory = require("../models/bagSaleorderhistory")

const ApiFeatures = require("../utils/apifeatures");


// create student --Admin
exports.createSaleOrder = (async (req, res, next) => {

    // const sale = await SaleOrder.create(req.body);

    const sale = { ...req.body, createdDate: new Date() }
    await SaleOrder.create(sale)


    const bagBale = { ...req.body, createdDate: new Date() }
    await BagSale.create(bagBale)

    const allsalesOrderbydate = { ...req.body, createdDate: new Date() }
    await allSaleHistory.create(allsalesOrderbydate)

    req.body.Items.forEach(async (product) => {
        if (product.productId) {
            const productId = product.productId;
            const item = await ItemModel.findById(productId);
            const totalQuantity = item.stock;
            const quantity = product.quantity
            const remaningQuantity = totalQuantity - quantity
            const items = await ItemModel.findByIdAndUpdate(productId, { stock: remaningQuantity }, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            });
        }
    });


    res.status(201).json({
        success: true,
        sale,
    });
});


////////////////////////////////////////////////
exports.createbagSaleOrder = (async (req, res, next) => {

    // const sale = await SaleOrder.create(req.body);



    const bagBale = { ...req.body, createdDate: new Date() }
    await BagSale.create(bagBale)

    const allbagsalesOrderbydate = { ...req.body, createdDate: new Date() }
    await BagSaleHistory.create(allbagsalesOrderbydate)

    req.body.Items.forEach(async (product) => {
        if (product.productId) {
            const productId = product.productId;
            const item = await ItemModel.findById(productId);
            const totalQuantity = item.stock;
            const quantity = product.quantity
            const remaningQuantity = totalQuantity - quantity
            const items = await ItemModel.findByIdAndUpdate(productId, { stock: remaningQuantity }, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            });
        }
    });


    res.status(201).json({
        success: true,
        bagBale,
    });
});


//////////////////////////////////////////////////////////////////////

exports.getAllsaleOrder = async (req, res) => {
    const saleorders = await SaleOrder.find();
    res.status(200).json({
        success: true,
        saleorders,
    });

}

////////////////////////////////////////////////////////////////

exports.getAllBagsaleOrder = async (req, res) => {
    const bagsaleorders = await BagSale.find();
    res.status(200).json({
        success: true,
        bagsaleorders,
    });

}

///////////////////////////////////////////////////////////

exports.getAllBagSaleHistory = async (req, res) => {

    // const date1 = "2023-06-05T10:25:41.597+00:00";
    // const date2 = "2023-08-05T10:25:41.597+00:00";

    const date1 = new Date();
    const date2 = date1.setMonth(date1.getMonth() - 1)
    date1.setHours(0, 0, 0)
    // console.log(new Date(), date1, "rishi")
    const apiFeature = new ApiFeatures(BagSale.find(
        {
            createdDate: {
                $gte: new Date(date1),
                $lte: new Date()
            }
        }

    ), req.query).search().filter();

    const bagsale_history = await apiFeature.query;

    res.status(200).json({
        success: true,
        bagsale_history,
    });

}


/////////////////////////////////////////////////////////////////


exports.getAllSaleHistory = async (req, res) => {

    // const date1 = "2023-06-05T10:25:41.597+00:00";
    // const date2 = "2023-08-05T10:25:41.597+00:00";

    const date1 = new Date();
    const date2 = date1.setMonth(date1.getMonth() - 1)
    date1.setHours(0, 0, 0)
    // console.log(new Date(), date1, "rishi")
    const apiFeature = new ApiFeatures(allSaleHistory.find(
        {
            createdDate: {
                $gte: new Date(date1),
                $lte: new Date()
            }
        }

    ), req.query).search().filter();

    const sale_history = await apiFeature.query;

    res.status(200).json({
        success: true,
        sale_history,
    });

}

/////////////////////////////////////////////////////

exports.getSaleHistoryByDate = async (req, res) => {

    // const date1 = "2023-06-05T10:25:41.597+00:00";
    // const date2 = "2023-08-05T10:25:41.597+00:00";
    // console.log(req.params,"deep")
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const date1 = new Date(startDate);
    // const date2 = date1.setMonth(date1.getMonth() - 1)
    const date2 = new Date(endDate)
    // date1.setHours(0,0,0)

    const apiFeature = new ApiFeatures(allSaleHistory.find(
        {
            createdDate: {
                $gte: date1,
                $lte: date2
            }
        }

    ), req.query).search().filter();

    const sale_history = await apiFeature.query;

    res.status(200).json({
        success: true,
        sale_history,
    });

}

/////////////////////////////////////////////////////////////

exports.getBagSaleHistoryByDate = async (req, res) => {

    // const date1 = "2023-06-05T10:25:41.597+00:00";
    // const date2 = "2023-08-05T10:25:41.597+00:00";
    // console.log(req.params,"deep")
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const date1 = new Date(startDate);
    // const date2 = date1.setMonth(date1.getMonth() - 1)
    const date2 = new Date(endDate)
    // date1.setHours(0,0,0)

    const apiFeature = new ApiFeatures(BagSale.find(
        {
            createdDate: {
                $gte: date1,
                $lte: date2
            }
        }

    ), req.query).search().filter();

    const bagsale_history = await apiFeature.query;

    res.status(200).json({
        success: true,
        bagsale_history,
    });

}

// get single item 

exports.getSaleOrderDetail = async (req, res, next) => {
    const sale = await SaleOrder.findById(req.params.id);

    if (!sale) {
        return res.status(500).json({
            success: false,
            message: "SaleOrder not Found"
        });
    }

    res.status(200).json({
        success: true,
        sale,
    })

};

exports.getbagSaleOrderDetail = async (req, res, next) => {
    const bagsale = await BagSale.findById(req.params.id);

    if (!bagsale) {
        return res.status(500).json({
            success: false,
            message: "SaleOrder not Found"
        });
    }

    res.status(200).json({
        success: true,
        bagsale,
    })

};




exports.updateSaleOrder = async (req, res, next) => {
    let sale = await SaleOrder.findById(req.params.id);

    if (!sale) {
        return res.status(500).json({
            success: false,
            message: "SaleOrder not Found"
        });
    }
    sale = await SaleOrder.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        sale,
    });

}


exports.updateBagSaleOrder = async (req, res, next) => {
    let bagsale = await BagSale.findById(req.params.id);

    if (!bagsale) {
        return res.status(500).json({
            success: false,
            message: "BagSale not Found"
        });
    }
    bagsale = await BagSale.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        bagsale,
    });

}
// exports.updateOrderStatus = async (req, res, next) => {
//   try {
//     const orderId = req.params.id;
//     const { newStatus } = req.body;
//     const updatedOrder = await SaleOrder.findByIdAndUpdate(
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



exports.deleteBagSaleOrder = async (req, res, next) => {

    // req.body.student=req.student.id



    const bagsale = await BagSale.findById(req.params.id);



    if (!bagsale) {
        return next(new ErrorHandler("Bag Sale Order Not Found ", 404));
    }
    // ==========================================================================

    // another trick to delete one record



    await bagsale.deleteOne({ _id: req.params.id });

    //   ===========================================================================

    // await Order.findOneAndDelete();

    res.status(200).json({
        success: true,
        message: "Bag Sale Order delete successfully",
    });
};



exports.deleteSaleOrder = async (req, res, next) => {

    // req.body.student=req.student.id
    const sale = await SaleOrder.findById(req.params.id);




    if (!sale) {
        return next(new ErrorHandler("SaleOrder Not Found ", 404));
    }

  
    // ==========================================================================

    // another trick to delete one record

    await sale.deleteOne({ _id: req.params.id });


    //   ===========================================================================

    // await Order.findOneAndDelete();

    res.status(200).json({
        success: true,
        message: "SaleOrder delete successfully",
    });
};