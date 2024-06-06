const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const jwtAuthMiddleware = require("./jwt");

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

const candidateRoutes = require("./routes/candidateRoutes");
app.use("/candidate", candidateRoutes);

const constituencyRoutes = require("./routes/constituencyRoutes");
app.use("/constituency", constituencyRoutes);

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
