import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';
import { Star, Star as StarOutline } from 'lucide-react';

const FilterOptions = ({ onApplyFilter, products }) => {
  const getInitialPriceRange = () => {
    if (products && products.length > 0) {
      const prices = products.map(product => product.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      if (minPrice === maxPrice) {
        return { range: [minPrice, minPrice + 1000], min: minPrice, max: minPrice + 1000 };
      }
      return { range: [minPrice, maxPrice], min: minPrice, max: maxPrice };
    }
    return { range: [0, 10000], min: 0, max: 10000 };
  };

  const [priceRange, setPriceRange] = useState(getInitialPriceRange().range);
  const [priceLimits, setPriceLimits] = useState(getInitialPriceRange());
  const [brand, setBrand] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const { range, min, max } = getInitialPriceRange();
    setPriceRange(range);
    setPriceLimits({ min, max });

    // Ensure products is defined and has elements before mapping
    if (products && products.length > 0) {
      const uniqueBrands = [...new Set(products.map(product => product.brand))];
      setBrands(uniqueBrands);
    } else {
      setBrands([]); // Clear brands if products array is empty or undefined
    }
  }, [products]);

  const handleFilter = () => {
    const filters = {
      minPrice: priceRange[0] || undefined,
      maxPrice: priceRange[1] === priceLimits.max ? undefined : priceRange[1],
      brand: brand || undefined,
      minRating: minRating || undefined,
    };
    onApplyFilter(filters);
  };

  const handleRatingClick = (rating) => {
    setMinRating(rating);
  };

  const handleReset = () => {
    setPriceRange(getInitialPriceRange().range);
    setBrand('');
    setMinRating(0);
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4 col-span-1">Filter Options</h2>
      <div className="filter-options mb-4 p-6 border rounded shadow-sm bg-white grid items-center lg:grid-cols-4 gap-4">
        <div className="mb-4 col-span-1">
          <label className="block mb-1">Price Range:</label>
          <div className="flex items-center justify-between mb-2">
            <span>Min: Rs {priceRange[0]}</span>
            <span>Max: Rs {priceRange[1] === priceLimits.max ? `${priceLimits.max}+` : `Rs ${priceRange[1]}`}</span>
          </div>
          <Range
            values={priceRange}
            step={100}
            min={priceLimits.min}
            max={priceLimits.max}
            onChange={(values) => setPriceRange(values)}
            renderTrack={({ props, children }) => (
              <div {...props} className="w-full h-2 bg-blue-200 rounded-lg">
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div {...props} className="w-5 h-5 bg-blue-600 rounded-full shadow-md" />
            )}
          />
        </div>

        <div className="mb-4 col-span-1">
          <label className="block mb-1">Brand:</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select a brand</option>
            {brands.map((brandOption, index) => (
              <option key={index} value={brandOption}>
                {brandOption}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 col-span-1">
          <label className="block mb-1">Min Rating:</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingClick(star)}
                className="cursor-pointer"
              >
                {star <= minRating ? <Star fill='blue' stroke='' className="" /> : <StarOutline stroke='' fill='gray' />}
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-1 flex gap-2">
          <button
            onClick={handleFilter}
            className="w-full mt-2 p-2 bg-blue-600 text-white rounded-lg transition hover:bg-blue-700"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="w-full mt-2 p-2 bg-gray-400 text-white rounded-lg transition hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
