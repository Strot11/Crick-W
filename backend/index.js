const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDb = require("./database/db");
const playerRoutes = require("./routes/playerroutes");
const teamRoutes = require("./routes/teamRoute");

connectToDb();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const authroutes = require("./routes/authroutes");

app.use(cors());
app.use(bodyParser.json());
app.use("/", authroutes);
app.use("/api", playerRoutes);
app.use("/api", teamRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
