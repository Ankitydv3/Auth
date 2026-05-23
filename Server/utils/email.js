const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});

transporter.verify((err, success) => {
  if (err) {
    console.log("Email error:", err);
  } else {
    console.log("Email server ready:", success);
  }
});

exports.sendOtpEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Eventora" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Event Booking OTP",
      html: `
        <h2>Your OTP</h2>
        <h1>${otp}</h1>
        <p>Valid for 5 minutes</p>
      `
    });

    console.log("OTP sent:", info.messageId);

  } catch (error) {
    console.log("MAIL ERROR:", error);
    throw error;
  }
};