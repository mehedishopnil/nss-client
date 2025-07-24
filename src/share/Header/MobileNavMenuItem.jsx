import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiHome, 
  FiSettings, 
  FiUser, 
  FiShield, 
  FiBriefcase, 
  FiInfo, 
  FiMail, 
  FiPhone,
  FiLogIn
} from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';


const MobileNavMenuItem = ({ closeMenu }) => {
  const location = useLocation();
  const { role } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { 
      path: "/", 
      name: "Home", 
      icon: <FiHome className="text-lg" />,
      show: true
    },
    { 
      path: "/admin-panel", 
      name: "Admin Panel", 
      icon: <FiSettings className="text-lg" />,
      show: role === "admin"
    },
    { 
      path: "/admin-panel/profile", 
      name: "Profile", 
      icon: <FiUser className="text-lg" />,
      show: role === "admin"
    },
    { 
      path: "/services", 
      name: "Our Services", 
      icon: <FiBriefcase className="text-lg" />,
      show: role !== "admin"
    },
    { 
      path: "/about-us", 
      name: "About Us", 
      icon: <FiInfo className="text-lg" />,
      show: role !== "admin"
    },
    { 
      path: "/contact", 
      name: "Contact Us", 
      icon: <FiMail className="text-lg" />,
      show: role !== "admin"
    },
    { 
      path: "/log-in", 
      name: "Login", 
      icon: <FiLogIn className="text-lg" />,
      show: role !== "admin"
    }
  ];

  const contactItems = [
    {
      type: "phone",
      value: "01848107019",
      icon: <FiPhone className="text-lg" />
    },
    {
      type: "email",
      value: "nssbd24@gmail.com",
      icon: <FiMail className="text-lg" />
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Menu Items */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {menuItems.map((item) => 
          item.show && (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className={`mr-3 ${isActive(item.path) ? 'text-orange-500' : 'text-gray-500'}`}>
                {item.icon}
              </span>
              <span>{item.name}</span>
              {isActive(item.path) && (
                <span className="ml-auto w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              )}
            </Link>
          )
        )}
      </nav>

      {/* Contact Section */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex justify-center space-x-6">
          {contactItems.map((contact) => (
            <a
              key={contact.type}
              href={`${contact.type === 'phone' ? 'tel:' : 'mailto:'}${contact.value}`}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors"
              onClick={closeMenu}
            >
              {contact.icon}
            </a>
          ))}
        </div>
        <div className="mt-3 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} National Security Service
        </div>
      </div>
    </div>
  );
};

export default MobileNavMenuItem;