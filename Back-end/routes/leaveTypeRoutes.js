const express = require("express");
const router = express.Router();

const {
  createLeaveType,
  deleteLeaveType,
  updateLeaveType,
  allLeaveType,
  leaveTypeDetail,
} = require("../controllers/leaveTypeController");

router.post("/createLeaveType", createLeaveType);
router.post("/deleteLeaveType", deleteLeaveType);
router.post("/updateLeaveType", updateLeaveType);
router.get("/allLeaveType", allLeaveType);
router.post("/leaveTypeDetail", leaveTypeDetail);

module.exports = router;
