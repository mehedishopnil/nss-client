import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import logo from "../../assets/image/nss-logo.png"
import { Link } from 'react-router-dom';
import { IoIosCall } from 'react-icons/io';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-base-100 shadow-md">
      {/* Sub header */}
      <div className='flex justify-between items-center bg-orange-500 py-1 px-5'>
        <h1 className='flex items-center font-semibold text-lg gap-2 text-white tracking-wider'><IoIosCall /> 01848107019</h1>

        {/* Socialmedia link */}
        <div className='flex justify-center gap-2 text-white'>
        <Link>
        <FaFacebook  className='text-lg'/>
        </Link>

        <Link>
        <FaYoutube className='text-lg'/>
        </Link>

        </div>
      </div>


      {/* Header */}
      <div className="container mx-auto flex justify-between items-center py-4 px-6 tracking-wide">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="" className='w-20'/>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          <a href="#services" className="text-lg font-semibold text-base-content hover:text-primary">
            Our Services
          </a>
          <a href="#about" className="text-lg font-semibold text-base-content hover:text-primary">
            About Us
          </a>
          <a href="#contact" className="text-lg font-semibold text-base-content hover:text-primary">
            Contact Us
          </a>
        </nav>

        {/* Button */}
        <Link>
        <div className="hidden lg:block bg-orange-500  py-2 px-3 rounded">
          <button className="btn btn-primary text-white">Get Started</button>
        </div>
        </Link>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-3xl text-base-content">
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="lg:hidden bg-base-200 shadow-md">
          <div className="flex flex-col space-y-4 py-4 px-6">
            <a href="#services" className="text-lg font-semibold text-base-content hover:text-primary">
              Our Services
            </a>
            <a href="#about" className="text-lg font-semibold text-base-content hover:text-primary">
              About Us
            </a>
            <a href="#contact" className="text-lg font-semibold text-base-content hover:text-primary">
              Contact Us
            </a>
            <button className="btn btn-primary mt-4">Get Started</button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
