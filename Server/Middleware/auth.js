const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const protect = async (req, res, next) => {
  let token = null;

  // Check token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No token
  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Get user
    req.user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!req.user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Token failed",
    });
  }
};

// ADMIN
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Admin only",
    });
  }
};

module.exports = {
  protect,
  admin,
};