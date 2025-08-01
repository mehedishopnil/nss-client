import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { FaCheckCircle, FaEnvelope, FaEnvelopeOpen, FaPhone, FaUser, FaCalendarAlt, FaFilter } from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import Swal from "sweetalert2";

const Messages = () => {
  const { allUsersMessages,updateUserMessage } = useContext(AuthContext);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleMarkAsRead = async (messageId) => {
  try {
    await updateUserMessage(messageId, { isRead: true });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Marked as read",
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    });
  } catch (error) {
    console.error("Error marking message as read:", error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Failed to mark as read",
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    });
  }
};


  // Filter messages based on active filter and search query
  const filteredMessages = allUsersMessages.filter((msg) => {
    // Apply status filter
    if (activeFilter === 'unread' && msg.isRead) return false;
    if (activeFilter === 'new' && msg.status !== 'new') return false;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        msg.name.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query) ||
        (msg.phone && msg.phone.toLowerCase().includes(query)) ||
        msg.message.toLowerCase().includes(query))
    }
    
    return true;
  });

  // Status counts for filter badges
  const statusCounts = {
    all: allUsersMessages.length,
    new: allUsersMessages.filter(msg => msg.status === 'new').length,
    unread: allUsersMessages.filter(msg => !msg.isRead).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header with Filter Button */}
      <div className="md:hidden bg-white p-4 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Messages</h1>
        <div className="dropdown dropdown-end z-20">
          <label tabIndex={0} className="btn btn-sm btn-ghost">
            <FaFilter className="text-gray-500" />
            <span className="ml-1">Filters</span>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
            <li>
              <button 
                className={activeFilter === 'all' ? 'active' : ''}
                onClick={() => setActiveFilter('all')}
              >
                All Messages <span className="badge badge-sm">{statusCounts.all}</span>
              </button>
            </li>
            <li>
              <button 
                className={activeFilter === 'unread' ? 'active' : ''}
                onClick={() => setActiveFilter('unread')}
              >
                Unread <span className="badge badge-sm">{statusCounts.unread}</span>
              </button>
            </li>
            <li>
              <button 
                className={activeFilter === 'new' ? 'active' : ''}
                onClick={() => setActiveFilter('new')}
              >
                New <span className="badge badge-sm">{statusCounts.new}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Desktop */}
        <div className="w-48 p-4 bg-white border-r border-gray-200 hidden md:block">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <FaFilter className="mr-2" /> Filters
          </h2>
          
          <div className="space-y-2">
            <button 
              className={`flex items-center justify-between w-full p-2 rounded-lg ${activeFilter === 'all' ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveFilter('all')}
            >
              <span>All Messages</span>
              <span className="bg-blue-100 px-2 py-1 rounded-full text-xs">{statusCounts.all}</span>
            </button>
            
            <button 
              className={`flex items-center justify-between w-full p-2 rounded-lg ${activeFilter === 'unread' ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveFilter('unread')}
            >
              <span>Unread</span>
              <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">{statusCounts.unread}</span>
            </button>
            
            <button 
              className={`flex items-center justify-between w-full p-2 rounded-lg ${activeFilter === 'new' ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveFilter('new')}
            >
              <span>New</span>
              <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">{statusCounts.new}</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800 hidden md:block">Messages</h1>
              <p className="text-gray-500 hidden md:block">Manage all user inquiries and feedback</p>
            </div>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search messages..."
                className="input input-bordered pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

          {filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <FaEnvelopeOpen className="text-5xl text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No messages found</p>
              <p className="text-gray-400">Try changing your filters or search</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMessages.map((msg) => (
                <div
                  key={msg._id}
                  className={`bg-white rounded-lg shadow-sm p-4 ${msg.isRead ? '' : 'border-l-4 border-blue-500'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <FaUser className="text-gray-400 mr-2" />
                        <h3 className="font-medium text-gray-800">{msg.name}</h3>
                        {!msg.isRead && (
                          <span className="ml-2 badge badge-primary badge-xs">New</span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-3 gap-y-1">
                        <div className="flex items-center">
                          <FaEnvelope className="mr-1" />
                          <span>{msg.email}</span>
                        </div>
                        {msg.phone && (
                          <div className="flex items-center">
                            <FaPhone className="mr-1" />
                            <span>{msg.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      <span className={`badge badge-sm ${
                        msg.status === 'new' ? 'badge-info' :
                        msg.status === 'in-progress' ? 'badge-warning' :
                        'badge-success'
                      }`}>
                        {msg.status}
                      </span>
                      
                      {!msg.isRead ? (
                        <button
                          onClick={() => handleMarkAsRead(msg._id)}
                          className="btn btn-xs btn-outline btn-primary"
                        >
                          Mark as read
                        </button>
                      ) : (
                        <span className="text-green-500 text-sm flex items-center">
                          <FaCheckCircle className="mr-1" /> Read
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-gray-700 text-sm sm:text-base">{msg.message}</p>
                  </div>

                  <div className="mt-3 flex flex-col sm:flex-row sm:justify-between text-xs text-gray-400 gap-1">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <HiStatusOnline className="mr-1" />
                      <span>Updated: {new Date(msg.updatedAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;