import { useContext, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { BsFillMenuButtonWideFill, BsBellFill } from "react-icons/bs";
import { HiOutlineLogout, HiOutlineUserCircle } from "react-icons/hi";
import AdminSidebar from "../../share/AdminSidebar/AdminSidebar";
import AdminMobileMenu from "../../share/AdminMobileMenu/AdminMobileMenu";
import { AuthContext } from "../../providers/AuthProviders";

const AdminPanel = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext); // ✅ Get logOut from context

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut(); // ✅ Sign out user
      navigate("/log-in");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="lg:flex h-screen bg-gray-50">
      {/* Sidebar for large screens */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-600 focus:outline-none"
            >
              <BsFillMenuButtonWideFill className="text-xl" />
            </button>

            {/* Right icons */}
            <div className="flex items-center space-x-4">
              <button
                className="relative text-gray-600 hover:text-gray-900 focus:outline-none"
                aria-label="Notifications"
              >
                <BsBellFill className="text-xl" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
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

                {/* Dropdown Panel */}
                <Transition
                  as="div"
                  show={mobileMenuOpen}
                  enter="transition-transform duration-300"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition-transform duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <div className="lg:hidden fixed inset-0 z-40">
                    <div className="absolute w-64 h-full z-50">
                      <AdminMobileMenu />
                    </div>
                    <div
                      onClick={() => setMobileMenuOpen(false)}
                      className="absolute inset-0 bg-black bg-opacity-25"
                    />
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Menu */}
        {mobileMenuOpen && (
  <div className="lg:hidden fixed inset-0 z-40">
    <div className="absolute w-64 h-full z-50 bg-white shadow-md">
      <AdminMobileMenu />
    </div>
    <div
      onClick={() => setMobileMenuOpen(false)}
      className="absolute inset-0 bg-black bg-opacity-25"
    />
  </div>
)}


        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
