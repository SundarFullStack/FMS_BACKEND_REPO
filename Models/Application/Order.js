const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    totalPrice: {
        type:Number,
        required:true,
    },
    orderDate: {
        type: Date,
        default:new Date(),
        required:true,
    }
},
    {
    "collection":"Order"
})


module.exports = mongoose.model("Order", orderSchema);