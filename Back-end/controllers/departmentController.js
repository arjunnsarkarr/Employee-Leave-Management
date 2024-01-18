const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Department = require("../models/departmentSchema");

exports.createDepartment = catchAsyncErrors(async (req, res, next) => {
  const DepartmentName = req.body.DepartmentName;
  const DepartmentShortName = req.body.DepartmentShortName;
  const DepartmentCode = req.body.DepartmentCode;

  const department = await new Department({
    DepartmentName: DepartmentName,
    DepartmentShortName: DepartmentShortName,
    DepartmentCode: DepartmentCode,
  }).save();
  res.json({ message: "department Created", department });
});

exports.deleteDepartment = catchAsyncErrors(async (req, res, next) => {
  const department = await Department.findByIdAndRemove(req.body);
  res.status(200).json({ message: "department Deleted", department });
});

exports.updateDepartment = catchAsyncErrors(async (req, res, next) => {
  const department = await Department.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        DepartmentName: req.body.DepartmentName,
        DepartmentShortName: req.body.DepartmentShortName,
      },
    }
  );
  res.status(200).json({ message: "Department Updated", department });
});

exports.allDepartment = catchAsyncErrors(async (req, res, next) => {
  const department = await Department.find({});
  res.status(200).json({ message: "All Department ", department });
});

exports.departmentDetail = catchAsyncErrors(async (req, res, next) => {
  const department = await Department.findById({ _id: req.body._id });
  res.status(200).json({ message: "This Department ", department });
});
