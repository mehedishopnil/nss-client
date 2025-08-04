import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from "../../providers/AuthProviders";
import { FiMenu, FiX } from 'react-icons/fi';
import { MdOutlineSecurity } from 'react-icons/md';
import { IoMdPersonAdd } from 'react-icons/io';

const AdminMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const menuItems = [
    { path: "/admin-panel/admin-overview", name: "Overview", icon: "📊" },
        { path: "/admin-panel/messages", name: "User Message", icon: "🗨️" },
        { path: "/admin-panel/guards", name: "Guards", icon:<MdOutlineSecurity />},
        { path: "/admin-panel/guard-input-form", name: "Add Guard", icon: <IoMdPersonAdd />},
        { path: "/admin-panel/user-control", name: "User Control", icon: "👥" },
        { path: "/admin-panel/admin-control", name: "Admin Control", icon: "🔒" },
        { path: "/admin-panel/profile", name: "Profile", icon: "👤" },
        { path: "/", name: "Home", icon: "🏠" },
  ];

  return (
    <>
      {/* Menu toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="Open menu"
      >
        <FiMenu className="h-6 w-6" />
      </button>

      {/* Slide-out menu */}
      <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black ${isOpen ? 'opacity-50' : 'opacity-0'} transition-opacity duration-300`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu panel */}
        <div className="absolute top-0 right-0 w-4/5 h-full bg-white shadow-xl">
          {/* Menu header with close button */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
          
          {/* Menu items */}
          <nav className="overflow-y-auto h-[calc(100%-120px)]">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-6 py-4 border-b border-gray-100 ${
                  location.pathname === item.path 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* User profile footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t">
            <div className="flex items-center">
              <img 
                src={user?.photoURL || "https://i.pravatar.cc/150?img=3"} 
                alt="User" 
                className="h-10 w-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-gray-800">
                  {user?.displayName || "Admin User"}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.email || "admin@example.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMobileMenu;