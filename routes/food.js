const express = require("express");
const router = express.Router();

const {getFoodById, createFood, getFood, photo, deleteFood, updateFood, getAllUniqueRestaurants, getAllFoods,getMenu} = require("../controllers/food");
const {isSignedIn, isAuthenticated } = require("../controllers/merchant");
const {getMerchantById} = require("../controllers/merchant");

//All of Params
router.param("merchantId", getMerchantById);
router.param("foodId", getFoodById);

//All of actual routes

//create route
router.post("/food/create/:merchantId", isSignedIn, isAuthenticated, createFood);

//read route
router.get("/food/:foodId/:merchantId", isSignedIn, isAuthenticated, getFood);
router.get("/foodphoto/:foodId/:merchantId", isSignedIn, isAuthenticated, photo);
router.get("/foodphoto/:foodId", photo);

//update route
router.put("/food/:foodId/:merchantId", isSignedIn, isAuthenticated, updateFood);

//delete route
router.delete("/food/:foodId/:merchantId", isSignedIn, isAuthenticated, deleteFood);

//listing route
router.get("/foods/:merchantId", isSignedIn, isAuthenticated, getAllFoods);

//listing route
router.get("/menu/:merchantId", getMenu);

//All distinct merchants
router.get("/foods/merchants", getAllUniqueRestaurants);


module.exports = router;