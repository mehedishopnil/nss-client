import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProviders';

const UserControl = () => {
    const { user, allUsers, updateUserRole, deleteUser } = useContext(AuthContext);
    const [editingUserId, setEditingUserId] = useState(null);
    const [newIsAdmin, setNewIsAdmin] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRoleUpdate = async (userId) => {
        try {
            await updateUserRole(userId, newIsAdmin);
            toast.success('User role updated successfully');
            setEditingUserId(null);
            setNewIsAdmin(false);
        } catch (error) {
            toast.error('Failed to update user role');
            console.error(error);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setIsDeleting(true);
            try {
                await deleteUser(userId);
                toast.success('User deleted successfully');
            } catch (error) {
                toast.error('Failed to delete user');
                console.error(error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const filteredUsers = allUsers?.filter((u) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            (u.name?.toLowerCase().includes(searchLower)) ||
            (u.email?.toLowerCase().includes(searchLower)) ||
            (u.isAdmin?.toString().toLowerCase().includes(searchLower))
        );
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                <div className="w-full md:w-1/3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="input input-bordered w-full pr-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {filteredUsers?.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg">No users found</div>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-4 btn btn-ghost text-primary"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Joined</th>
                                    <th>Last Updated</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers?.map((u) => (
                                    <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
                                                        <span>{u.name?.charAt(0) || 'U'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-medium">{u.name || 'No name'}</div>
                                                    <div className="text-sm text-gray-500">ID: {u._id?.slice(-6)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-gray-700">{u.email}</div>
                                        </td>
                                        <td className="text-sm text-gray-500">
                                            {formatDate(u.createdAt)}
                                        </td>
                                        <td className="text-sm text-gray-500">
                                            {formatDate(u.updatedAt)}
                                        </td>
                                        <td>
                                            {editingUserId === u._id ? (
                                                <label className="cursor-pointer label">
                                                    <input 
                                                        type="checkbox" 
                                                        className="toggle toggle-primary"
                                                        checked={newIsAdmin}
                                                        onChange={(e) => setNewIsAdmin(e.target.checked)}
                                                    />
                                                    <span className="ml-2">{newIsAdmin ? 'Admin' : 'User'}</span>
                                                </label>
                                            ) : (
                                                <span className={`badge ${u.isAdmin ? 'badge-primary' : 'badge-accent'}`}>
                                                    {u.isAdmin ? 'Admin' : 'User'}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="flex space-x-2">
                                                {editingUserId === u._id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleRoleUpdate(u._id)}
                                                            className="btn btn-sm btn-success"
                                                            disabled={isDeleting}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditingUserId(null);
                                                                setNewIsAdmin(false);
                                                            }}
                                                            className="btn btn-sm btn-ghost"
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
                                                            className="btn btn-sm btn-outline btn-info"
                                                            disabled={u._id === user?._id || isDeleting}
                                                        >
                                                            Edit Role
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(u._id)}
                                                            className="btn btn-sm btn-outline btn-error"
                                                            disabled={u._id === user?._id || isDeleting}
                                                        >
                                                            {isDeleting ? 'Deleting...' : 'Delete'}
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="mt-4 text-sm text-gray-500">
                Total Users: {filteredUsers?.length || 0} (out of {allUsers?.length || 0})
            </div>
        </div>
    );
};

export default UserControl;