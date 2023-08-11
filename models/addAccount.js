const mongoose = require("mongoose");

const AccontSchema = new mongoose.Schema({
   
    name: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    gstNumber: {
        type: String,
    },
   

});

module.exports = mongoose.model("Accounts",AccontSchema);