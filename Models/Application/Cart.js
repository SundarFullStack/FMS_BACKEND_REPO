const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    OrderId: {
        type:String,
        required: true,
        default:"0"
    },
    productName: {
        type:String,
        required:true,
    },
    productPrice: {
        type:Number,
        required:true,
    },
    productQuantity: {
        type:Number,
        required:true,
    },
    multiPrice: {
        type:Number,
        required:true,
    },
    status: {
        type: String,
        required: true,
        default:"N"
    }
},
    {
    "collection":"Cart"
})


module.exports = mongoose.model("Card", cartSchema);