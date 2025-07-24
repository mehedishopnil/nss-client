import { Outlet } from "react-router-dom";
import AdminSidebar from "../../share/AdminSidebar/AdminSidebar";


const AdminPanel = () => {

  return (
    <div className="lg:flex h-screen bg-gray-50">
      {/* Sidebar for large screens */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
