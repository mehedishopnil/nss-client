import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Loading from "../../components/Loading";

const Profile = () => {
    
    const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center py-10"><Loading/></div>;

  if (!user) return <div className="text-center py-10 text-red-600">User not found</div>;

  const { photoURL: image, displayName: name, role, email, address, phone, name: fullName, joinDate } = user;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Cover Photo */}
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-800"></div>
                    
                    {/* Profile Info */}
                    <div className="relative px-6 pb-6">
                        {/* Profile Picture */}
                        <div className="flex justify-center -mt-16 mb-4">
                            <img
                                src={image}
                                alt={name}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                        </div>
                        
                        {/* User Details */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
                            <p className="text-lg text-gray-600 mb-1">{user.role}</p>
                            <p className="text-blue-600 font-medium">{user.email}</p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex justify-center space-x-4 mb-8">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                                Edit Profile
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition duration-200">
                                Settings
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Profile Details Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {/* Personal Information */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Personal Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                                <p className="text-gray-900">{user.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Email Address</label>
                                <p className="text-gray-900">{user.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                                <p className="text-gray-900">{user.phone}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Member Since</label>
                                <p className="text-gray-900">{user.joinDate}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            Contact Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Address</label>
                                <p className="text-gray-900">{user.address}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Role</label>
                                <p className="text-gray-900">{user.role}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Recent Activity
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            <div>
                                <p className="text-gray-900">Profile updated</p>
                                <p className="text-sm text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                            <div>
                                <p className="text-gray-900">Security training completed</p>
                                <p className="text-sm text-gray-500">1 day ago</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></div>
                            <div>
                                <p className="text-gray-900">Schedule updated</p>
                                <p className="text-sm text-gray-500">3 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
