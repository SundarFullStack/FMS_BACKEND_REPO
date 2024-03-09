const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        required:true
    },
    
},
    {"collection":"Product"}
)

module.exports = mongoose.model("Product", productSchema);