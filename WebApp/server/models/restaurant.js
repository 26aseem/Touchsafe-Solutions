const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types


const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    menu: {
        type:ObjectId, ref:"Menu"
    }
    ,
    orderHistory:[
        {type:ObjectId, ref:"Order"}
    ]
})

module.exports = mongoose.model("Restaurant", restaurantSchema)