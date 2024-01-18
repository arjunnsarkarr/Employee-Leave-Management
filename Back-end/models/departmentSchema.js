const mongoose = require("mongoose");

const departmentModel = new mongoose.Schema(
  {
    DepartmentName: {
      type: String,
    },
    DepartmentShortName: {
      type: String,
    },
    DepartmentCode: {
      type: String,
      unique : true
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("department", departmentModel);
module.exports = Department;
