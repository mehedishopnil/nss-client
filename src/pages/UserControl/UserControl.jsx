import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProviders";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";

const UserControl = () => {
  const { user, allUsers, updateAdminStatus, deleteUser } =
    useContext(AuthContext);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newIsAdmin, setNewIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRoleUpdate = async (userId) => {
    try {
      await updateAdminStatus(userId, newIsAdmin);
      toast.success("User role updated successfully");
      // Success example:
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User information updated successfully!",
      });
      setEditingUserId(null);
      setNewIsAdmin(false);
    } catch (error) {
      toast.error("Failed to update user role");
      console.error(error);
      // Error example:
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to update user",
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setIsDeleting(true);
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Failed to delete user");
        console.error(error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const filteredUsers = allUsers?.filter((u) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      u.name?.toLowerCase().includes(searchLower) ||
      u.email?.toLowerCase().includes(searchLower) ||
      u.isAdmin?.toString().toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          User Management
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered w-full pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredUsers?.length === 0 ? (
          <div className="text-center py-8">
            <Loading /> ||
            <div className="text-gray-500 text-lg">No users found</div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 btn btn-ghost text-primary"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <table className="hidden sm:table w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th>User</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map((u) => (
                  <tr
                    key={u._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td>
                      <div className="flex items-center space-x-2 sm:space-x-3 py-2 sm:py-4">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-8 h-8 sm:w-10 sm:h-10">
                            <span className="text-xs sm:text-sm">
                              {u.name?.charAt(0) || "U"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-sm sm:text-base">
                            {u.name || "No name"}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {u._id?.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-gray-700 text-sm sm:text-base">
                        {u.email}
                      </div>
                    </td>
                    <td className="text-xs sm:text-sm text-gray-500">
                      {formatDate(u.createdAt)}
                    </td>
                    <td>
                      {editingUserId === u._id ? (
                        <label className="cursor-pointer label p-0">
                          <input
                            type="checkbox"
                            className="toggle toggle-primary toggle-sm sm:toggle-md"
                            checked={newIsAdmin}
                            onChange={(e) => setNewIsAdmin(e.target.checked)}
                          />
                          <span className="ml-2 text-xs sm:text-sm">
                            {newIsAdmin ? "Admin" : "User"}
                          </span>
                        </label>
                      ) : (
                        <span
                          className={`badge badge-sm sm:badge-md ${
                            u.isAdmin ? "badge-primary" : "badge-accent"
                          }`}
                        >
                          {u.isAdmin ? "Admin" : "User"}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex space-x-1 sm:space-x-2">
                        {editingUserId === u._id ? (
                          <>
                            <button
                              onClick={() => handleRoleUpdate(u._id)}
                              className="btn btn-xs sm:btn-sm btn-success"
                              disabled={isDeleting}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingUserId(null);
                                setNewIsAdmin(false);
                              }}
                              className="btn btn-xs sm:btn-sm btn-ghost"
                              disabled={isDeleting}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditingUserId(u._id);
                                setNewIsAdmin(u.isAdmin);
                              }}
                              className="btn btn-xs sm:btn-sm btn-outline btn-info"
                              disabled={u._id === user?._id || isDeleting}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              className="btn btn-xs sm:btn-sm btn-outline btn-error"
                              disabled={u._id === user?._id || isDeleting}
                            >
                              {isDeleting ? "..." : "Del"}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3 p-2">
              {filteredUsers?.map((u) => (
                <div
                  key={u._id}
                  className="card bg-base-100 shadow-sm border border-gray-100"
                >
                  <div className="card-body p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
                            <span className="text-xs">
                              {u.name?.charAt(0) || "U"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">
                            {u.name || "No name"}
                          </h3>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                      </div>
                      <span
                        className={`badge badge-sm ${
                          u.isAdmin ? "badge-primary" : "badge-accent"
                        }`}
                      >
                        {u.isAdmin ? "Admin" : "User"}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-gray-500">
                      <div>Joined: {formatDate(u.createdAt)}</div>
                      <div>ID: {u._id?.slice(-6)}</div>
                    </div>

                    <div className="mt-3 flex justify-end space-x-2">
                      {editingUserId === u._id ? (
                        <>
                          <button
                            onClick={() => handleRoleUpdate(u._id)}
                            className="btn btn-xs btn-success"
                            disabled={isDeleting}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingUserId(null);
                              setNewIsAdmin(false);
                            }}
                            className="btn btn-xs btn-ghost"
                            disabled={isDeleting}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingUserId(u._id);
                              setNewIsAdmin(u.isAdmin);
                            }}
                            className="btn btn-xs btn-outline btn-info"
                            disabled={u._id === user?._id || isDeleting}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="btn btn-xs btn-outline btn-error"
                            disabled={u._id === user?._id || isDeleting}
                          >
                            {isDeleting ? "..." : "Del"}
                          </button>
                        </>
                      )}
                    </div>

                    {editingUserId === u._id && (
                      <div className="mt-2">
                        <label className="cursor-pointer label p-0 justify-start">
                          <input
                            type="checkbox"
                            className="toggle toggle-primary toggle-xs"
                            checked={newIsAdmin}
                            onChange={(e) => setNewIsAdmin(e.target.checked)}
                          />
                          <span className="ml-2 text-xs">Make Admin</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs sm:text-sm text-gray-500">
        Total Users: {filteredUsers?.length || 0} (out of{" "}
        {allUsers?.length || 0})
      </div>
    </div>
  );
};

export default UserControl;
