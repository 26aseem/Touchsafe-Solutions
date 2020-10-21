const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types


const foodSchema = new mongoose.Schema({
    itemName: {
                type: String,
                required: true
            },
    itemPrice: {
                type: Number,
                required: true
            },
    stock: {
                type: Number,
                required: true
            }
        }
)

module.exports = mongoose.model("Food", foodSchema)