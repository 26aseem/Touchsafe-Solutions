const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// Food Cart Schema
const FoodCartSchema = new mongoose.Schema({
    food: {
        type: ObjectId,
        ref: "Food"
    },
    name: String,
    count: Number,
    price: Number
    
});

const FoodCart = mongoose.model("FoodCart",FoodCartSchema);


// Order Schema
const orderSchema = new mongoose.Schema({
    foods: [FoodCartSchema],
    transaction_id: {type: String},
    amount: {type: Number},
    status: {
        type: String,
        default: "Received",
        enum: ["Received","Accepted","Cancelled","Processed"]
    },
    rest: {
        type: ObjectId,
        ref: "Merchant"
    },
    updated: {type: Date},
    paymentStatus: {
        type: String,
        default: "Pending",
        enum: ["Pending","Completed"]
    }

},
{timestamp: true}
);

const Order = mongoose.model("Order",orderSchema);

module.exports = {Order,FoodCart};