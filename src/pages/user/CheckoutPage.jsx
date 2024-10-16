import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder, resetOrder } from '../../redux/user/action/checkoutActions';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the loading, error, and success states from Redux
  const checkout = useSelector((state) => state.user.checkout);
  const { loading, error, success } = checkout;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const orderData = {
      address,
      city,
      postalCode,
      country,
      paymentMethod,
    };

    dispatch(placeOrder(orderData));
  };

  // Use useEffect to navigate after a successful order
  useEffect(() => {
    if (success) {
      navigate('/myorders'); // Redirect to home after successful order
      dispatch(resetOrder()); // Reset the checkout state after navigation
    }
  }, [success, navigate, dispatch]);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Checkout</h1>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <form onSubmit={handlePlaceOrder} className="space-y-6">
        {/* Address */}
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Payment Method (Select Dropdown) */}
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Payment Method</option>
            <option value="PayPal">PayPal</option>
            <option value="CreditCard">Credit Card</option>
            <option value="DebitCard">Debit Card</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 font-semibold ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
