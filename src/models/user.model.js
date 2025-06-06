const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [10, "Password must be at least 6 characters"],
      select: false,
    },
    mobile: {
      type: String,
      trim: true,
      match: [/^[0-9]/, "Please enter a valid 10-digit phone number"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
    inactiveSince: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
