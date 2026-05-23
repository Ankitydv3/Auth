const nodemailer = require("nodemailer");
const { Resend } = require("resend");
require("dotenv").config();

const resendApiKey = process.env.RESEND_API_KEY?.trim() || "";
const emailUser = process.env.EMAIL_USER?.trim() || "";
const emailPass = process.env.EMAIL_PASS?.trim() || "";
const emailFrom = process.env.EMAIL_FROM?.trim() || "";

// Render/Railway/Heroku block outbound SMTP — use Resend HTTP API only
const isHosted =
  process.env.RENDER === "true" ||
  Boolean(process.env.RAILWAY_ENVIRONMENT) ||
  Boolean(process.env.DYNO);

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
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });

  transporter.verify((err) => {
    if (err) {
      console.log("SMTP verify failed:", err.message);
    } else {
      console.log("SMTP ready (Gmail)");
    }
  });
}

if (isHosted) {
  console.log(
    useResend
      ? "Email: Resend API (hosted — SMTP disabled)"
      : "Email: NOT CONFIGURED — set RESEND_API_KEY on Render",
  );
} else if (useResend) {
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

const isInvalidResendFrom = (from) =>
  from.includes("@gmail.com") ||
  from.includes("@googlemail.com") ||
  from.includes("@yahoo.") ||
  from.includes("@hotmail.");

const getFromAddress = () => {
  if (emailFrom) {
    if (useResend && isInvalidResendFrom(emailFrom)) {
      if (isHosted) {
        return "Eventora <onboarding@resend.dev>";
      }
      if (useSmtp) {
        return `"Eventora" <${emailUser}>`;
      }
    }
    return emailFrom;
  }

  if (useResend && !useSmtp) {
    return "Eventora <onboarding@resend.dev>";
  }
  if (emailUser) {
    return `"Eventora" <${emailUser}>`;
  }
  return "Eventora <onboarding@resend.dev>";
};

const formatMailError = (error) => {
  const message = error?.message || String(error);

  if (message.includes("only send testing emails to your own email")) {
    return (
      "OTP email failed: Resend test mode only delivers to your own inbox. " +
      "Verify a domain at https://resend.com/domains and set EMAIL_FROM to e.g. Eventora <noreply@yourdomain.com> in Render."
    );
  }

  if (
    message.includes("domain is not verified") ||
    message.includes("not verified")
  ) {
    return (
      "OTP email failed: sender domain not verified in Resend. " +
      "Add your domain at https://resend.com/domains and set EMAIL_FROM in Render to an address on that domain."
    );
  }

  return message;
};

const sendViaResend = async ({ to, subject, html }) => {
  const from = getFromAddress();

  if (isHosted && isResendSandboxFrom(from)) {
    console.warn(
      "Resend sandbox sender: OTP only works for your Resend account email until EMAIL_FROM uses a verified domain.",
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
    throw new Error(
      "Gmail SMTP not configured. Set EMAIL_USER and EMAIL_PASS (local dev only).",
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

  if (isHosted) {
    if (!useResend) {
      throw new Error(
        "Email not configured on Render. Add RESEND_API_KEY and a verified EMAIL_FROM in your Render environment settings.",
      );
    }
    return sendViaResend(payload);
  }

  // Local: prefer Gmail when Resend is still on sandbox sender
  if (useResend && useSmtp && isResendSandboxFrom(getFromAddress())) {
    return sendViaSmtp(payload);
  }

  if (useResend) {
    try {
      return await sendViaResend(payload);
    } catch (error) {
      console.error("Resend failed:", error.message);
      if (useSmtp) {
        console.log("Falling back to Gmail SMTP (local only)...");
        return sendViaSmtp(payload);
      }
      throw new Error(formatMailError(error));
    }
  }

  if (useSmtp) {
    return sendViaSmtp(payload);
  }

  throw new Error(
    "Email not configured. Set RESEND_API_KEY or EMAIL_USER + EMAIL_PASS.",
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
    console.log("Booking email sent:", result?.id || result?.messageId);
  } catch (error) {
    console.error("BOOKING MAIL ERROR:", error.message || error);
    throw new Error(formatMailError(error));
  }
};
