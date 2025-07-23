import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaHome, FaUser, FaWpforms } from "react-icons/fa";
import { MdLibraryBooks, MdViewQuilt } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import logo from "../../assets/image/nss-logo.png";

const AdminSidebar = () => {
  return (
    <div>
      <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0 bg-gray-800 h-screen flex-col">
        <div className="p-4 flex items-center justify-center border-b border-gray-700">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-white font-bold">
              <img src={logo} alt="Logo" />
            </div>
            <span className="text-white font-bold text-xl">AdminPanel</span>
          </NavLink>
        </div>

        <ul className="menu p-4 text-gray-300 flex-1">
          <li className="mb-2">
            <NavLink
              to="/admin-panel/admin-overview"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                  isActive ? "text-blue-400" : ""
                }`
              }
            >
              <MdViewQuilt className="text-lg mr-3" />
              <span>Admin Overview</span>
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink
              to="/admin-panel/user-control"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                  isActive ? "text-blue-400" : ""
                }`
              }
            >
              <AiOutlineUsergroupAdd className="text-lg mr-3" />
              <span>User Control</span>
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink
              to="/admin-panel/admin-control"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                  isActive ? "text-blue-400" : ""
                }`
              }
            >
              <RiAdminLine className="text-lg mr-3" />
              <span>Admin Control</span>
            </NavLink>
          </li>
        </ul>

        <div className="p-4 border-t border-gray-700">
          <NavLink
            to="/admin-panel/profile"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                isActive ? "text-blue-400" : "text-gray-300"
              }`
            }
          >
            <FaUser className="text-lg mr-3" />
            <span>Profile</span>
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                isActive ? "text-blue-400" : "text-gray-300"
              }`
            }
          >
            <FaHome className="text-lg mr-3" />
            <span>Back to Home</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
