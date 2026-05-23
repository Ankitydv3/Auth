const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log("❌ Email config error:", err);
  } else {
    console.log("✅ Email server ready");
  }
});

exports.sendOtpEmail = async (
  email,
  otp,
  type = "account_verification"
) => {
  try {
    await transporter.sendMail({
      from: `"Eventora" <${process.env.EMAIL_USER}>`,
      to: email,
      subject:
        type === "account_verification"
          ? "Account Verification OTP"
          : "Event Booking OTP",

      html: `
      <h2>Your OTP: ${otp}</h2>
      <p>Valid for 5 minutes</p>
      `
    });

    console.log("OTP sent:", email);

  } catch(error) {
    console.log("MAIL ERROR:", error);
    throw error;
  }
};