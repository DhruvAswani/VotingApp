const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const constituencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  candidates: [
    {
      candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
      },
    },
  ],
});

const Constituency = mongoose.model("Constituency", constituencySchema);
module.exports = Constituency;
