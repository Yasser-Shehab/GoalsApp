const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Required"],
    },
    email: {
      type: String,
      required: [true, "Email Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password Required"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
