// components/OfferCards.js
import React from 'react';

function OfferCards() {
  const offers = [
    {
      id: 1,
      imageUrl: 'https://discountwala.co.in/wp-content/uploads/2022/07/home-applince.jpg', // Replace with actual image URLs
      title: '50% Off on All Electronics',
      description: 'Get amazing discounts on the latest gadgets and electronics.',
    },
    {
      id: 2,
      imageUrl: 'https://marketplace.canva.com/EAF7MJ5dAyw/1/0/1600w/canva-brown-and-white-minimalist-fashion-sale-poster-landscape-HWiiXPFH5bA.jpg',
      title: 'Buy One Get One Free',
      description: 'Limited time offer on all fashion items. Hurry up!',
    },
    {
      id: 3,
      imageUrl: 'https://couchpotatoes.com/cdn/shop/files/Header.jpg?v=1728077612&width=1500',
      title: '20% Cashback on Furniture',
      description: 'Upgrade your home with our stylish furniture collection.',
    },
  ];

  return (
    <div className="container mx-auto p-4">
     
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={offer.imageUrl}
              alt={offer.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{offer.title}</h3>
              <p className="text-gray-600 mt-2">{offer.description}</p>
              <button className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferCards;
