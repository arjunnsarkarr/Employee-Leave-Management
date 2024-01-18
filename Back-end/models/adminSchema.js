const mongoose = require("mongoose");

const adminModel = new mongoose.Schema(
  {
    username: {
      type: String,
      unique :true
    },
    password: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", adminModel);
module.exports = Admin;
