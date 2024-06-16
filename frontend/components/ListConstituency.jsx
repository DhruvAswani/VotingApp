import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListConstituency = () => {
  const [constituencies, setConstituencies] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/constituency/list"
      );
      setConstituencies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const listOfConstituency = constituencies.map((constituency, index) => (
    <li key={index}>
      <p>{constituency.name}</p>
      <span>{constituency.state}</span>
    </li>
  ));

  return (
    <>
      <div>
        <h1 className="font-bold p-8">List of Constituencies</h1>
        <ul className="border-2 rounded-sm w-24 mx-8">{listOfConstituency}</ul>
      </div>
    </>
  );
};

export default ListConstituency;
