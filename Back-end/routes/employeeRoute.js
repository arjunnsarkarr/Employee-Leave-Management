const express = require("express");
const router = express.Router();

const {
  employeeSignup,
  employeeSignin,
  employeeHome,
  employeeSignOut,
  allEmployee,
  deleteEmployee,
  updateEmployee,
  employeeStatusChanger,
  employeeDetail,
  changePassword,
  
} = require("../controllers/employeeController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.post("/employeeSignup", employeeSignup);
router.post("/employeeSignin", employeeSignin);
router.post("/employeeHome", isLoggedIn, employeeHome);
router.post("/changePassword", isLoggedIn, changePassword);
router.get("/employeeSignOut", isLoggedIn, employeeSignOut);

router.get("/allEmployee", allEmployee);
router.post("/deleteEmployee", deleteEmployee);
router.post("/updateEmployee", updateEmployee);
router.post("/employeeStatusChanger", employeeStatusChanger);
router.post("/employeeDetail", employeeDetail);

module.exports = router;
