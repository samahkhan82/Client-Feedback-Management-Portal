const express = require("express");
const multer = require("multer");
const {
  submitFeedback,
  getFeedback,
} = require("../controllers/feedbackController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate unique filename
  },
});

const upload = multer({ storage: storage });

// POST route for submitting feedback with file upload
router.post("/", authenticateUser, upload.single("attachment"), submitFeedback);

// GET route for retrieving feedbacks
router.get("/", authenticateUser, getFeedback);

module.exports = router;
