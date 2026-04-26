const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const auth = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/update-email", auth, authController.updateEmail);
router.post("/update-password", auth, authController.updatePassword);

module.exports = router;
