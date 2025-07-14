import React, { useState } from "react";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";
import { IoIosCall } from "react-icons/io";
import { FaFacebook, FaYoutube, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "../../assets/image/nss-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate auth state
  const location = useLocation();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleAuth = () => {
    setIsLoggedIn(!isLoggedIn); // For demo purposes
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
        {/* Logo - Always on left */}
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
          {/* Contact Info - Only icons */}
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
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <FaUserCircle className="text-2xl text-orange-500" />
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={toggleAuth} className="text-error">
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </li>
              </ul>
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
          {/* Contact Icons */}
          <div className="flex gap-2">
            <a href="tel:01848107019" className="text-gray-700">
              <IoIosCall className="text-xl" />
            </a>
            <a href="mailto:nssbd24@gmail.com" className="text-gray-700">
              <MdEmail className="text-xl" />
            </a>
          </div>

          {/* Auth Icon */}
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <FaUserCircle className="text-xl text-orange-500" />
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={toggleAuth} className="text-error">
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
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

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="lg:hidden bg-base-200 shadow-md">
          <div className="flex flex-col space-y-4 py-4 px-6">
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

            {!isLoggedIn && (
              <div className="flex flex-col gap-3 mt-4 px-4 sm:px-6">
                <Link to="/login" onClick={closeMenu}>
                  <button className="w-full py-2 px-4 text-center text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-100 transition-all">
                    Login
                  </button>
                </Link>
                <Link to="/signup" onClick={closeMenu}>
                  <button className="w-full py-2 px-4 text-center text-sm font-medium text-white bg-orange-500 rounded-xl shadow-sm hover:bg-orange-600 transition-all">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
