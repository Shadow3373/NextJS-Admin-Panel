const { generateToken } = require("../middlewares/authToken");
const user = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { body } = req;
    const { password } = body;
    console.log(body);
    const [checkEmail] = await Promise.all([
      user.exists({ email: body.email }),
    ]);
    if (checkEmail)
      return res.status(409).json({ message: "User Already Exist" });
    let data = {
      ...body,
      password: await bcrypt.hash(password, 10),
    };
    console.log(data);
    const createUser = await user.create(data);
    res.json(createUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    console.log(req.body);
    let { email, password } = req.body;
    const checkEmail = await user.findOne({ email }).lean().exec();
    if (!checkEmail)
      return res.status(401).json({ message: "Invaild credential" });
    const checkPassword = await bcrypt.compare(password, checkEmail.password);
    if (!checkPassword)
      return res.status(401).json({ message: "Invaild credential" });
    const token = generateToken(checkEmail);
    console.log(token);
    res.json({ token, message: "User Login Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const data = await user.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "error: error.message" });
  }
};

const userLogout = (req, res) => {
  // if (!token && !token?.StartWidth("Bearer"))
  //   return res.status(401).json({ message: "Authorization Failed" });
  // const withoutBearer = token.split(" ")[1];
  try {
    const token = req.body;
    // const checktoken = jwt.verify(token, process.env.SECRET_KEY);
    if (token)
      return res.status(200).json({ message: "User Logout Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Token Already Expired" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  getUsers,
  userLogout,
};
