const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: false },
    createdBy: { type: String },
    updatedBy: { type: String },
    refressToken: { type: String },
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", userSchema);
