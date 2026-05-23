const nodemailer = require("nodemailer");
const { Resend } = require("resend");
require("dotenv").config();

const useResend = Boolean(process.env.RESEND_API_KEY?.trim());

let resendClient = null;
if (useResend) {
  resendClient = new Resend(process.env.RESEND_API_KEY);
}

let transporter = null;
if (!useResend && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  });

  transporter.verify((err) => {
    if (err) {
      console.log("SMTP verify failed:", err.message);
    } else {
      console.log("SMTP ready (Gmail)");
    }
  });
} else if (useResend) {
  console.log("Email: using Resend API");
} else {
  console.warn(
    "Email not configured. Set RESEND_API_KEY (production) or EMAIL_USER + EMAIL_PASS (local).",
  );
}

const getFromAddress = () => {
  if (process.env.EMAIL_FROM) return process.env.EMAIL_FROM;
  if (useResend) return "Eventora <onboarding@resend.dev>";
  return `"Eventora" <${process.env.EMAIL_USER}>`;
};

const sendEmail = async ({ to, subject, html }) => {
  if (useResend) {
    const { data, error } = await resendClient.emails.send({
      from: getFromAddress(),
      to,
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message || JSON.stringify(error));
    }

    return data;
  }

  if (!transporter) {
    throw new Error(
      "Email not configured. Add RESEND_API_KEY on your host (Render), or EMAIL_USER and EMAIL_PASS for local Gmail.",
    );
  }

  return transporter.sendMail({
    from: getFromAddress(),
    to,
    subject,
    html,
  });
};

const OTP_SUBJECTS = {
  account_verification: "Verify your Eventora account",
  event_booking: "Your event booking OTP",
};

exports.sendOtpEmail = async (email, otp, action = "event_booking") => {
  const subject = OTP_SUBJECTS[action] || "Eventora OTP";
  const html = `
    <h2>Your OTP</h2>
    <h1 style="letter-spacing:4px">${otp}</h1>
    <p>Valid for 5 minutes. Do not share this code.</p>
  `;

  try {
    const result = await sendEmail({ to: email, subject, html });
    console.log("OTP sent:", result?.id || result?.messageId);
  } catch (error) {
    console.error("MAIL ERROR:", error.message || error);
    throw error;
  }
};

exports.sendBookingEmail = async (email, bookingId, eventTitle, status) => {
  const subject = `Booking ${status} — ${eventTitle}`;
  const html = `
    <h2>Booking update</h2>
    <p><strong>Event:</strong> ${eventTitle}</p>
    <p><strong>Status:</strong> ${status}</p>
    <p><strong>Booking ID:</strong> ${bookingId}</p>
  `;

  try {
    const result = await sendEmail({ to: email, subject, html });
    console.log("Booking email sent:", result?.id || result?.messageId);
  } catch (error) {
    console.error("BOOKING MAIL ERROR:", error.message || error);
    throw error;
  }
};
