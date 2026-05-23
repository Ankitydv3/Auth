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

  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify((err) => {
  if (err) {
    console.log("Email error:", err);
  } else {
    console.log("Email server ready");
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