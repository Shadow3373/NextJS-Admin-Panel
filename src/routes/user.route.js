const { Router } = require("express");
const {
  userRegister,
  userLogin,
  getUsers,
  userLogout,
  loginWithOTP,
} = require("../controllers/user.controller");
const { verifyToken, verfiyOTP } = require("../middlewares/authToken");

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin, loginWithOTP);
router.post("/auth", verifyToken);
router.post("/login-with-otp", loginWithOTP);
router.post("/otp-verify", verfiyOTP);
router.post("/logout", userLogout);
router.get("/getall", getUsers);

module.exports = router;
