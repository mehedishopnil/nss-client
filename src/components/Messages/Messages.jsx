import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { FaCheckCircle, FaEnvelope, FaEnvelopeOpen, FaPhone, FaUser, FaCalendarAlt, FaFilter } from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import Swal from "sweetalert2";

const Messages = () => {
  const { allUsersMessages, setAllUsersMessages } = useContext(AuthContext);

  const handleMarkAsRead = async (messageId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/messages/${messageId}/mark-read`,
        { method: "PATCH" }
      );

      if (!response.ok) throw new Error("Failed to mark as read");

      // Update local state
      setAllUsersMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, isRead: true } : msg
        )
      );

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Marked as read',
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
    } catch (error) {
      console.error("Error marking message as read:", error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Failed to mark as read',
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
    }
  };

  // Group messages by status for the sidebar
  const statusCounts = {
    all: allUsersMessages.length,
    new: allUsersMessages.filter(msg => msg.status === 'new').length,
    inProgress: allUsersMessages.filter(msg => msg.status === 'in-progress').length,
    resolved: allUsersMessages.filter(msg => msg.status === 'resolved').length,
    unread: allUsersMessages.filter(msg => !msg.isRead).length,
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-white border-r border-gray-200 hidden md:block">
        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
          <FaFilter className="mr-2" /> Filters
        </h2>
        
        <div className="space-y-2">
          <button className="flex items-center justify-between w-full p-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
            <span>All Messages</span>
            <span className="bg-blue-100 px-2 py-1 rounded-full text-xs">{statusCounts.all}</span>
          </button>
          
          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <span>Unread</span>
            <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">{statusCounts.unread}</span>
          </button>
          
          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <span>New</span>
            <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">{statusCounts.new}</span>
          </button>
          
          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <span>In Progress</span>
            <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">{statusCounts.inProgress}</span>
          </button>
          
          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <span>Resolved</span>
            <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">{statusCounts.resolved}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
            <p className="text-gray-500">Manage all user inquiries and feedback</p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="input input-bordered pl-10 w-full md:w-64"
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {allUsersMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <FaEnvelopeOpen className="text-5xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No messages found</p>
            <p className="text-gray-400">All user messages will appear here</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {allUsersMessages.map((msg) => (
              <div
                key={msg._id}
                className={`card shadow-sm transition-all duration-200 hover:shadow-md ${
                  msg.isRead ? "bg-white" : "bg-blue-50 border-l-4 border-blue-500"
                }`}
              >
                <div className="card-body p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="card-title text-lg flex items-center">
                        <FaUser className="mr-2 text-gray-500" />
                        {msg.name}
                        {!msg.isRead && (
                          <span className="ml-2 badge badge-primary badge-xs">New</span>
                        )}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FaEnvelope className="mr-1" />
                        <span className="mr-3">{msg.email}</span>
                        {msg.phone && (
                          <>
                            <FaPhone className="mr-1" />
                            <span>{msg.phone}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`badge ${
                        msg.status === 'new' ? 'badge-info' :
                        msg.status === 'in-progress' ? 'badge-warning' :
                        'badge-success'
                      }`}>
                        {msg.status}
                      </span>
                      {!msg.isRead ? (
                        <button
                          onClick={() => handleMarkAsRead(msg._id)}
                          className="btn btn-sm btn-ghost text-blue-600 hover:text-blue-700"
                        >
                          Mark as read
                        </button>
                      ) : (
                        <span className="text-green-500 flex items-center text-sm">
                          <FaCheckCircle className="mr-1" /> Read
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-gray-700">{msg.message}</p>
                  </div>

                  <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      <span>{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <HiStatusOnline className="mr-1" />
                      <span>Last updated: {new Date(msg.updatedAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;