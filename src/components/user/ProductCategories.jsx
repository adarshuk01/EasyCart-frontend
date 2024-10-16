import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../../redux/admin/action/categoryActions'; // Import your fetchCategories action
import { Link } from 'react-router-dom';

const ProductCategories = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null); // State to manage the selected category

  // Get categories from Redux state
  const categoryList = useSelector((state) => state.admin.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories()); // Fetch categories when the component mounts
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-50 ">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Product Categories</h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>} {/* Loading indicator */}
      {error && <p className="text-center text-red-500">{error}</p>} {/* Display error message */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className="relative">
              {selectedCategory !== category._id ? (
                // Show category button if it is not selected
                <Link
                  to="#"
                  onClick={() => setSelectedCategory(category._id)} // Set the selected category on click
                  className="flex flex-col items-center justify-center p-6 bg-white shadow-lg hover:shadow-xl rounded-lg transition duration-200 text-gray-800 text-center border border-gray-200"
                >
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="mt-2 text-gray-600">Click to see subcategories</p>
                </Link>
              ) : (
                // Show subcategories if this category is selected
                <div className="bg-white shadow-lg rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                  <div className="mt-4">
                    {category.subcategories.map((subcat) => (
                      <Link
                        key={subcat._id}
                        to={`/products/subcategory/${subcat._id}`} // Link to subcategory
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200 rounded-md"
                      >
                        {subcat.name}
                      </Link>
                    ))}
                  </div>
                 
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCategories;
