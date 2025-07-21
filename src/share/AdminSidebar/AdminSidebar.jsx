import React from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaHome, FaWpforms } from 'react-icons/fa';
import { MdLibraryBooks, MdViewQuilt } from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div>
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
            
        </div>
    );
};

export default AdminSidebar;