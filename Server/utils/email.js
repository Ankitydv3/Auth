const nodemailer = require("nodemailer");
const { Resend } = require("resend");
require("dotenv").config();

const resendApiKey = process.env.RESEND_API_KEY?.trim() || "";
const brevoApiKey = process.env.BREVO_API_KEY?.trim() || "";
const emailUser = process.env.EMAIL_USER?.trim() || "";
const emailPass = process.env.EMAIL_PASS?.trim() || "";
const emailFrom = process.env.EMAIL_FROM?.trim() || "";

// Render/Railway/Heroku block outbound SMTP
const isHosted =
  process.env.RENDER === "true" ||
  Boolean(process.env.RAILWAY_ENVIRONMENT) ||
  Boolean(process.env.DYNO);

const useBrevo = Boolean(brevoApiKey);
const useResend = Boolean(resendApiKey);
const useSmtp = !isHosted && Boolean(emailUser && emailPass);

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
    auth: { user: emailUser, pass: emailPass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });

  transporter.verify((err) => {
    if (err) console.log("SMTP verify failed:", err.message);
    else console.log("SMTP ready (Gmail)");
  });
}

const logEmailMode = () => {
  if (isHosted) {
    if (useBrevo) console.log("Email: Brevo API (hosted)");
    else if (useResend) console.log("Email: Resend API (hosted)");
    else console.log("Email: NOT CONFIGURED — set BREVO_API_KEY or RESEND_API_KEY on Render");
    return;
  }
  if (useBrevo) console.log("Email: Brevo API enabled");
  else if (useResend) console.log("Email: Resend API enabled");
  else if (useSmtp) console.log("Email: Gmail SMTP enabled");
  else console.warn("Email not configured.");
};
logEmailMode();

const isResendSandboxFrom = (from) =>
  !from || from.includes("onboarding@resend.dev");

const isInvalidResendFrom = (from) =>
  from.includes("@gmail.com") ||
  from.includes("@googlemail.com") ||
  from.includes("@yahoo.") ||
  from.includes("@hotmail.");

const getFromAddress = () => {
  if (emailFrom) {
    if (useResend && !useBrevo && isInvalidResendFrom(emailFrom)) {
      if (isHosted) return "Eventora <onboarding@resend.dev>";
      if (useSmtp) return `"Eventora" <${emailUser}>`;
    }
    return emailFrom;
  }
  if (useResend && !useBrevo && !useSmtp) {
    return "Eventora <onboarding@resend.dev>";
  }
  if (emailUser) return `"Eventora" <${emailUser}>`;
  return "Eventora <onboarding@resend.dev>";
};

const getBrevoSender = () => {
  const from = getFromAddress();
  const match = from.match(/^(.+?)\s*<([^>]+)>$/);
  if (match) {
    return { name: match[1].trim().replace(/^"|"$/g, ""), email: match[2].trim() };
  }
  if (from.includes("@")) {
    return { name: "Eventora", email: from };
  }
  if (emailUser) {
    return { name: "Eventora", email: emailUser };
  }
  throw new Error(
    "Set EMAIL_USER (your verified Brevo sender email) or EMAIL_FROM on Render.",
  );
};

const formatMailError = (error) => {
  const message = error?.message || String(error);

  if (message.includes("only send testing emails to your own email")) {
    return (
      "OTP email failed: Resend test mode only delivers to your own inbox. " +
      "Fix: add BREVO_API_KEY on Render (free at brevo.com, verify your Gmail as sender) " +
      "OR verify a domain at resend.com/domains and set EMAIL_FROM."
    );
  }

  if (
    message.includes("domain is not verified") ||
    message.includes("not verified")
  ) {
    return (
      "OTP email failed: sender not verified. " +
      "For Brevo: verify EMAIL_USER at brevo.com → Senders. " +
      "For Resend: verify your domain and set EMAIL_FROM."
    );
  }

  return message;
};

const sendViaBrevo = async ({ to, subject, html }) => {
  const sender = getBrevoSender();

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": brevoApiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender,
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      body.message || body.error || `Brevo API error (${response.status})`,
    );
  }

  return body;
};

const sendViaResend = async ({ to, subject, html }) => {
  const from = getFromAddress();

  if (isHosted && isResendSandboxFrom(from)) {
    throw new Error(
      "Resend test sender cannot email users. Add BREVO_API_KEY on Render or verify a domain on Resend.",
    );
  }

  const { data, error } = await resendClient.emails.send({
    from,
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message || JSON.stringify(error));
  }

  return data;
};

const sendViaSmtp = async ({ to, subject, html }) => {
  if (!transporter) {
    throw new Error("Gmail SMTP not configured (local dev only).");
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

  if (isHosted) {
    if (useBrevo) return sendViaBrevo(payload);
    if (useResend) return sendViaResend(payload);
    throw new Error(
      "Email not configured on Render. Add BREVO_API_KEY (recommended) or RESEND_API_KEY with a verified domain.",
    );
  }

  if (useBrevo) return sendViaBrevo(payload);

  if (useResend && useSmtp && isResendSandboxFrom(getFromAddress())) {
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
      if (useBrevo) return sendViaBrevo(payload);
      throw new Error(formatMailError(error));
    }
  }

  if (useSmtp) return sendViaSmtp(payload);

  throw new Error(
    "Email not configured. Set BREVO_API_KEY, RESEND_API_KEY, or EMAIL_USER + EMAIL_PASS.",
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
    console.log("OTP sent:", result?.id || result?.messageId || "ok");
  } catch (error) {
    console.error("MAIL ERROR:", error.message || error);
    throw new Error(formatMailError(error));
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
    console.log("Booking email sent:", result?.id || result?.messageId || "ok");
  } catch (error) {
    console.error("BOOKING MAIL ERROR:", error.message || error);
    throw new Error(formatMailError(error));
  }
};
