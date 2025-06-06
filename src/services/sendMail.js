const nodemailer = require("nodemailer");

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP Route
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  otpStore[email] = otp;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    html: `<h1>OTP Login</h1><p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Verify OTP Route
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email]; // OTP used
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }
});
