const Merchant = require("../models/merchant");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");  //File System

const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.getMerchantById = (req, res, next, id) => {
    Merchant.findById(id)
    .populate("category")
    .exec((err,merchant) => {
        if(err){
            return res.status(400).json({
                error: "No merchant was found in the database"
            });
        }

        req.profile = merchant;
        next();
    });
    
};


//merchantsignup is created
exports.merchantsignup = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Issues with the image"
            });
        }

        //destructure the fields
    const { merchantName, ownerName, city, state, country,streetAddress,
        pincode, email, contact, altcontact, description, category, username, password } = fields;

    if (!merchantName || !ownerName || !city || !state || !country || !streetAddress
        || !pincode  || !email || !contact || !category || !username || !password) 
    {
      return res.status(400).json({
        error: "Please include all the Fields"
      });
    }

    let merchant = new Merchant(fields);

        //handle file here
        if(file.merchantPhoto){
            if(file.merchantPhoto.size > 3*1024*1024){
                return res.status(400).json({
                    error: "File size greater than 3 MB"
                });
            }
            merchant.merchantPhoto.data = fs.readFileSync(file.merchantPhoto.path)
            merchant.merchantPhoto.contentType = file.merchantPhoto.type
        }

        //save to the db
        merchant.save((err, merchant) => {
            if(err){
                console.log(err)
                res.status(400).json({
                    error: "Saving Image to the Database Failed"
                });
            }
            return res.json(merchant);
        });

    })
};



exports.getMerchant = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encrypt_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.getAllMerchants = (req, res) => {
    Merchant.find().exec((err, merchants) => {
        if(err || !merchants){
            return res.status(400).json({
                error: "NO merchants found"
            })
        }
        return res.json(merchants);
        
    });

};


//Performance optimization
exports.merchantPhoto = (req, res, next) => {
    if(req.merchant.merchantPhoto.data){
        res.set("Content-Type", req.merchant.merchantPhoto.contentType)
        return res.send(req.merchant.merchantPhoto.data)
    }
    next();
};

exports.deleteMerchant = (req, res) => {
    let merchant = req.profile;
    merchant.remove((err, deletedMerchant) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete the merchant"
            });
        }

        res.json({
            message: "Deletion was successful"
        });
    });
};


exports.updateMerchant = (req, res) => {
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Issues with the image"
            });
        }
       
        let merchant = req.profile;
        merchant = _.extend(merchant, fields);
       
        if(file.merchantPhoto){
            if(file.merchantPhoto.size > 3*1024*1024){
                return res.status(400).json({
                    error: "File size greater than 3 MB"
                });
            }
            merchant.merchantPhoto.data = fs.readFileSync(file.merchantPhoto.path)
            merchant.merchantPhoto.contentType = file.merchantPhoto.type
        }

        //save to the db
        
        merchant.save((err, merchant) => {
            if(err){
                res.status(400).json({
                    error: "Saving image to the Database failed"
                });
            }
            merchant.salt = undefined;
            merchant.encrypt_password = undefined;
            merchant.createdAt = undefined;
            merchant.updatedAt = undefined;
            return res.json(merchant);
        });

    })
};

// Add QR
exports.addQR = (req, res) => {
    const merchant = req.profile;
    merchant.qrcode = req.body.qrurl;
    
    merchant.save((err, updatedMerchant) => {
        if(err){
            return res.status(400).json({
                error: "Cannot update the Merchant"
            });
        }
        return res.json(updatedMerchant);
    });
};




exports.merchantsignin = (req, res) => {
    const {username, password} = req.body;   //This destructuring
    
    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            errorParam: errors.array()[0].param
        });
    }
    Merchant.findOne({username}, (err,merchant) => {
        if(err || !merchant) {
            return res.status(400).json({
                error: "Merchant Not Found. Trying Sign Up!"
            });
        }

        if(!merchant.authenticate(password)){
            return res.status(401).json({
                error: "Username and Password do not match"
            });
        }

        //Create Token
        const token = jwt.sign({_id: merchant._id}, process.env.SECRET)
        //Put Token in cookie
        res.cookie("token, token", {expire: new Date() + 9999});

        //send response to front end
        const {_id, username, merchantName, ownerName} = merchant;
        return res.json({token, merchant: { _id, username, merchantName, ownerName}});

    });

};

exports.merchantsignout = (req,res) => {
    res.json({
        message: "Merchant Signout"
    });
};


//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

//custom middlewares
exports.isAuthenticated = ( req, res, next) => {
    
    //let checker = req.profile && req.auth;
    // Auth of admin is coming but required  is merchant
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

// Order History

exports.userPurchaseList = (req, res) => {
    Order.find({merchant: req.profile._id})
    .populate("merchant", "_id merchantName username")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No orders for this user"
            });
        }
        return res.json(order);
    })

};


exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.foods.forEach(p => {
        purchases.push({
            foodID : p.food,
            //name: p.food.dishName ? p.food.dishName : "",
            //description: p.food.dishDesc ? p.food.dishDesc : "",
            //stock: p.food.dishStock ? p.food.dishstock : "",
            price: req.body.order.amount,
            count:p.count,
            transaction_id: req.body.order.transaction_id,
            status: req.body.order.status
        });
    });

//store in database
Merchant.findOneAndUpdate(
    {_id: req.profile._id},
    {$push: {orderHistory: purchases}},
    {new: true},
    (err, purchases) => {
        if(err){
            return res.status(400).json({
                error: "Unable to save purchase list"
            });
        }
        next();
    });
    
};
