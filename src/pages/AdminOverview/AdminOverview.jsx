import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import {
  FiUserCheck,
  FiRefreshCw,
  FiSearch,
  FiUser,
  FiMail,
  FiShield,
  FiCalendar,
  FiActivity,
} from "react-icons/fi";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import GuardSearchEngine from "../../components/GuardSearchEngine/GuardSearchEngine";

const AdminOverview = () => {
  const {
    user,
    allUsers,
    fetchAllUsers,
    loading,
    allGuards,
    allUsersMessages,
  } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter users based on search term
  const filteredUsers =
    allUsers?.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchAllUsers();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading && !allUsers && !allGuards) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  // New messages logic (replace previous status-based logic)
  const unreadMessages = useMemo(
    () =>
      Array.isArray(allUsersMessages)
        ? allUsersMessages.filter((msg) => !msg.isRead)
        : [],
    [allUsersMessages]
  );
  const previewUnread = unreadMessages.slice(0, 3);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user?.name || "Admin"}</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
          disabled={isRefreshing}
        >
          <FiRefreshCw
            className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {/* Search Section */}
      <div className="w-full my-5">
    <GuardSearchEngine />
      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Link
          to="/admin-panel/guards"
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiUserCheck className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Guards</p>
              <p className="text-2xl font-semibold text-gray-900">
                {allGuards?.length || 0}
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin-panel/user-control"
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiUser className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {allUsers?.length || 0}
              </p>
            </div>
          </div>
        </Link>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FiActivity className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Today</p>
              <p className="text-2xl font-semibold text-gray-900">
                {allUsers?.filter((u) => {
                  const today = new Date();
                  const userDate = new Date(u.createdAt);
                  return userDate.toDateString() === today.toDateString();
                }).length || 0}
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/admin-panel/admin-control"
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FiShield className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-semibold text-gray-900">
                {allUsers?.filter((u) => u.isAdmin).length || 0}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            User Management
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
                              <span>{user.name?.charAt(0) || "U"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || "No name"}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {user._id?.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiMail className="mr-2 text-gray-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status || "unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isAdmin
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 text-gray-400" />
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {searchTerm
                      ? "No matching users found"
                      : "No users available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3 p-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="card bg-base-100 shadow-sm border border-gray-100"
              >
                <div className="card-body p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
                          <span>{user.name?.charAt(0) || "U"}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {user.name || "No name"}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          <FiMail className="mr-1" size={14} /> {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`badge badge-sm ${
                          user.isAdmin ? "badge-primary" : "badge-accent"
                        }`}
                      >
                        {user.isAdmin ? "Admin" : "User"}
                      </span>
                      <span
                        className={`badge badge-sm mt-1 ${
                          user.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {user.status || "unknown"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <div className="text-xs text-gray-500 flex items-center">
                      <FiCalendar className="mr-1" size={12} />
                      {formatDate(user.createdAt)}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {user._id?.slice(-6)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "No matching users found" : "No users available"}
            </div>
          )}
        </div>
      </div>

      {/* Unread Messages */}

      {previewUnread.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 my-6 p-5 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-red-50 text-red-600 flex-none">
                <FiMail className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-semibold leading-tight">
                  User Messages
                </h2>
                <p className="text-sm text-gray-500">
                  {unreadMessages.length} unread message
                  {unreadMessages.length !== 1 && "s"}
                </p>
              </div>
            </div>
            <Link
              to="/admin-panel/messages"
              className="mt-1 sm:mt-0 inline-flex items-center text-sm font-medium bg-slate-200 text-blue-600 py-1 px-2 rounded-md  border-blue-300 hover:border "
            >
              See more messages &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {previewUnread.map((msg) => (
              <div
                key={msg._id}
                className="flex flex-col sm:flex-row gap-3 p-4 border rounded-lg hover:shadow-md transition bg-gray-50"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-neutral text-white flex items-center justify-center text-sm font-semibold">
                    {msg.name?.charAt(0) || "U"}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {msg.name || "Unknown User"}
                      </div>
                      <span className="text-xs text-gray-400">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : ""}
                      </span>
                    </div>
                  </div>
                  <p
                    className="mt-1 text-sm text-gray-700"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {msg.message || "(No content)"}
                  </p>
                </div>
                <div className="flex items-start mt-2 sm:mt-0">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                    Unread
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOverview;
