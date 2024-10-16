import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, Store, User } from 'lucide-react';
import { useSelector } from 'react-redux'; // Import useSelector to access cart items

const BottomNav = () => {
  // Get user info from local storage
  const storedUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.user.cart.items);
  console.log(cartItems);
  
  const cartItemCount = cartItems ? cartItems.length : 0; // Calculate the total number of items in the cart

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden">
      <div className="flex justify-around p-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            } transition duration-200`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            } transition duration-200`
          }
        >
          <Store className="w-6 h-6" />
          <span className="text-xs">Products</span>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative flex flex-col items-center ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            } transition duration-200`
          }
        >
          <ShoppingCart className="w-6 h-6" />
          {/* Badge to show the number of cart items */}
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
          <span className="text-xs">Cart</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            } transition duration-200`
          }
        >
          <User className="w-6 h-6" />
          {/* Display username or Profile */}
          <span className="text-xs">
            {storedUserInfo ? storedUserInfo.username : 'Profile'}
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;
