import { useState } from "react";
import React from "react";
import axios from "axios";
import Typewriter from "./Typewriter";
import Login from "./Login";
import { Link } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: data.name,
      age: data.age,
      mobile: data.mobile,
      email: data.email,
      address: data.address,
      aadharCardNumber: data.aadharCardNumber,
      password: data.password,
    };
    axios
      .post("http://127.0.0.1:3000/user/signup", userData)
      .then((response) => {
        console.log(response.status, response.data.token);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="mt-10 text-lg sm:mx-auto sm:w-full sm:max-w-sm font-bold">
        <Typewriter className="" text={"Welcome to DecisionDesk"} delay={100} />
      </div>

      <form className="mb-10">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete=""
            required
            onChange={handleChange}
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="age"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            required
            onChange={handleChange}
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Mobile Number
          </label>
          <input
            id="mobile"
            name="mobile"
            type="number"
            required
            onChange={handleChange}
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={handleChange}
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            onChange={handleChange}
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="aadharCardNumber"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter AadharCardNumber
          </label>
          <input
            id="aadharCardNumber"
            name="aadharCardNumber"
            type="number"
            required
            onChange={handleChange}
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={handleChange}
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to={"/dashboard"}>
            <button
              id="submit"
              name="submit"
              type="submit"
              onClick={handleSubmit}
              className="bg-gray-800 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              Submit
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Signup;
