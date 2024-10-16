import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative w-full h-64 md:h-96 bg-gray-200 overflow-hidden">
      <img
        src="https://png.pngtree.com/thumb_back/fh260/background/20240409/pngtree-empty-shopping-basket-on-wood-table-over-grocery-store-supermarket-blur-image_15653639.jpg" // Replace with your hero image URL
        alt="Hero Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to EasyCart!</h1>
        <p className="text-lg md:text-xl mb-6">
          Discover the best products at unbeatable prices.
        </p>
        <Link to="/products">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
