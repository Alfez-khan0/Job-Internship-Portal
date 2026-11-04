
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// ==========================================
// GENERATE JWT TOKEN
// ==========================================

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ==========================================
// GENERATE 6-DIGIT OTP
// ==========================================

const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// ==========================================
// SEND OTP THROUGH EMAIL
// ==========================================

const sendOTP = async (email, otp) => {

  // Development mode: print OTP in terminal
  if (process.env.NODE_ENV === "development") {
    console.log("--------------------------------");
    console.log("GENERATED OTP:", otp);
    console.log("EMAIL:", email);
    console.log("--------------------------------");
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials are missing in .env");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Job Internship Portal - Email Verification",

    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Welcome to Job Internship Portal!</h2>

        <p>Your email verification OTP is:</p>

        <h1 style="color: #2563eb; letter-spacing: 5px;">
          ${otp}
        </h1>

        <p>This OTP is valid for 10 minutes.</p>

        <p>Please do not share this OTP with anyone.</p>
      </div>
    `
  });

  console.log("OTP email sent successfully to:", email);
};

// ==========================================
// REGISTER USER
// ==========================================

exports.register = async (req, res) => {
  try {

    const { fullName, email, password, role } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Validate role
    const allowedRoles = ["student", "employer", "mentor"];

    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid user role."
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered."
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate OTP
    const otp = generateOTP();

    console.log("New OTP generated:", otp);

    // Create user
    const user = await User.create({
      fullName,
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "student",

      otp: otp,
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),

      isVerified: false
    });

    // Send OTP email
    try {

      await sendOTP(normalizedEmail, otp);

    } catch (mailError) {

      console.error("OTP EMAIL ERROR:", mailError.message);

      // Remove unverified account if email fails
      await User.findByIdAndDelete(user._id);

      return res.status(503).json({
        message: "OTP could not be sent. Please check your email configuration.",
        error: process.env.NODE_ENV === "development"
          ? mailError.message
          : undefined
      });
    }

    return res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent to your email.",
      userId: user._id
    });

  } catch (error) {

    console.error("REGISTRATION ERROR:", error);

    return res.status(500).json({
      message: "Registration failed.",
      error: error.message
    });
  }
};

// ==========================================
// VERIFY OTP
// ==========================================
exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        message: "User ID and OTP are required."
      });
    }

    const user = await User.findById(userId)
      .select("+otp +otpExpiry");

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified."
      });
    }

    if (
      !user.otp ||
      !user.otpExpiry ||
      user.otp !== String(otp).trim() ||
      user.otpExpiry < new Date()
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP."
      });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully."
    });

  } catch (error) {
    console.error("OTP ERROR:", error);

    return res.status(500).json({
      message: "OTP verification failed.",
      error: error.message
    });
  }
};

// ==========================================
// LOGIN USER
// ==========================================

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase()
    }).select("+password");

    if (
      !user ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first."
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful.",

      token,

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Login failed.",
      error: error.message
    });
  }
};

// ==========================================
// GET USER PROFILE
// ==========================================

exports.getProfile = async (req, res) => {
  try {

    return res.status(200).json({
      success: true,

      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        role: req.user.role,
        profile: req.user.profile
      }
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message
    });
  }
};

// ==========================================
// UPDATE USER PROFILE
// ==========================================

exports.updateProfile = async (req, res) => {
  try {

    const allowedFields = [
      "phone",
      "location",
      "education",
      "qualification",
      "skills",
      "resume",
      "companyName",
      "companyDescription",
      "website",
      "experience",
      "expertise"
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[`profile.${field}`] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      profile: user.profile
    });

  } catch (error) {

    console.error("PROFILE UPDATE ERROR:", error);

    return res.status(500).json({
      message: "Profile update failed.",
      error: error.message
    });
  }
};
