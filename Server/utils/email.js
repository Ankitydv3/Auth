const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.log("❌ Email config error:", err.message);
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
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject:
        type === "account_verification"
          ? "Account Verification OTP"
          : "Event Booking OTP",

      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>Eventora OTP Verification</h2>
          <h1>${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("✅ OTP sent:", info.messageId);

  } catch (error) {
    console.log("❌ MAIL ERROR:", error.message);
    throw error;
  }
};