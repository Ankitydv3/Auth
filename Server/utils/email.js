const nodemailer = require("nodemailer");
const { Resend } = require("resend");
require("dotenv").config();

const resendApiKey = process.env.RESEND_API_KEY?.trim() || "";
const emailUser = process.env.EMAIL_USER?.trim() || "";
const emailPass = process.env.EMAIL_PASS?.trim() || "";
const emailFrom = process.env.EMAIL_FROM?.trim() || "";

const useResend = Boolean(resendApiKey);
const useSmtp = Boolean(emailUser && emailPass);

let resendClient = null;
if (useResend) {
  resendClient = new Resend(resendApiKey);
}

let transporter = null;
if (useSmtp) {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPass,
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
}

if (useResend) {
  console.log("Email: Resend API enabled");
} else if (useSmtp) {
  console.log("Email: Gmail SMTP enabled");
} else {
  console.warn(
    "Email not configured. Set RESEND_API_KEY and/or EMAIL_USER + EMAIL_PASS.",
  );
}

const isResendSandboxFrom = (from) =>
  !from || from.includes("onboarding@resend.dev");

const getFromAddress = () => {
  if (emailFrom) return emailFrom;
  if (useResend && !useSmtp) return "Eventora <onboarding@resend.dev>";
  if (emailUser) return `"Eventora" <${emailUser}>`;
  return "Eventora <onboarding@resend.dev>";
};

const formatMailError = (error) => {
  const message = error?.message || String(error);
  if (message.includes("only send testing emails to your own email")) {
    return (
      "Email could not be sent: Resend test mode only allows your own inbox. " +
      "Verify a domain at resend.com/domains and set EMAIL_FROM, or add EMAIL_USER + EMAIL_PASS for Gmail."
    );
  }
  return message;
};

const sendViaResend = async ({ to, subject, html }) => {
  const { data, error } = await resendClient.emails.send({
    from: getFromAddress(),
    to,
    subject,
    html,
  });

  if (error) {
    const err = new Error(error.message || JSON.stringify(error));
    err.provider = "resend";
    throw err;
  }

  return data;
};

const sendViaSmtp = async ({ to, subject, html }) => {
  if (!transporter) {
    throw new Error(
      "Gmail SMTP not configured. Set EMAIL_USER and EMAIL_PASS in your server environment.",
    );
  }

  return transporter.sendMail({
    from: getFromAddress(),
    to,
    subject,
    html,
  });
};

const sendEmail = async ({ to, subject, html }) => {
  const payload = { to, subject, html };
  const from = getFromAddress();

  // Resend sandbox cannot deliver to arbitrary addresses — use Gmail when available
  if (useResend && useSmtp && isResendSandboxFrom(from)) {
    return sendViaSmtp(payload);
  }

  if (useResend) {
    try {
      return await sendViaResend(payload);
    } catch (error) {
      console.error("Resend failed:", error.message);
      if (useSmtp) {
        console.log("Falling back to Gmail SMTP...");
        return sendViaSmtp(payload);
      }
      throw new Error(formatMailError(error));
    }
  }

  if (useSmtp) {
    return sendViaSmtp(payload);
  }

  throw new Error(
    "Email not configured. Add RESEND_API_KEY (with verified domain) or EMAIL_USER + EMAIL_PASS on your host.",
  );
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
