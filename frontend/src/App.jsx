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
          <Signup />
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

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
