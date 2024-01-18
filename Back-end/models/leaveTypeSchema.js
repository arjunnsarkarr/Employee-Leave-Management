const mongoose = require("mongoose");

const leaveTypeModel = new mongoose.Schema(
  {
    leaveType: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const LeaveType = mongoose.model("leavetype", leaveTypeModel);
module.exports = LeaveType;
