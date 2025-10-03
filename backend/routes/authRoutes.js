const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.get("/verify-token", authController.verifyToken);
router.get("/user/profile", authController.getUserProfile);

module.exports = router;



