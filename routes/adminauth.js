var express = require('express');
var adminrouter = express.Router();
//For Data Validation
const { check, validationResult } = require('express-validator');

//Imported from controllers/adminauth.js
const { adminsignup, adminsignin, adminsignout } = require('../controllers/adminauth.js');

//adminsignup Route
adminrouter.post("/adminsignup",[
    check("password", "Password should be atleast 6 characters").isLength({ min: 6}),
    check("username", "Username should be atleast 6 characters").isLength({min: 6})
],adminsignup);

//adminsignin Route
adminrouter.post("/adminsignin",[
    check("password", "Password is required").isLength({ min: 6}),
    check("username", "Username is required").isLength({ min: 6})
],adminsignin);

//adminsignout Route
adminrouter.get("/adminsignout", adminsignout);


module.exports = adminrouter;