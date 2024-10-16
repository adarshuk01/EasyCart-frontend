import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/user/action/userActions'; // Import the logout action
import { ShoppingCart,Home,  User, LogOut, ClipboardList, ShoppingBag } from 'lucide-react'; // Importing Lucide icons

const UserNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user details from Redux state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin || '';

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.user.cart.items);
  const cartItemCount = cartItems ? cartItems.length : 0; // Calculate total number of items in the cart

  // Logout handler
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
    setDropdownOpen(false); // Close the dropdown after logout
  };

  // Get user info from local storage
  const storedUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  // Fallback values if profile pic or username is missing
  const profilePic = userInfo?.profilePic || storedUserInfo?.profilePic || <User />; // Default profile pic
  const username = storedUserInfo?.firstName || 'Guest'; // Default username

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition duration-300">
          EasyCart
        </Link>

        {/* Navigation Links for desktop view */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-gray-200 transition duration-300 flex"> <Home className="w-5 h-5 mr-2" /> Home</Link>
          <Link to="/products" className="hover:text-gray-200 transition duration-300 flex"><ShoppingBag className="w-5 h-5 mr-2" /> Shop</Link>
          <Link to="/cart" className="relative flex items-center hover:text-gray-200 transition duration-300">
            <ShoppingCart className="w-5 h-5 mr-2" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
            Cart
          </Link>
        </div>

        {/* User options (Username, Profile Pic, and Dropdown) */}
        <div className="relative flex items-center space-x-4">
          {userInfo || storedUserInfo ? (
            <>
              {/* User Profile Picture and Name */}
              <div className="flex items-center space-x-3 cursor-pointer" onClick={toggleDropdown}>
                {profilePic}
                <span className="font-medium">{username}</span>
                <svg className={`w-4 h-4 transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'} transition duration-300`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Dropdown Menu  */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-48 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                  >
                    <User className="w-5 h-5 mr-2" />
                    My Profile
                  </Link>
                  <Link
                    to="/myorders"
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                  >
                    <ClipboardList className="w-5 h-5 mr-2" />
                    My Orders
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition duration-300"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-200 transition duration-300">
              Login/Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
