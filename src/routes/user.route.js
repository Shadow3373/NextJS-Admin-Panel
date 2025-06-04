const { Router } = require("express");
const {
  userRegister,
  userLogin,
  getUsers,
  userLogout,
} = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/authToken");

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
// router.use(verifyToken);
router.post("/auth", verifyToken);
router.post("/logout", userLogout);
router.get("/getall", getUsers);

module.exports = router;
