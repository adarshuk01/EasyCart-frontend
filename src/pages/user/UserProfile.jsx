import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/user/action/userActions';

const UserProfile = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.user.userProfile);
  const { loading, error, user } = userProfile;

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleDeleteAccount = () => {
    // Logic to handle account deletion can be implemented here
    alert('Delete account functionality coming soon.');
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-semibold">My Profile</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit Profile
          </button>
        </div>

        {/* Profile Content */}
        <div className="flex items-center flex-col lg:flex-row mt-6 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              {/* Left Column - Profile Picture and Info */}
              <div className="flex flex-col items-center lg:w-1/3">
                <img
                  src={user.profilePic || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="rounded-full w-32 h-32 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold">
                  {`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'John Doe'}
                </h3>
                <p className="text-gray-600">{user.email || 'johndoe@example.com'}</p>
              </div>

              {/* Right Column - Account Details */}
              <div className="flex-1">
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="text-lg font-medium mb-2">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Full Name</label>
                      <p className="mt-1">
                        {`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'John Doe'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email Address</label>
                      <p className="mt-1">{user.email || 'johndoe@example.com'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Phone Number</label>
                      <p className="mt-1">{user.phone || '+123 456 7890'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Address</label>
                      <p className="mt-1">{user.address || '123 Main Street, Anytown, USA'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-medium mb-2">Account Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Password</label>
                      <p className="mt-1">************</p>
                      <button className="text-blue-500 text-sm mt-2 hover:underline">
                        Change Password
                      </button>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Account Status</label>
                      <p className="mt-1">{user.status || 'Active'}</p>
                    </div>
                    <div>
                      <button
                        onClick={handleDeleteAccount}
                        className="bg-red-500 px-3 py-2 rounded-lg text-white font-semibold"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
