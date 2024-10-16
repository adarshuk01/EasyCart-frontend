import React from 'react';

const AdminSettings = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Settings</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* General Settings Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">General Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Site Name</label>
              <input
                type="text"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter site name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Admin Email</label>
              <input
                type="email"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter admin email"
              />
            </div>
          </div>
        </div>

        {/* Security Settings Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Change Password</label>
              <input
                type="password"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="New password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Confirm password"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              id="emailNotifications"
            />
            <label htmlFor="emailNotifications" className="ml-2 text-sm">
              Enable email notifications
            </label>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="mt-6">
          <button className="w-full md:w-auto bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
