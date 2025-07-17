import React, { useContext, useState } from "react";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";
import { IoIosCall } from "react-icons/io";
import { FaFacebook, FaYoutube, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "../../assets/image/nss-logo.png";
import { AuthContext } from "../../providers/AuthProviders";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-orange-500 font-bold border-b-2 border-primary"
      : "text-base-content font-semibold hover:text-primary";

  return (
    <header className="bg-white shadow-md lg:sticky top-0 z-50">
      {/* Sub-header - Only for desktop */}
      <div className="hidden lg:flex justify-between items-center bg-orange-500 py-1 px-5">
        <div className="flex gap-10 px-14">
          <h1 className="flex items-center font-semibold text-lg gap-1 text-white tracking-wider">
            <IoIosCall /> 01848107019
          </h1>
          <h1 className="flex items-center font-semibold text-lg gap-1 text-white tracking-wider">
            <MdEmail /> nssbd24@gmail.com
          </h1>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-3 text-white">
          <Link to="#">
            <FaFacebook className="text-lg" />
          </Link>
          <Link to="#">
            <FaYoutube className="text-lg" />
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex justify-between items-center py-4 px-2 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 md:w-16" />
          <div className="ml-2 md:ml-4">
            <h1 className="font-bold text-sm md:text-lg uppercase leading-tight">
              National Security Service
            </h1>
            <h2 className="hidden md:block font-semibold text-xs md:text-md uppercase">
              Supply & Support
            </h2>
          </div>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-8">
            <Link to="/" className={`${isActive("/")}`}>
              Home
            </Link>
            <Link to="/services" className={`${isActive("/services")}`}>
              Our Services
            </Link>
            <Link to="/about-us" className={`${isActive("/about-us")}`}>
              About Us
            </Link>
            <Link to="/contact" className={`${isActive("/contact")}`}>
              Contact Us
            </Link>
          </div>
        </nav>

        {/* Desktop Right Section - Auth/Contact */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Contact Info */}
          <div className="flex gap-2">
            <a
              href="tel:01848107019"
              className="text-gray-700 hover:text-orange-500"
            >
              <IoIosCall className="text-xl" />
            </a>
            <a
              href="mailto:nssbd24@gmail.com"
              className="text-gray-700 hover:text-orange-500"
            >
              <MdEmail className="text-xl" />
            </a>
          </div>

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-3 bg-white px-3 py-2 ">
              {/* Profile Image */}
              <Link
                to="/profile"
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-300"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-orange-100">
                    <FaUserCircle className="text-2xl text-orange-500" />
                  </div>
                )}
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500 transition duration-200"
              >
                <FiLogOut className="text-lg" />
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-4 items-center">
              <Link to="/log-in">
                <button className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 bg-white rounded-full hover:bg-gray-100 transition-all shadow-sm">
                  Login
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="px-5 py-2 text-sm font-medium text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all shadow-sm">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Right Section - Contact/Auth/Hamburger */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Auth Icon */}
          {user ? (
            <div className="flex items-center gap-3 bg-white px-3 py-2 ">
              {/* Profile Image */}
              <Link
                to="/profile"
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-300"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-orange-100">
                    <FaUserCircle className="text-2xl text-orange-500" />
                  </div>
                )}
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500 transition duration-200"
              >
                <FiLogOut className="text-lg" />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/log-in">
              <FiUser className="text-xl" />
            </Link>
          )}

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-base-content"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Sliding Mobile Menu from Right */}
      <div
        className={`fixed top-0 right-0 h-72 w-72 bg-base-100 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={closeMenu}
            className="text-2xl text-gray-600 hover:text-orange-500"
          >
            &times;
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col space-y-4 px-6">
          <Link to="/" className={`${isActive("/")}`} onClick={closeMenu}>
            Home
          </Link>
          <Link
            to="/services"
            className={`${isActive("/services")}`}
            onClick={closeMenu}
          >
            Our Services
          </Link>
          <Link
            to="/about-us"
            className={`${isActive("/about-us")}`}
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`${isActive("/contact")}`}
            onClick={closeMenu}
          >
            Contact Us
          </Link>

          {!user && (
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/log-in" onClick={closeMenu}>
                <button className="w-full py-2 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all">
                  Login
                </button>
              </Link>
              <Link to="/sign-up" onClick={closeMenu}>
                <button className="w-full py-2 px-4 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <a href="tel:01848107019" className="text-gray-700">
              <IoIosCall className="text-xl" />
            </a>
            <a href="mailto:nssbd24@gmail.com" className="text-gray-700">
              <MdEmail className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
