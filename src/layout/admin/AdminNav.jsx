import React, { useState } from 'react';

const AdminNavbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex z-10 justify-between items-center">
        <button 
        className="md:hidden focus:outline-none" 
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      {/* Left side (could be logo or title) */}
      <div className="text-xl font-semibold text-primary">Admin Dashboard</div>

      {/* Right side (profile picture with dropdown) */}
      <div className="relative">
        <div className="relative inline-block">
          {/* Profile Picture */}
          <img
            src="https://via.placeholder.com/40" // Replace with actual profile picture URL
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown} // Toggle dropdown on click
          />
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
              <div className="flex flex-col">
                <button className="py-2 px-4 text-left hover:bg-gray-200">Notifications</button>
                <button className="py-2 px-4 text-left hover:bg-gray-200">Profile</button>
                <button className="py-2 px-4 text-left text-red-500 hover:bg-red-100">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
