const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employee = require("../models/employeeSchema");
const ErrorHandler = require("../utlis/ErrorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.employeeSignup = catchAsyncErrors(async (req, res, next) => {
  const EID = req.body.EID;
  const name = req.body.name;
  const email = req.body.email;
  const Gender = req.body.Gender;
  const DOB = req.body.DOB;
  const Department = req.body.Department;
  const Address = req.body.Address;
  const City = req.body.City;
  const Country = req.body.Country;
  const Mobile = req.body.Mobile;
  const Mode = req.body.Mode;
  const password = req.body.password;
  let salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const employee = await new Employee({
    EID: EID,
    name: name,
    email: email,
    Gender: Gender,
    DOB: DOB,
    Department: Department,
    Address: Address,
    City: City,
    Country: Country,
    Mobile: Mobile,
    Mode: Mode,
    password: hashPassword,
  }).save();
  res.json({ message: "Employee Created", employee: employee });
});

exports.employeeSignin = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!employee) return next(new ErrorHandler("Admin Not Found", 404));
  const isMatched = bcrypt.compareSync(req.body.password, employee.password);
  if (!isMatched) {
    return next(new ErrorHandler("Wrong Password", 500));
  }
  const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  };
  res
    .status(200)
    .cookie("token", token, options)
    .json({ message: "Login Successful", employee: employee, token: token });
});

exports.employeeHome = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();
  res.json({ employee });
});

exports.employeeSignOut = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json("Signed Out");
});

exports.allEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.find({});
  res.json(employee);
});

exports.deleteEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findByIdAndRemove(req.body);
  res.json({ message: "Employee Deleted", employee });
});

exports.updateEmployee = catchAsyncErrors(async (req, res, next) => {
  const name = req.body.name;
  const Gender = req.body.Gender;
  const DOB = req.body.DOB;
  const Department = req.body.Department;
  const Address = req.body.Address;
  const City = req.body.City;
  const Country = req.body.Country;
  const Mobile = req.body.Mobile;
  const employee = await Employee.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        name: name,
        Gender: Gender,
        DOB: DOB,
        Department: Department,
        Address: Address,
        City: City,
        Country: Country,
        Mobile: Mobile,
      },
    }
  );
  res.status(200).json({ message: "Employee Updated", employee });
});

exports.employeeStatusChanger = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { Mode: req.body.Mode } }
  );
  res.json(employee.Mode);
});

exports.employeeDetail = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById({ _id: req.body._id });
  res.status(200).json({ message: "This Employee", employee });
});

exports.changePassword = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ _id: req.body._id })
    .select("+password")
    .exec();
  let salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.newPassword, salt);
  const isMatched = bcrypt.compareSync(req.body.oldPassword, employee.password);
  if (isMatched) {
    const employee = await Employee.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        $set: { password: hashPassword },
      }
    );
    res.json({ employee, message: 200 });
  } else {
    res.json({ message: 204, errorr: "Enter Correct Password " });
  }
});
