const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const screenshotController = require("../controllers/screenshotController");
const auth = require("../middleware/auth");
router.post("/upload", auth, upload.single("image"), screenshotController.uploadScreenshot);
router.get("/", auth, screenshotController.getScreenshots);
router.delete("/:id", auth, screenshotController.deleteScreenshot);
module.exports = router;
