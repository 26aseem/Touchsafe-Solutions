const AdminPanel = require("../models/adminpanel");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

//adminsignup is created
exports.adminsignup = (req, res) => {
    /*res.json({
        message:"Signup works!"
    })*/

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            errorParam: errors.array()[0].param
        })
    }

    const admin = new AdminPanel(req.body);
    
    //Database updated
    admin.save((err, admin) => {
        if (err) {
            return res.status(400).json({
                err : "Not able to save admin in the Database"
            });
        }

        res.json({
            username: admin.username,
            id: admin._id
        })
    });
};

//admin signin is created
exports.adminsignin = (req, res) => {
    const {username, password} = req.body;   //This destructuring
    
    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            errorParam: errors.array()[0].param
        });
    }
    AdminPanel.findOne({username}, (err,admin) => {
        if(err) {
            return res.status(400).json({
                error: "Admin Not Found. Trying Sign Up!"
            });
        }

        if(!admin.authenticate(password)){
            return res.status(401).json({
                error: "Username and Password do not match"
            });
        }

        //Create Token
        const token = jwt.sign({_id: admin._id}, process.env.SECRET)
        //Put Token in cookie
        res.cookie("token, token", {expire: new Date() + 9999});

        //send response to front end
        const {_id, username} = admin;
        return res.json({token, admin: { _id, username}});

    });

};

exports.adminsignout = (req,res) => {
    res.json({
        message: "Admin Signout"
    });
};


//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

//custom middlewares
exports.isAuthenticated = ( req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};
