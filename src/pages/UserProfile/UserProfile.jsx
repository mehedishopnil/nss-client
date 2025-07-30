import React, { useState, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import { useNavigate } from 'react-router-dom';
import { 
  FiEdit, 
  FiLogOut, 
  FiUser, 
  FiMail, 
  FiClock, 
  FiShield,
  FiLock,
  
  FiBell,
  FiMessageSquare
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import UserMessage from '../../components/UserMessage/UserMessage';

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || ''
  });

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success('Logged out successfully');
        navigate('/login');
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Add your profile update logic here
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':

      
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={user?.photoURL || 'https://via.placeholder.com/150'} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <h2 className="text-2xl font-bold">{user?.displayName || 'User'}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {new Date(user?.metadata?.creationTime).toLocaleDateString()}
                </p>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex space-x-3 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FiUser className="text-gray-500" />
                  <span>{user?.displayName || 'Not provided'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMail className="text-gray-500" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiClock className="text-gray-500" />
                  <span>
                    Joined {new Date(user?.metadata?.creationTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiShield className="text-gray-500" />
                  <span>
                    {user?.emailVerified ? 'Email Verified' : 'Email Not Verified'}
                  </span>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                >
                  <FiEdit />
                  <span>Edit Profile</span>
                </button>
              </div>
            )}
          </div>
        );
      
      case 'messages':
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <UserMessage />
        </div>
      );
        case 'security':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <FiLock />
                  <span>Change Password</span>
                </h4>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Send Password Reset Email
                </button>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <FiShield />
                  <span>Two-Factor Authentication</span>
                </h4>
                <p className="text-gray-600 mb-3">
                  Add an extra layer of security to your account
                </p>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                  Enable 2FA
                </button>
              </div>
              <div>
                <h4 className="font-medium mb-2">Active Sessions</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Current Session:</span> Chrome on Windows
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Last active: {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-600">Receive browser notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <img 
                  src={user?.photoURL || 'https://via.placeholder.com/150'} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{user?.displayName || 'User'}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
            <nav className="p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FiUser />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 ${activeTab === 'messages' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FiMessageSquare />
                <span>Messages</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 ${activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FiLock />
                <span>Security</span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FiBell />
                <span>Notifications</span>
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;