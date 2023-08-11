
const mongoose = require("mongoose");

const PurchaseOrderSchema = new mongoose.Schema({

    itemName: {
        type: String,
    },
    sellingPrice: {
        type: Number,
    },
    totalamount: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    cgst: {
        type: Number,
    },
    sgst: {
        type: Number,
    },
    cgstPerItem: {
        type: Number,
    },
    sgstPerItem: {
        type: Number,
    },
    PurchasingPrice: {
        type: Number,
    },
    totalGST: {
        type: Number,
    },
    pricewithoutgst: {
        type: Number,
    },
    createdDate: {
        type: Date,
    }
    // image: {
    //     type:String
    //   },


});

module.exports = mongoose.model("Purchase_Order", PurchaseOrderSchema);

