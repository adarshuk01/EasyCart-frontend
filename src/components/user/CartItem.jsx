import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/user/action/cartAction'; // Ensure to import your remove action
import { Link } from 'react-router-dom';

const CartItem = ({ item, onRemove }) => {
  const dispatch = useDispatch();

  // Check if the item or product is null/undefined
  if (!item || !item.product) {
    return null; // or return a placeholder if you want
  }

  const { name, price, image ,_id } = item.product; // Destructure product properties, including image
  const { quantity ,totalPrice,grantTotal} = item;
   // Destructure quantity

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b">
      {/* Product Image */}
      <img
        src={image.url || ''} // Assuming `image` contains the product image URL
        alt={name || 'Product Image'} // Fallback if name is unavailable
        className="w-20 h-20 object-cover mr-4" // Styling the image
      />

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold"><Link to={`/products/${_id}`}> {name || 'Product Name Unavailable'}</Link></h3>
        <p className="text-gray-600">Quantity: {quantity || 0}</p>
        <p className="text-gray-600">Price: ₹{totalPrice ? totalPrice.toFixed(2) : 'N/A'}</p>
      </div>
      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.product._id)} // Call onRemove passed from CartPage
        aria-label={`Remove ${name || 'product'}`} // Accessible label for the button
        className="mt-2 md:mt-0 text-red-600 hover:text-red-800 transition duration-200"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
