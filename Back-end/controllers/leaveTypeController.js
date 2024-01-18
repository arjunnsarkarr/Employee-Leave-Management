const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const LeaveType = require("../models/leaveTypeSchema");

exports.createLeaveType = catchAsyncErrors(async (req, res, next) => {
  const leaveType = req.body.leaveType;
  const description = req.body.description;
  const leavetype = await new LeaveType({
    leaveType: leaveType,
    description: description,
  }).save();
  res.json({ message: "Leave Type Created", leavetype });
});

exports.deleteLeaveType = catchAsyncErrors(async (req, res, next) => {
  const leavetype = await LeaveType.findByIdAndRemove(req.body);
  res.status(200).json({ message: "Leave Type Deleted", leavetype });
});

exports.updateLeaveType = catchAsyncErrors(async (req, res, next) => {
  const leavetype = await LeaveType.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        leaveType: req.body.leaveType,
        description: req.body.description,
      },
    }
  );
  res.status(200).json({ message: "Leave Type Updated", leavetype });
});

exports.allLeaveType = catchAsyncErrors(async (req, res, next) => {
  const leavetype = await LeaveType.find({});
  res.status(200).json({ message: "All Leave Type ", leavetype });
});

exports.leaveTypeDetail = catchAsyncErrors(async (req, res, next) => {
  const leavetype = await LeaveType.findById({ _id: req.body._id });
  res.status(200).json({ message: "This Leave Type ", leavetype });
});
