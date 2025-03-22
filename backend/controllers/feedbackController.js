const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
  try {
    const { category, priority, description } = req.body;

    // Validate required fields
    if (!category || !priority || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: No user found." });
    }

    // Create feedback object with file attachment path if available
    const feedback = new Feedback({
      userId: req.user.id,
      category,
      priority,
      description,
      attachment: req.file ? req.file.path : null, // Store file path if file is uploaded
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error in submitFeedback:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate(
      "userId",
      "username email"
    );
    res.json(feedbacks);
  } catch (error) {
    console.error("Error in getFeedback:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitFeedback, getFeedback };
