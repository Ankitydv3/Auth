const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOtpEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Event Booking OTP",

      html: `
        <h2>Your Booking OTP</h2>
        <h1>${otp}</h1>
        <p>OTP valid for 5 minutes.</p>
      `,
    });

    console.log("OTP sent:", info.messageId);

  } catch (error) {
    console.log("EMAIL ERROR:", error);
    throw error;
  }
};

transporter.verify((err) => {
  if (err) {
    console.log("Email error:", err);
  } else {
    console.log("Email server ready");
  }
});