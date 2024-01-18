const mongoose = require("mongoose");

const LeaveModel = new mongoose.Schema(
  {
    leaveType: {
      type: String,
    },
    From: {
      type: String,
    },
    To: {
      type: String,
    },
    Description: {
      type: String,
    },
    employeeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
    },
    employeeName: {
      type: String,
    },
    leaveStatus: {
      type: String,
      default: "Pending",
    },
    AdminRemark: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("leave", LeaveModel);
module.exports = Leave;
