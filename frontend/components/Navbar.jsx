import React from "react";

const hoverHandle = () => {
  const buttons = document.getElementsByTagName("a");
  buttons[1].style.border;
};

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 text-white flex justify-between items-center px-4 h-14">
        <div className="logo fontbold">DecisionDesk</div>
        <ul>
          <li className="flex gap-4 ">
            <a
              className="hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white rounded-md p-2 text-gray-400"
              href="/"
            >
              Home
            </a>
            <a
              className="hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white rounded-md p-2 text-gray-400"
              href="#"
            >
              About
            </a>
            <a
              className="hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white rounded-md p-2 text-gray-400"
              href="#"
            >
              Login
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;