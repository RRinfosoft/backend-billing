
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({

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

  
  
    // image: {
    //     type:String
    //   },


});

module.exports = mongoose.model("Item", itemSchema);

