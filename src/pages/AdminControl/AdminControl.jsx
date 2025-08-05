import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import {
  FiShield,
  FiSearch,
  FiRefreshCw,
  FiUserX,
  FiUserCheck,
} from "react-icons/fi";
import Loading from "../../components/Loading";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const AdminControl = () => {
  const { user, allUsers, loading, updateAdminStatus } =
    useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);

  // Filter only admin users based on isAdmin field
  const adminUsers = allUsers?.filter((u) => u.isAdmin === true) || [];
  const filteredAdmins = adminUsers.filter(
    (admin) =>
      admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Assuming you have a fetchAllUsers function in your AuthContext
      // await fetchAllUsers();
      toast.success("Admin list refreshed successfully");
      // Success example:
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User information updated successfully!",
      });
    } catch (error) {
      toast.error("Failed to refresh admin list");
      // Error example:
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to update user",
      });
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const confirmRemoveAdmin = (admin) => {
    setUserToRemove(admin);
  };

  const handleRemoveAdmin = async () => {
    if (!userToRemove) return;

    setIsRemoving(true);
    try {
      // Set isAdmin to false when removing admin privileges
      await updateAdminStatus(userToRemove._id, { isAdmin: false });
      toast.success(`${userToRemove.name} is no longer an admin`);
      setUserToRemove(null);
    } catch (error) {
      toast.error("Failed to remove admin privileges");
      console.error(error);
    } finally {
      setIsRemoving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading && !allUsers) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Admin Management
          </h1>
          <p className="text-gray-600">Manage system administrators</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleRefresh}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm"
            disabled={isRefreshing}
          >
            <FiRefreshCw
              className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search admins by name or email..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats Card */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <FiShield className="h-5 w-5" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Admins</p>
            <p className="text-xl font-semibold text-gray-900">
              {adminUsers.length}
            </p>
          </div>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Administrators
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <tr
                    key={admin._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="avatar placeholder">
                            <div className="bg-purple-100 text-purple-600 rounded-full w-10 h-10">
                              <span>{admin.name?.charAt(0) || "A"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {admin.name || "No name"}
                            {admin._id === user?._id && (
                              <span className="ml-2 text-xs text-purple-600">
                                (You)
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {admin._id?.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {admin.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(admin.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FiUserCheck className="mr-1" /> Active Admin
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {admin._id === user?._id ? (
                        <span className="text-sm text-gray-500">
                          Cannot remove yourself
                        </span>
                      ) : (
                        <button
                          onClick={() => confirmRemoveAdmin(admin)}
                          className="btn btn-sm btn-outline btn-error"
                          disabled={isRemoving}
                        >
                          <FiUserX className="mr-1" /> Remove Admin
                        </button>
                      )}
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
                      ? "No matching admins found"
                      : "No administrators available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3 p-4">
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((admin) => (
              <div
                key={admin._id}
                className="card bg-base-100 shadow-sm border border-gray-100"
              >
                <div className="card-body p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="avatar placeholder">
                        <div className="bg-purple-100 text-purple-600 rounded-full w-10 h-10">
                          <span>{admin.name?.charAt(0) || "A"}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {admin.name || "No name"}
                          {admin._id === user?._id && (
                            <span className="ml-2 text-xs text-purple-600">
                              (You)
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">{admin.email}</p>
                      </div>
                    </div>
                    <span className="badge badge-sm bg-green-100 text-green-800">
                      <FiUserCheck className="mr-1" /> Admin
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Joined: {formatDate(admin.createdAt)}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {admin._id?.slice(-6)}
                    </div>
                  </div>

                  <div className="mt-3">
                    {admin._id === user?._id ? (
                      <div className="text-center text-sm text-gray-500 py-2">
                        Cannot remove yourself
                      </div>
                    ) : (
                      <button
                        onClick={() => confirmRemoveAdmin(admin)}
                        className="btn btn-sm btn-outline btn-error w-full"
                        disabled={isRemoving}
                      >
                        <FiUserX className="mr-1" /> Remove Admin
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchTerm
                ? "No matching admins found"
                : "No administrators available"}
            </div>
          )}
        </div>
      </div>

      {/* Remove Admin Confirmation Modal */}
      {userToRemove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Admin Removal
            </h3>
            <p className="mb-4">
              Are you sure you want to remove admin privileges from{" "}
              <span className="font-medium">{userToRemove.name}</span>? They
              will become a regular user.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setUserToRemove(null)}
                className="btn btn-ghost"
                disabled={isRemoving}
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveAdmin}
                className="btn btn-error"
                disabled={isRemoving}
              >
                {isRemoving ? "Processing..." : "Confirm Removal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminControl;
