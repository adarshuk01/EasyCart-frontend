import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct } from '../../redux/admin/action/productActions';
import Loader from '../../components/loaders/Loader';
import Message from '../../components/loaders/Message';

const AdminProductPage = () => {
  const dispatch = useDispatch();

  // Fetch products from Redux store
  const productList = useSelector((state) => state.admin.productList);
  const { loading, error, products } = productList; // Default products to an empty array
  console.log(products);

  const productDelete = useSelector((state) => state.admin.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure? This action cannot be undone.')) {
      dispatch(deleteProduct(id)); // Dispatch the delete action
    }
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]); // successDelete triggers re-fetch of the products

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Products</h2>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">All Products</h3>
        <Link
          to="/admin/product/create"
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600"
        >
          Add Product
        </Link>
      </div>

      <div className='lg:w-full p-2 w-[300px] overflow-auto '>
        {/* Table to display products */}
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Product Image</th>
              <th className="px-4 py-2 text-left text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Price</th>
              <th className="px-4 py-2 text-left text-gray-600">Category</th>
              <th className="px-4 py-2 text-left text-gray-600">Stock</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>

          {/* Display loading or error message right after thead */}
          {loading ? (
            <tbody>
              <tr>
                <td colSpan="6" className="text-center p-4">
                  <Loader />
                </td>
              </tr>
            </tbody>
          ) : error ? (
            <tbody>
              <tr>
                <td colSpan="6" className="text-center p-4">
                  <Message variant="danger">{error}</Message>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-4 py-2 border-t border-gray-300">
                      {product.image?.url ? (
                        <img height={50} width={50} src={product.image.url} alt={product.name || "Product Image"} />
                      ) : (
                        <div style={{ height: 50, width: 50, backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          No Image
                        </div>
                      )}

                    </td>
                    <td className="px-4 py-2 border-t border-gray-300">{product.name}</td>
                    <td className="px-4 py-2 border-t border-gray-300">₹{product.price}</td>
                    <td className="px-4 py-2 border-t border-gray-300">{product.category.name}</td> {/* Update this line */}
                    <td className="px-4 py-2 border-t border-gray-300">{product.stock}</td>
                    <td className="px-4 py-2 border-t border-gray-300 flex">
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="bg-blue-500 text-white py-1 px-2 rounded-lg mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteHandler(product._id)}
                        className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 border-t border-gray-300 text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>

          )}
        </table>
      </div>
    </div>
  );
};

export default AdminProductPage;
