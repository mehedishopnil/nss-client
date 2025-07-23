import React from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdViewQuilt } from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/nss-logo.png';

const AdminMobileMenu = ({ setMobileMenuOpen }) => {



  return (
    <div className="bg-gray-800 text-white w-64 p-4 h-full">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <img src={logo} alt="logo" />
          </div>
          <span className="text-white font-bold text-xl">AdminPanel</span>
        </Link>
        <button onClick={() => setMobileMenuOpen(false)} className="text-2xl text-gray-300">
          <IoMdClose />
        </button>
      </div>

      <ul className="space-y-2">
        <li>
          <Link
            to="/admin-panel/admin-overview"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <MdViewQuilt className="text-lg mr-3" /> Admin Overview
          </Link>
        </li>
        <li>
          <Link
            to="/admin-panel/user-control"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <AiOutlineUsergroupAdd className="text-lg mr-3" /> User Control
          </Link>
        </li>
        <li>
          <Link
            to="/admin-panel/admin-control"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RiAdminLine className="text-lg mr-3" /> Admin Control
          </Link>
        </li>
      </ul>

      <div className="mt-8 pt-4 border-t border-gray-700">
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FaHome className="text-lg mr-3" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AdminMobileMenu;
