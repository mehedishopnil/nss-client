import React, { useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaHome, FaWpforms } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdLibraryBooks, MdViewQuilt } from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';
import { Link, Navigate } from 'react-router-dom';

const AdminMobileMenu = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMenuItemClick = (path) => {
    setMobileMenuOpen(false);
    Navigate(path);
  };

   const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };


    return (
        <div>
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
        </div>
    );
};

export default AdminMobileMenu;