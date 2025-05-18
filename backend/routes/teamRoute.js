const express = require("express");
const { registerTeam } = require("../controller/teamController");
const Team = require("../models/teamModel");

const router = express.Router();

// POST route for team registration
router.post("/team-register", registerTeam);
router.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json({ success: true, teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});
// Add this route along with your existing routes
router.delete("/teams/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found" });
    }
    res.json({ success: true, message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ success: false, message: "Error deleting team" });
  }
});

module.exports = router;
