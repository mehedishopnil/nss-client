import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { BsFillMenuButtonWideFill, BsBellFill } from "react-icons/bs";
import { HiOutlineLogout, HiOutlineUserCircle } from "react-icons/hi";
import AdminSidebar from "../../share/AdminSidebar/AdminSidebar";
import AdminMobileMenu from "../../share/AdminMobileMenu/AdminMobileMenu";
import Logo from "../../assets/image/nss-logo.png";

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

  

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };

  return (
    <div className="lg:flex h-screen bg-gray-50">
      {/* Sidebar for LG screens */}
      
      <AdminSidebar />

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
          <AdminMobileMenu 
          
          />
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