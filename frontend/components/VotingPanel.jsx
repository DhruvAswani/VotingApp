import React, { useEffect, useState } from "react";
import axios from "axios";
import Voting from "./Voting";
import VotingCard from "./VotingCard";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0Y…xNTB9.DMQzRoq3IvNP-y_ODMfHPF7bL3PjjWxFO0Mm8QPva4g";
const VotingPanel = () => {
  const [userData, setUserData] = useState("");
  async function getInfo() {
    try {
      const response = await axios.get("http://127.0.0.1:3000/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <VotingCard />
    </>
  );
};

export default VotingPanel;
