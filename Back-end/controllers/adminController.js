const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Admin = require("../models/adminSchema");
const Department = require("../models/departmentSchema");
const ErrorHandler = require("../utlis/ErrorHandler");
const { setcookie } = require("../utlis/setCookie");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.adminSignup = catchAsyncErrors(async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const admin = await new Admin({
    username: username,
    password: hashPassword,
  }).save();
  res.json({ message: "Admin Created", admin: admin });
});

exports.adminSignin = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findOne({ username: req.body.username })
    .select("+password")
    .exec();
  if (!admin) return next(new ErrorHandler("Admin Not Found", 404));
  const isMatched = bcrypt.compareSync(req.body.password, admin.password);
  if (!isMatched) {
    return next(new ErrorHandler("Wrong Password", 500));
  }
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
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
    .json({ message: "Login Successful", admin: admin, token: token });
});

exports.adminHome = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findById(req.id).exec();
  res.json({ admin });
});

exports.adminSignOut = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json("Signed Out");
});
