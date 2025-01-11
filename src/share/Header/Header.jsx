import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/image/nss-logo.png";
import { Link } from "react-router-dom";
import { IoIosCall } from "react-icons/io";
import { FaFacebook, FaYoutube } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-base-100 shadow-md">
      {/* Sub-header */}
      <div className="flex justify-between items-center bg-orange-500 py-1 px-5">
        <h1 className="flex items-center font-semibold text-sm md:text-lg gap-2 text-white tracking-wider">
          <IoIosCall /> 01848107019
        </h1>

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
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo and Title */}
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          <a
            href="#services"
            className="text-sm md:text-lg font-semibold text-base-content hover:text-primary"
          >
            Our Services
          </a>
          <a
            href="#about"
            className="text-sm md:text-lg font-semibold text-base-content hover:text-primary"
          >
            About Us
          </a>
          <a
            href="#contact"
            className="text-sm md:text-lg font-semibold text-base-content hover:text-primary"
          >
            Contact Us
          </a>
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
            <a
              href="#services"
              className="text-sm md:text-lg font-semibold text-base-content hover:text-primary"
            >
              Our Services
            </a>
            <a
              href="#about"
              className="text-sm md:text-lg font-semibold text-base-content hover:text-primary"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="text-sm md:text-lg font-semibold text-base-content hover:text-primary"
            >
              Contact Us
            </a>
            <Link to="#">
              <button className="btn btn-primary mt-4">Get Started</button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
