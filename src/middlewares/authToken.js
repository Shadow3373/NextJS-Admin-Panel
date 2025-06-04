const jwt = require("jsonwebtoken");
const user = require("../models/user.model");

const generateToken = (data) => {
  return jwt.sign({ ...data }, process.env.SECRET_KEY, { expiresIn: "1h" });
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

module.exports = {
  generateToken,
  verifyToken,
};
