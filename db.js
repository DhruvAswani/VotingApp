const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/voting";

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to database");
});

db.on("disconnected", () => {
  console.log("Disconnected to database");
});

db.on("error", (e) => {
  console.log("Error occurred: ", e);
});

module.exports = db;
