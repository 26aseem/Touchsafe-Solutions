const express = require("express");
const router = express.Router();

const {getCategoryById, createCategory, getAllCategory, getCategory, updateCategory, removeCategory} = require("../controllers/category");
const {isSignedIn, isAuthenticated} = require("../controllers/adminauth");
const {getAdminById} = require("../controllers/admin");

//params
router.param("adminId", getAdminById);
router.param("categoryId", getCategoryById);

//actual routers goes here

//create
router.post("/category/create/:adminId",isSignedIn, isAuthenticated, createCategory);

//read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//update
router.put("/category/:categoryId/:adminId", isSignedIn, isAuthenticated, updateCategory);

//delete
router.delete("/category/:categoryId/:adminId",isSignedIn, isAuthenticated, removeCategory);
module.exports = router;