const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ✅ Single Clean Function
exports.sendOtpEmail = async (email, otp, type = "account_verification") => {
    try {
        // 🎯 Dynamic subject
        const subject = type === 'account_verification'
            ? 'Account Verification OTP'
            : 'Event Booking OTP';

        // 🎯 Dynamic message
        const message = type === 'account_verification'
            ? `🔐 Your OTP for account verification is`
            : `🎟️ Your OTP for event booking is`;

        const mailOptions = {
            from: `"Eventora" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <p style="font-size:16px;">
                        ${message}
                    </p>

                    <h2 style="letter-spacing:4px; color:#007bff;">
                        ${otp}
                    </h2>

                    <p>⏳ Valid for <b>5 minutes</b></p>

                    <p style="color:red;">
                        ⚠️ Do not share this code with anyone
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ OTP sent to:", email);

    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        throw new Error('Failed to send OTP email');
    }
};