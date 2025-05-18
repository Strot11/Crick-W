const Team = require("../models/teamModel");

// Function to register a team
const registerTeam = async (req, res) => {
  try {
    const { teamName, coachName, captainName, region, email, photoURL } =
      req.body;

    // Validate required fields
    if (
      !teamName ||
      !coachName ||
      !captainName ||
      !region ||
      !email ||
      !photoURL
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check if the email is already registered
    const existingTeam = await Team.findOne({ email });
    if (existingTeam) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already registered." });
    }

    // Create a new team
    const newTeam = new Team({
      teamName,
      coachName,
      captainName,
      region,
      email,
      photoURL,
    });
    await newTeam.save();

    res.status(201).json({
      success: true,
      message: "Team registered successfully!",
      team: newTeam,
    });
  } catch (error) {
    console.error("Error registering team:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { registerTeam };
