const mongoose = require("mongoose");

const employeeModel = new mongoose.Schema(
  {
    EID: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      uniquie: true,
    },
    password: {
      type: String,
      select: false,
    },
    Gender: {
      type: String,
    },
    DOB: {
      type: String,
    },
    Department: {
      type: String,
    },
    Address: {
      type: String,
    },
    City: {
      type: String,
    },
    Country: {
      type: String,
    },
    Mobile: {
      type: String,
    },
    Mode: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("employee", employeeModel);
module.exports = Employee;
