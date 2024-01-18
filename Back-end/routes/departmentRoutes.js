const express = require("express");
const router = express.Router();

const {
  createDepartment,
  deleteDepartment,
  updateDepartment,
  allDepartment,
  departmentDetail
} = require("../controllers/departmentController");

router.post("/createDepartment", createDepartment);
router.post("/deleteDepartment", deleteDepartment);
router.post("/updateDepartment",updateDepartment);
router.get("/allDepartment",allDepartment);
router.post("/departmentDetail",departmentDetail);

module.exports = router;
