const express = require("express");
const router = express.Router();

// Mock database (replace with actual database logic)
const players = [];

// POST route for player registration
router.post("/player-register", async (req, res) => {
  try {
    const { name, age, gender, role, team, email } = req.body;

    // Validate required fields
    if (!name || !age || !gender || !role || !team || !email) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Add player to the mock database (replace with actual DB logic)
    const newPlayer = { name, age, gender, role, team, email };
    players.push(newPlayer);

    // Respond with success
    res
      .status(201)
      .json({
        success: true,
        message: "Player registered successfully!",
        player: newPlayer,
      });
  } catch (error) {
    console.error("Error registering player:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
