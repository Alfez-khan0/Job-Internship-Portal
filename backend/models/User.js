
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["student", "employer", "mentor", "admin"],
      default: "student",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      select: false,
    },

    otpExpiry: {
      type: Date,
      select: false,
    },

    profile: {
      phone: String,
      location: String,
      education: String,
      qualification: String,
      skills: [String],
      resume: String,
      companyName: String,
      companyDescription: String,
      website: String,
      experience: String,
      expertise: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
