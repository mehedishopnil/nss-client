import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { BsFillMenuButtonWideFill, BsBellFill } from "react-icons/bs";
import { FaHome, FaWpforms } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdLibraryBooks, MdViewQuilt } from "react-icons/md";
import { HiOutlineLogout, HiOutlineUserCircle } from "react-icons/hi";

const AdminPanel = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleMenuItemClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };

  return (
    <div className="lg:flex h-screen bg-gray-50">
      {/* Sidebar for LG screens */}
      <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0 bg-gray-800 h-screen flex-col">
        <div className="p-4 flex items-center justify-center border-b border-gray-700">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              RCI
            </div>
            <span className="text-white font-bold text-xl">AdminPanel</span>
          </Link>
        </div>
        
        <ul className="menu p-4 text-gray-300 flex-1">
          <li className="mb-2">
            <Link 
              to="admin-panel/admin-overview" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <MdViewQuilt className="text-lg mr-3" /> 
              <span>Admin Overview</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="admin-panel/users-bookings" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <MdLibraryBooks className="text-lg mr-3" /> 
              <span>Users Bookings</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="admin-panel/user-control" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <AiOutlineUsergroupAdd className="text-lg mr-3" /> 
              <span>User Control</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="admin-panel/resort-input-form" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaWpforms className="text-lg mr-3" /> 
              <span>Resort Input Form</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="admin-panel/admin-control" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RiAdminLine className="text-lg mr-3" /> 
              <span>Admin Control</span>
            </Link>
          </li>
        </ul>

        <div className="p-4 border-t border-gray-700">
          <Link 
            to="/" 
            className="flex items-center p-3 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaHome className="text-lg mr-3" /> 
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-600 focus:outline-none"
            >
              <BsFillMenuButtonWideFill className="text-xl" />
            </button>

            {/* Search bar - can be added here if needed */}

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-600 hover:text-gray-900">
                <BsBellFill className="text-xl" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <HiOutlineUserCircle className="text-xl" />
                  </div>
                  <span className="hidden md:inline text-gray-700">Admin</span>
                </button>

                {/* Profile dropdown menu */}
                <Transition
                  show={profileDropdownOpen}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >
                  <div className="py-1">
                    <Link
                      to="/admin-panel/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/admin-panel/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <HiOutlineLogout className="mr-2" /> Sign out
                    </button>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        <Transition
          show={mobileMenuOpen}
          enter="transition-transform duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="lg:hidden fixed inset-0 z-40"
        >
          <div className="bg-gray-800 text-white h-full w-64 p-4">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  RCI
                </div>
                <span className="text-white font-bold text-xl">AdminPanel</span>
              </Link>
              <button 
                onClick={toggleMobileMenu} 
                className="text-2xl text-gray-300"
              >
                <IoMdClose />
              </button>
            </div>

            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleMenuItemClick("/admin-panel/admin-overview")}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <MdViewQuilt className="text-lg mr-3" /> Admin Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleMenuItemClick("/admin-panel/users-bookings")}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <MdLibraryBooks className="text-lg mr-3" /> Users Bookings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleMenuItemClick("/admin-panel/user-control")}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <AiOutlineUsergroupAdd className="text-lg mr-3" /> User Control
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleMenuItemClick("/admin-panel/resort-input-form")}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FaWpforms className="text-lg mr-3" /> Resort Input Form
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleMenuItemClick("/admin-panel/admin-control")}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <RiAdminLine className="text-lg mr-3" /> Admin Control
                </button>
              </li>
            </ul>

            <div className="mt-8 pt-4 border-t border-gray-700">
              <button 
                onClick={() => handleMenuItemClick("/")}
                className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaHome className="text-lg mr-3" /> Back to Home
              </button>
            </div>
          </div>
        </Transition>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;