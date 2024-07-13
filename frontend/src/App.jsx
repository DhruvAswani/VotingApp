import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AddCandidates from "../components/AddCandidates";
import Adminpanel from "../components/Adminpanel";
import Modal from "../components/AddConstituency";
import ListConstituency from "../components/ListConstituency";
import ConstituencyDetails from "../components/ConstituencyDetails";
import { useState } from "react";
import { MyContext } from "../src/MyContext";
import VotingPanel from "../components/VotingPanel";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Login />
          <AddCandidates />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <Signup />
        </>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <>
          <Navbar />
          <VotingPanel />
        </>
      ),
    },
    {
      path: "/adminpanel",
      element: (
        <>
          <Navbar />
          <ConstituencyDetails />
        </>
      ),
    },
    {
      path: "/constituencylist",
      element: (
        <>
          <Navbar />
          <Modal />
        </>
      ),
    },
  ]);

  const [text, setText] = useState("");

  return (
    <>
      <MyContext.Provider value={{ text, setText }}>
        <RouterProvider router={router} />
      </MyContext.Provider>
    </>
  );
}

export default App;
