import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart } from '../../redux/user/action/cartAction';
import CartItem from '../../components/user/CartItem';
import { useNavigate } from 'react-router-dom'; // To navigate to the checkout page

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.user.cart.items); // Access the cart items from Redux state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Hook for navigation
  const token = sessionStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    if (!token) {
      navigate('/login'); // If no token, navigate to login page
    }

    const fetchCart = async () => {
      try {
        await dispatch(getCart()); // Fetch the user's cart on component mount
      } catch (err) {
        setError('Failed to fetch cart items.'); // Handle error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCart();
  }, [dispatch, navigate, token]);

  const handleRemove = async (productId) => {
    await dispatch(removeFromCart(productId)); // Remove item from cart
    await dispatch(getCart()); // Optionally fetch the updated cart
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page when clicked
  };

  const handleContinueShopping = () => {
    navigate('/'); // Navigate to the home page when clicking continue shopping
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

      {loading ? (
        <p>Loading...</p> // Show loading state
      ) : error ? (
        <p className="text-red-600">{error}</p> // Show error message
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.cartItems.map((item) => (
            <CartItem key={item.product._id} item={item} onRemove={handleRemove} /> // Use item.product._id for a unique key
          ))}

          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold text-center">Order Summary</h2>
            <div className="flex justify-between mt-4 text-lg sm:text-xl font-medium">
              <p>Grand Total:</p>
              <p className="font-bold">₹{cart.grandTotal.toFixed(2)}</p> {/* Formatting the grandTotal */}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={handleCheckout}
                className="w-full sm:w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-all text-center"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={handleContinueShopping}
                className="w-full sm:w-1/2 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition-all text-center"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
