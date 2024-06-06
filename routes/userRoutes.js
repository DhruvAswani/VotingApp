const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const User = require("./../models/user");
const { findById } = require("../models/candidate");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newUser = User(data);
    const response = await newUser.save();
    console.log("Data Saved");
    const payload = {
      id: response.id,
    };
    const token = generateToken(payload);
    console.log("Token is ", token);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log("Error occured");
    console.log(error);
    res.status(500).json({ error: "Some error occurred" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send("AadharCardNumber or password not found");
    }

    const payload = {
      id: user.id,
    };

    const token = generateToken(payload);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = req.user;
    const userId = data.userData.id;
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Internal server error" });
  }
});

router.put("/profile/password", async (req, res) => {
  try {
    const data = req.user;
    const userId = data.userData.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).send("Incorrect password");
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Some error occurred" });
  }
});

module.exports = router;
