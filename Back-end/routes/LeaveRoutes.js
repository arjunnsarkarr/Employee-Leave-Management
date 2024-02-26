const express = require("express");
const router = express.Router();

const {
  createLeave,
  updateLeaveStatus,
  allLeave,
  LeaveDetail,
  employeeLeave,
  LeaveData
} = require("../controllers/LeaveController");


router.post("/createLeave", createLeave);
router.post("/updateLeaveStatus", updateLeaveStatus);
router.post("/LeaveDetail", LeaveDetail);
router.get("/allLeave", allLeave);
router.get("/LeaveData", LeaveData);
router.post("/employeeLeave", employeeLeave);

module.exports = router;
