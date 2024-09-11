import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-base-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-primary">
            Logo
          </a>
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
        <div className="hidden lg:block">
          <button className="btn btn-primary">Get Started</button>
        </div>

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
