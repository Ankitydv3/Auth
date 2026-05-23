const User = require("../Models/User");
const OTP = require("../Models/OTP");
const bcrypt = require("bcryptjs");
const { sendOtpEmail } = require("../utils/email");

const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // ✅ fixed
      isVerified: false,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({ email, otp, action: "account_verification" });
    await sendOtpEmail(email, otp, "account_verification");

    // ✅ Only ONE response
    res.status(201).json({
      message: "User registered. OTP sent to email.",
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    const message =
      error.message?.includes("Email") || error.message?.includes("Resend")
        ? error.message
        : "Error registering user";
    res.status(500).json({ message });
  }
};
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase().trim();

    console.log("LOGIN EMAIL:", email);

    const user = await User.findOne({
      email: {
        $regex: `^${email}$`,
        $options: "i",
      },
    });

    console.log("FOUND USER:", user);

    console.log("FOUND USER:", user);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    if (!user.isVerified) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await OTP.deleteMany({
        email: user.email,
        action: "account_verification",
      });
      await OTP.create({
        email: user.email,
        otp,
        action: "account_verification",
      });

      try {
        await sendOtpEmail(user.email, otp, "account_verification");
      } catch (emailError) {
        console.error("Login OTP email failed:", emailError);
        return res.status(500).json({
          message:
            emailError.message ||
            "Could not send verification email. Try again later.",
        });
      }

      return res.status(200).json({
        needsVerification: true,
        email: user.email,
      });
    }

    return res.json({
      message: "Login successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await OTP.findOne({
      email,
      otp,
      action: "account_verification",
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    // ✅ Update user
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true },
    );

    await OTP.deleteOne({ _id: otpRecord._id });

    res.json({
      message: "Account verified successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
};
