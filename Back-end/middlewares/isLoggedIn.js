const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utlis/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncErrors");

exports.isLoggedIn = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login first to access this page", 401));
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  req.id = id  
  next();
});






