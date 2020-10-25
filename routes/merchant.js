const express = require("express");
const router = express.Router();

//For Data Validation
const { check, validationResult } = require('express-validator');


//Imported from controllers/adminauth.js
const { merchantsignup, merchantsignin, merchantsignout } = require('../controllers/merchant.js');

const { getMerchantById, getMerchant, getAllMerchants, updateMerchant, merchantPhoto, deleteMerchant, isAuthenticated,addQR, isSignedIn } = require("../controllers/merchant");

//const { getAdminById } = require("../controllers/admin");
//router.param("adminId", getAdminById);


router.param("merchantId", getMerchantById);

router.get("/merchant/:merchantId", isSignedIn, isAuthenticated, getMerchant);
router.get("/merchantDetail/:merchantId", getMerchant);
router.get("/merchant/:merchantId", merchantPhoto);
router.get("/merchants", getAllMerchants);
router.put("/merchant/:merchantId", isSignedIn, isAuthenticated, updateMerchant);
router.put("/merchantDetail/:merchantId", updateMerchant);
router.delete("/merchant/:merchantId", deleteMerchant);

//QR Code routes
router.put("/merchantQR/:merchantId", isSignedIn, isAuthenticated, addQR);

//merchantsignup Route
router.post("/merchantsignup",[
    check("password", "Password should be atleast 6 characters").isLength({ min: 6}),
    check("username", "Username should be atleast 6 characters").isLength({min: 6}),
    check("merchantName", "Merchant Name should be atleast 2 characters").isLength({min: 2}),
    check("ownername", "Owner Name should be atleast 3 characters").isLength({min: 3}),
    check("city", "City should be atleast 3 characters").isLength({min: 3}),
    check("state", "State should be atleast 3 characters").isLength({min: 3}),
    check("country", "Country should be atleast 3 characters").isLength({min: 3}),
    check("streetAddress", "Street Address should be atleast 5 characters").isLength({min: 5}),
    check("pincode", "Pincode should be 6 characters").isLength({min: 6}),
    check("email", "Email is required").isEmail(),
    check("contact", "Contact Number should be atleast 10 characters").isLength({min: 10}),
    check("category", "Category is required").isLength({min: 1})
], merchantsignup);

//merchantsignin Route
router.post("/merchantsignin",[
    check("password", "Password is required").isLength({ min: 6}),
    check("username", "Username is required").isLength({ min: 6})
],merchantsignin);

//merchantsignout Route
router.get("/merchantsignout", merchantsignout);



module.exports = router;