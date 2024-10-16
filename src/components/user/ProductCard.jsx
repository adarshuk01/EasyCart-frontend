import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/user/action/cartAction'; // Import the addToCart action
import { toast } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // State for handling the quantity selected by the user
  const [quantity, setQuantity] = useState(1);

  // Get the cart items from Redux store
  const cartItems = useSelector((state) => state.user.cart);

  // Safely check if the cart contains items
  const cartItem = cartItems?.items?.cartItems?.find(
    (item) => item.product._id === product._id
  );

  // Update quantity if the product is already in the cart
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity); // Set the existing quantity in the cart
    }
  }, [cartItem]);

  // Handle adding product to the cart with the selected quantity
  const handleAddToCart = () => {
    dispatch(addToCart(product._id, quantity)); // Add product to cart with the selected quantity

    // Show a success toast notification
    toast.success(`${product.name} added to cart with quantity ${quantity}`, {
      position: 'top-right', // Correct usage of position
      autoClose: 2000,
    });
  };

  // Handle incrementing quantity
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Handle decrementing quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const rating = Math.round(product.ratings); // Calculate product rating

  return (
    <div className="border border-gray-200 rounded-md shadow-lg p-4 transition duration-300 hover:shadow-xl relative">
      <img
        src={product.image.url}
        alt={product.name}
        className="w-full h-44 object-cover mb-4 rounded"
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = '/path/to/default/image.jpg'; // Fallback image path
        }}
      />

      <h3 className="text-lg font-semibold m-0">
        <Link to={`/products/${product._id}`}>
          {product.name.length > 20 ? `${product.name.slice(0, 24)}...` : product.name}
        </Link>
      </h3>
      <span className="text-gray-600 block mt-[-5px] mb-1">{product.brand}</span>

      <div className="flex items-center mb-2">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            stroke=""
            fill={`${index < rating ? 'blue' : 'gray'}`}
            key={index}
            className="h-5 w-5"
          />
        ))}
        <span className="ml-2 text-gray-600">({product.numReviews})</span> {/* Display number of reviews */}
      </div>

      <h3 className="text-gray-600 text-xl">₹{product.price}</h3>

      {/* Stock indicator */}
      <div className="mb-2">
        {product.stock > 0 ? (
          <span className="text-green-600 font-medium">
            In Stock: {product.stock}
          </span>
        ) : (
          <span className="text-red-600 font-medium">Out of Stock</span>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center mb-2">
        <button
          onClick={decrementQuantity}
          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l-md hover:bg-gray-300"
          disabled={product.stock === 0}
        >
          -
        </button>
        <span className="px-4 py-1 text-lg font-semibold">{quantity}</span>
        <button
          onClick={incrementQuantity}
          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r-md hover:bg-gray-300"
          disabled={product.stock === 0 || quantity >= product.stock}
        >
          +
        </button>
      </div>



      <button
        onClick={handleAddToCart}
        className={`mt-2 block w-full ${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white text-center py-1 rounded-md transition duration-300`}
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
      {/* If the product is in the cart, display its current quantity in the cart */}
      {cartItem && (
        <div className="mt-2 text-green-600">
          In cart: {cartItem.quantity} item(s)
        </div>
      )}
    </div>
  );
};

export default ProductCard;
