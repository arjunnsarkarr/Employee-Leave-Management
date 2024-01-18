const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Leave = require("../models/LeaveSchema");

exports.createLeave = catchAsyncErrors(async (req, res, next) => {
  const leaveType = req.body.leaveType;
  const From = req.body.From;
  const To = req.body.To;
  const Description = req.body.Description;
  const employeeID = req.body.employeeID;
  const employeeName = req.body.employeeName;
  const leave = await new Leave({
    leaveType: leaveType,
    From: From,
    To: To,
    Description: Description,
    employeeID: employeeID,
    employeeName: employeeName,
  }).save();
  console.log(`New leave created with ID ${leave._id}`);
  res.json({ message: "Leave Applied", leave });
});

exports.updateLeaveStatus = catchAsyncErrors(async (req, res, next) => {
  const leave = await Leave.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        leaveStatus: req.body.leaveStatus,
        AdminRemark: req.body.AdminRemark,
      },
    }
  );
  res.status(200).json({ message: "Leave Status Updated", leave });
});

exports.allLeave = catchAsyncErrors(async (req, res, next) => {
  const leave = await Leave.find({});
  res.status(200).json({ message: "All Leave", leave: leave.reverse() });
});

exports.LeaveDetail = catchAsyncErrors(async (req, res, next) => {
  const leave = await Leave.findById({ _id: req.body._id });
  res.status(200).json({ message: "This Leave", leave });
});

exports.employeeLeave = catchAsyncErrors(async (req, res, next) => {
  const AllLeave = await Leave.find({});
  const employeeFilteredLeave = AllLeave.filter(
    (data) => data.employeeID == req.body._id
  );
  const employeePendingLeave = employeeFilteredLeave.filter(
    (data) => data.leaveStatus == "Pending"
  );
  const employeeApprovedLeave = employeeFilteredLeave.filter(
    (data) => data.leaveStatus == "Approved"
  );

  res.status(200).json({
    message: "Employee Leaves",
    employeeFilteredLeave: employeeFilteredLeave.reverse(),
    TotalLeave: employeeFilteredLeave.length,
    NewLeaveLength: employeePendingLeave.length,
    ApprovedLength: employeeApprovedLeave.length,
  });
});
