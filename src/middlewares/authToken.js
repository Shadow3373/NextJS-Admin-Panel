const jwt = require("jsonwebtoken");
const user = require("../models/user.model");

const generateToken = (data) => {
  return jwt.sign({ ...data }, process.env.SECRET_KEY, { expiresIn: "15m" });
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token && !token?.StartWidth("Bearer"))
    return res.status(401).json({ message: "Authorization Failed" });
  const withoutBearer = token.split(" ")[1];
  try {
    const payload = jwt.verify(withoutBearer, process.env.SECRET_KEY);
    const checkUser = await user.exists({ _id: payload._id });
    if (!checkUser)
      return res.status(401).json({ message: "Authorization Failed" });
    req.user = payload;
    next();
  } catch (error) {
    res.status(500).json({ message: "Authorization Failed" });
  }
  res.json("user verfied successfully");
};

const verfiyOTP = (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email]; // OTP used
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }
};
module.exports = {
  generateToken,
  verifyToken,
  verfiyOTP,
};
