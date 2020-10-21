const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types


const userSchema = new mongoose.Schema({
    customerId : {
        type: String,
        required: true,
        unique: true
    },
    visitingRestaurant: {
        type:ObjectId, 
        ref:"Restaurant",
    }
})

module.exports = mongoose.model("User", userSchema)