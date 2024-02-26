const express = require("express");
const router = express.Router();

const {
  adminSignup,
  adminSignin,
  adminSignOut,
  adminHome,
  adminChangePassword,
  
} = require("../controllers/adminController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

//Admin Routes 
router.post("/signup", adminSignup);
router.post("/signin", adminSignin);
router.post("/adminHome", isLoggedIn, adminHome);
router.get("/adminSignOut", isLoggedIn, adminSignOut);
router.post("/adminChangePassword", isLoggedIn, adminChangePassword);





module.exports = router;
