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
  };

  // Determine which products to display
  const productsToDisplay = isFilterApplied ? filteredProducts : allProducts;
  const loading = isFilterApplied ? filterLoading : productLoading;
  const error = isFilterApplied ? filterError : productError;

  return (
    <div>
      {/* Filter Options */}
      <FilterOptions 
        subcategoryId={id} 
        onApplyFilter={handleApplyFilter} 
        products={allProducts} // Pass the list of all products here
      />

      {/* Product List */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 gap-4">
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
