const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      option: ["Admin", "Super Admin", "User", "Editor"],
    },
    status: {
      type: String,
      option: ["pending", "active", "inactive"],
      default: "pending",
    },
    lastActive: {
      TimeRanges: true,
    },
  },
  {
    timestamps: true,
  }
);

const user = model("user", userSchema);

module.exports = user;
