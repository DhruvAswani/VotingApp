import React from "react";
import axios from "axios";
import ListConstituency from "./ListConstituency";

const Adminpanel = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/constituency/list"
      );
      console.log(response.status, response.data.token);
      console.log(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Show Constituencies
      </button>
      <ListConstituency />
    </>
  );
};

export default Adminpanel;
