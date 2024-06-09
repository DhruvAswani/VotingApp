import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const AddCandidates = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/candidate/list").then((res) => {
      console.log(res.data);
      setList(res.data);
    });
  }, []);

  return <div></div>;
};

export default AddCandidates;
