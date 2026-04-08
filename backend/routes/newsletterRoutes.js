const express = require("express");
const Newsletter = require("../models/Newsletter");
const router = express.Router();

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    await Newsletter.create({ email });
    res.json({ success: true });
  } catch {
    res.status(400).json({ error: "Already subscribed" });
  }
});

module.exports = router;
