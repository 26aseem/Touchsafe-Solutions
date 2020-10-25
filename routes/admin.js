const express = require("express");
const adrouter = express.Router();

const { getAdminById, getAdmin, getAllAdmins, updateAdmin } = require("../controllers/admin");
const { isAuthenticated, isSignedIn } = require("../controllers/adminauth");

//All Params
adrouter.param("adminId", getAdminById);

//All Routes
adrouter.get("/admin/:adminId", isSignedIn, isAuthenticated, getAdmin);
adrouter.get("/admins", getAllAdmins);
adrouter.put("/admin/:adminId", isSignedIn, isAuthenticated, updateAdmin);


module.exports = adrouter;