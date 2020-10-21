const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types


const orderSchema = new mongoose.Schema({
    o:[
        {
        oCart: {
            type:ObjectId, 
            ref:"Ordercart",

        },
        customer: {
            type: ObjectId,
            ref: "User"
        },
    }
    ]
})

module.exports = mongoose.model("Order", orderSchema)