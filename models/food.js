const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const foodSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true,
        maxlength: 200
    },

    dishDesc: {
        type: String,
        maxlength: 2000,
    },

    dishPrice: {
        type: Number,
    },

    dishStock: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0
    },

    photo: {
        data: Buffer,
        contentType: String
    },

    rest: {
        type: ObjectId,
        ref: "Merchant"
    }
},

{
    timestamp: true

});

module.exports = mongoose.model("Food",foodSchema);
