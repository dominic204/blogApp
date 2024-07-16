const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "firstname is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastname is required"],
  },
  mobileNo: {
    type: String,
    required: [true, "mobile number is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", userSchema);
