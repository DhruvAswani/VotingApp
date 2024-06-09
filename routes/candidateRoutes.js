const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const Candidate = require("./../models/candidate");
const User = require("./../models/user");

const checkAdminRole = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user.role === "admin";
  } catch (error) {
    console.log(error);
    return false;
  }
};

router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.userData.id))) {
      return res.status(403).json("Unauthorized access");
    } else {
      console.log(req.user.userData.id);
    }

    const data = req.body;
    const newCandidate = Candidate(data);
    const response = await newCandidate.save();
    console.log("Data Saved");

    res.status(200).json({ response: response });
  } catch (error) {
    console.log("Error occured");
    console.log(error);
    res.status(500).json({ error: "Some error occurred" });
  }
});

router.put("/:candidateId", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!checkAdminRole(req.user.userData.id)) {
      return res.status(403).json("Unauthorized access");
    }

    const candidateId = req.params.id;
    const updatedCandidateData = req.body;
    const response = await Person.findByIdAndUpdate(
      candidateId,
      updatedCandidateData,
      { new: true, runValidators: true }
    );

    if (!response) {
      res.status(404).json("No record found");
    }

    console.log("Data Updated");
    res.status(200).json("Data Updated");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Some error occurred" });
  }
});

router.delete("/:candidateId", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!checkAdminRole(req.user.userData.id)) {
      return res.status(403).json("Unauthorized access");
    }

    const candidateId = req.params.id;
    const response = await Person.findByIdAndDelete(candidateId);

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

router.post("/vote/:candidateId", jwtAuthMiddleware, async (req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const userId = req.user.userData.id;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json("Candidate not found");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (user.isVoted) {
      return res.status(404).json("User has already voted");
    }
    if (user.role === "admin") {
      return res.status(404).json("Admin cannot vote");
    }

    user.isVoted = true;
    await user.save();
    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();
    res.status(200).json("Vote casted");
  } catch (error) {
    console.log("Error occured");
    console.log(error);
    res.status(500).json({ error: "Some error occurred" });
  }
});

router.get("/vote/count", async (req, res) => {
  try {
    const candidate = await Candidate.find().sort({ voteCount: "desc" });

    const voteRecord = candidate.map((data) => {
      return {
        party: data.party,
        count: data.voteCount,
      };
    });

    return res.status(200).json(voteRecord);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Some error occurred" });
  }
});

router.get("/list", async (req, res) => {
  try {
    const candidate = await Candidate.find();
    const response = candidate.map((data) => {
      return {
        name: data.name,
        party: data.party,
      };
    });

    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Some error occurred" });
  }
});

module.exports = router;
