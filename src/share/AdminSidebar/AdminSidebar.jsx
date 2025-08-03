import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/image/nss-logo.png";
import { AuthContext } from "../../providers/AuthProviders";
import { MdOutlineSecurity } from "react-icons/md";


const AdminSidebar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const { user } = useContext(AuthContext);


  const menuItems = [
    { path: "/admin-panel/admin-overview", name: "Overview", icon: "📊" },
    { path: "/admin-panel/messages", name: "User Message", icon: "🗨️" },
    { path: "/admin-panel/guards", name: "Guards", icon:<MdOutlineSecurity />},
    { path: "/admin-panel/user-control", name: "User Control", icon: "👥" },
    { path: "/admin-panel/admin-control", name: "Admin Control", icon: "🔒" },
    { path: "/admin-panel/profile", name: "Profile", icon: "👤" },
    { path: "/", name: "Home", icon: "🏠" },
  ];

  return (
    <div className=" b w-72 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 shadow-xl flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-700 flex items-center space-x-3">
        <div className="avatar">
          <div className="w-10 rounded-full bg-gradient-to-r from-purple-300 to-gray-200 flex items-center justify-center text-white">
            <img src={logo} alt="logo" className="w-8 h-8 rounded-full" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Admin Panel
          </h1>
          <p className="text-xs text-gray-400">Dashboard v2.1</p>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="menu p-4 flex-1 space-y-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`group flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${
                activeMenu === item.path
                  ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-l-4 border-purple-400 shadow-lg"
                  : "hover:bg-gray-700/50 hover:pl-6"
              }`}
              onClick={() => setActiveMenu(item.path)}
            >
              <span
                className={`text-xl mr-3 transition-all duration-300 ${
                  activeMenu === item.path
                    ? "text-purple-300 scale-110"
                    : "text-gray-400 group-hover:text-white group-hover:scale-110"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`font-medium ${
                  activeMenu === item.path
                    ? "text-white"
                    : "text-gray-300 group-hover:text-white"
                }`}
              >
                {item.name}
              </span>
              {activeMenu === item.path && (
                <span className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-800">
              <img
                src={user?.photoURL || "https://i.pravatar.cc/150?img=3"}
                alt="Admin"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.displayName || "Admin User"}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.email || "admin@example.com"}
            </p>
          </div>
          <button className="btn btn-ghost btn-xs text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
