const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const Candidate = require("./../models/candidate");
const User = require("./../models/user");
const Constituency = require("./../models/constituencies");

router.get("/list", async (req, res) => {
  try {
    const response = await Constituency.find();
    if (!response) {
      return res.status(404).json("No record found");
    }

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(501).json("Internal server error occurred");
  }
});

router.post("/addconstituency", async (req, res) => {
  try {
    const data = req.body;
    const newConstituency = Constituency(data);
    const response = await newConstituency.save();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(501).json("Internal server error occurred");
  }
});

router.delete("/deleteconstituency/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const query = { name: name };
    const response = await Constituency.findOneAndDelete(query);

    if (!response) {
      console.log("No record found");
      return res.status(404).json("No record found");
    }

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Some error occurred" });
  }
});

router.post("/addcandidates/:candidateId/:constituencyId", async (req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json("Candidate not found");
    }

    const constituencyId = req.params.constituencyId;
    const constituency = await Constituency.findById(constituencyId);

    if (!constituency) {
      return res.status(404).json("Constituency not found");
    }

    constituency.candidates.push({ candidate: candidateId });
    await constituency.save();

    return res
      .status(200)
      .json("Added the candidate to the constituency successfully");
  } catch (error) {
    console.log(error);
    return res.status(501).json("Internal server error occurred");
  }
});

module.exports = router;
