const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const URL =
      "mongodb+srv://root:root@root.haxxb.mongodb.net/?retryWrites=true&w=majority&appName=root";

    await mongoose.connect(URL);
    console.log("Connected to Database");
  } catch (err) {
    console.log("Error in connection with Database");
  }
};
module.exports = connectToDb;
