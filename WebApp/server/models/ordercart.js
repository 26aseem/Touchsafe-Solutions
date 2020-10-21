const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types


const ordercartSchema = new mongoose.Schema({
    cart:[
    {
        foodItem: {
            type:ObjectId, 
            ref:"Food",

        },
        quantity:{
            type: Number,
            required:true
        }
    }
    ]
})

module.exports = mongoose.model("Ordercart", ordercartSchema)