import { Link, Outlet } from "react-router-dom";
import AdminSidebar from "../../share/AdminSidebar/AdminSidebar";
import AdminMobileMenu from "../../share/AdminMobileMenu/AdminMobileMenu";
import logo from '../../assets/image/nss-logo.png';
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="md:flex h-screen bg-gray-50 relative">
      {/* Sidebar for large screens */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header - appears only on mobile */}
        <header className="md:hidden sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo on left */}
            <Link to='/' className="flex items-center">
              <img 
               src= {logo}
                alt="Logo"
                className="h-8 w-auto"
              />
            </Link>
            
            {/* Right side with user and menu icon */}
            <div className="flex items-center space-x-4">
              {/* User avatar */}
              <div className="relative">
                <img
                  src= {user?.photoURL || "https://i.pravatar.cc/150?img=3"}
                  className="h-8 w-8 rounded-full object-cover" 
                  alt="User"
                  
                />
                {/* Online status indicator */}
                <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>
              </div>
              
              {/* Mobile menu button - will trigger the sliding menu */}
              <AdminMobileMenu />
            </div>
          </div>
        </header>
        
        {/* Content area */}
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;