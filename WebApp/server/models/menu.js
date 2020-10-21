const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types


const menuSchema = new mongoose.Schema({
    foodMenu:[
        {
            type:ObjectId, ref:"Food"
        }
    ]
})

module.exports = mongoose.model("Menu", menuSchema)