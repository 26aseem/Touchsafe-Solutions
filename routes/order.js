const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticated} = require("../controllers/merchant");
const { getMerchantById, pushOrderInPurchaseList } = require("../controllers/merchant");
const { getOrderById, createOrder, getAllOrdersForRestaurant,getAllOrdersAcceptedForRestaurant, getOrderStatus, updateStatus, updatePayStatus } = require("../controllers/order");
const { updateStock } = require("../controllers/food");


//params
router.param("merchantId", getMerchantById);
router.param("orderId", getOrderById);

//create route
router.post("/order/create/:merchantId",updateStock,pushOrderInPurchaseList,createOrder);

//read route
router.get("/allorders/:merchantId", isSignedIn, isAuthenticated, getAllOrdersForRestaurant);

//read Accepted and Pending route
router.get("/allAcceptedOrders/:merchantId", getAllOrdersAcceptedForRestaurant);

//status route
router.get("/order/status/:merchantId", isSignedIn, isAuthenticated, getOrderStatus);
router.put("/order/:orderId/updatestatus/:merchantId", isSignedIn, isAuthenticated, updateStatus);
router.put("/order/:orderId/updateacceptedstatus/:merchantId", updateStatus);

//payment status route
router.put("/order/:orderId/updatepaystatus/:merchantId", isSignedIn, isAuthenticated, updatePayStatus);
module.exports = router;