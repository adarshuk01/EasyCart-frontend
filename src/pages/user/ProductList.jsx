import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProductsByFilter } from '../../redux/user/action/productActions';
import { listProductsBySubcategory } from '../../redux/admin/action/productActions';
import ProductCard from '../../components/user/ProductCard';
import FilterOptions from '../../components/user/ProductFilter';

const ProductList = () => {
  const { id } = useParams(); // Get subcategory ID
  const dispatch = useDispatch();
  const filterProduct = useSelector((state) => state.user.filterProducts);
  const productList = useSelector((state) => state.admin.productList);
  const [isFilterApplied, setIsFilterApplied] = useState(false); // Track filter state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // Track modal state

  const { loading: filterLoading, error: filterError, products: filteredProducts } = filterProduct;
  const { loading: productLoading, error: productError, products: allProducts } = productList;

  useEffect(() => {
    if (id) {
      dispatch(listProductsBySubcategory(id)); // Fetch all products by subcategory on mount
    }
  }, [dispatch, id]);

  // Handle filter application
  const handleApplyFilter = (filters) => {
    dispatch(listProductsByFilter({ ...filters, subcategoryId: id })); // Pass subcategoryId and filter options
    setIsFilterApplied(true); // Set filter applied state
    setIsFilterModalOpen(false); // Close modal after applying filter
  };

  // Determine which products to display
  const productsToDisplay = isFilterApplied ? filteredProducts : allProducts;
  const loading = isFilterApplied ? filterLoading : productLoading;
  const error = isFilterApplied ? filterError : productError;

  return (
    <div>
      {/* Filter Options for Large Screens */}
      <div className="hidden lg:block mb-4">
        <FilterOptions
          subcategoryId={id}
          onApplyFilter={handleApplyFilter}
          products={allProducts} // Pass the list of all products here
        />
      </div>

      {/* Filter Button for Mobile View */}
      <div className="lg:hidden mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsFilterModalOpen(true)}
        >
          Open Filters
        </button>
      </div>

      {/* Filter Modal for Mobile View */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-md p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
            <FilterOptions
              subcategoryId={id}
              onApplyFilter={handleApplyFilter}
              products={allProducts} // Pass the list of all products here
            />
            <button
              className="mt-4 text-red-500"
              onClick={() => setIsFilterModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
          {productsToDisplay && productsToDisplay.length > 0 ? (
            productsToDisplay.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
