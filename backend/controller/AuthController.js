const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper: get cookie options from env
const getCookieOptions = () => {
  // Derive maxAge from JWT_EXPIRE (supports e.g., 30d, 12h, 60m)
  const expire = process.env.JWT_EXPIRE || "30d";
  const match = String(expire).match(/^(\d+)([dhm]?)$/i);
  let ms = 30 * 24 * 60 * 60 * 1000; // default 30d
  if (match) {
    const num = parseInt(match[1], 10);
    const unit = (match[2] || "d").toLowerCase();
    if (unit === "d") ms = num * 24 * 60 * 60 * 1000;
    if (unit === "h") ms = num * 60 * 60 * 1000;
    if (unit === "m") ms = num * 60 * 1000;
  }
  return {
    httpOnly: true,
    secure:
      String(process.env.COOKIE_SECURE || "false").toLowerCase() === "true",
    sameSite: process.env.COOKIE_SAMESITE || "lax",
    maxAge: ms,
  };
};

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

// @desc    Register new admin
// @route   POST /api/auth/register
// @access  Public (can be restricted later)
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide name, email, and password",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: "User already exists with this email",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id);
      res
        .cookie("token", token, getCookieOptions())
        .status(201)
        .json({
          success: true,
          message: "Admin registered successfully",
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
          },
        });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to register admin",
      message: error.message,
    });
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide email and password",
      });
    }

    // Check if user exists and get password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, getCookieOptions()).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to login",
      message: error.message,
    });
  }
};

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to get user info",
      message: error.message,
    });
  }
};

// @desc    Logout admin (clear cookie)
// @route   POST /api/auth/logout
// @access  Public (idempotent)
exports.logout = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure:
          String(process.env.COOKIE_SECURE || "false").toLowerCase() === "true",
        sameSite: process.env.COOKIE_SAMESITE || "lax",
      })
      .json({ success: true, message: "Logged out" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to logout",
      message: error.message,
    });
  }
};
