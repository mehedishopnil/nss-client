import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";
import { IoIosCall } from "react-icons/io";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "../../assets/image/nss-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const closeMenu = () => {
    setIsOpen(false); // Function to close the menu
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-orange-500   font-bold border-b-2 border-primary"
      : "text-base-content font-semibold hover:text-primary";

  return (
    <header className="bg-base-100 shadow-md">
      {/* Sub-header */}
      <div className="flex justify-between items-center bg-orange-500 py-1 px-5">
        <div className="flex gap-2 md:gap-10 md:px-14">
          <h1 className="flex items-center font-semibold text-xs md:text-lg gap-1 text-white tracking-wider">
            <IoIosCall /> 01848107019
          </h1>
          <h1 className="flex items-center font-semibold text-xs md:text-lg gap-1 text-white tracking-wider">
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
        {/* Logo and Title */}
        <Link to="/">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="w-16 md:w-20" />
            <div>
              <h1 className="font-bold text-sm md:text-xl uppercase leading-tight">
                National Security Service
              </h1>
              <h2 className="font-semibold text-xs md:text-lg uppercase">
                Supply & Support
              </h2>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          <Link to="/services" className={`${isActive("/services")}`}>
            Our Services
          </Link>
          <Link to="/about-us" className={`${isActive("/about-us")}`}>
            About Us
          </Link>
          <Link to="/contact" className={`${isActive("/contact")}`}>
            Contact Us
          </Link>
        </nav>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <Link to="#">
            <button className="btn bg-orange-500 text-white py-2 px-4 rounded">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl text-base-content"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="lg:hidden bg-base-200 shadow-md">
          <div className="flex flex-col space-y-4 py-4 px-6">
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
            <Link to="#" onClick={closeMenu}>
              <button className="btn btn-primary mt-4">Get Started</button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
