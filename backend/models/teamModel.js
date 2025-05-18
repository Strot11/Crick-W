const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  coachName: { type: String, required: true },
  captainName: { type: String, required: true },
  region: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photoURL: {
    type: String,
  },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
