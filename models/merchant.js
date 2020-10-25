//Mongoose, Crypto and uuid version 1 are used
const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const {ObjectId} = mongoose.Schema;


var merchantSchema = mongoose.Schema({
    merchantName: {
        type: String,
        required: true,
        maxlength: 200
    },

    ownerName: {
        type: String,
        required: true,
        maxlength: 32,
    },

    city: {
        type: String,
        required: true,
        maxlength: 32
    },

    state: {
        type: String,
        required: true,
        maxlength: 32
    },

    country: {
        type: String,
        required: true,
        maxlength: 32
    },

    streetAddress: {
        type: String,
        required: true,
        maxlength: 200
    },

    pincode: {
        type: Number,
        minlength: 6,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50
    },

    contact: {
        type: Number,
        maxlength: 12,
        required: true,
        trim: true
    },

    altcontact: {
        type: Number,
        maxlength: 12,
        trim: true
    },

    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },

    description: {
        type: String,
        maxlength: 2000
    },

    merchantPhoto: {
        data: Buffer,
        contentType: String
    },

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: 32,
        minlength: 6,

    },

    encrypt_password: {
        type: String,
        required: true,
        minlength: 6
    },

    salt: {
        type: String
    },
    orderHistory: {
        type: Array,
        default: []

    },
    qrcode: {
        type:String
    }

    },
    
    { timestamp: true }

);

merchantSchema.virtual("address")
    .set(function(address){
        this._address = this.streetAddress + ", " + this.city + ", " + this.state + ", " + this.country + " - " + this.pincode;
    })
    .get(function(){
        return this._address;
    })


merchantSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encrypt_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })


merchantSchema.methods = {
//Authenticate for login
    authenticate: function(password){
        return this.securePassword(password)==this.encrypt_password
    },

//securePassword is a function to safeguard the password
    securePassword: function(password){
        if(!password) return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(password).digest('hex');
        }
        catch (err){
            return "";
        }
    }
};



module.exports = mongoose.model("Merchant",merchantSchema);