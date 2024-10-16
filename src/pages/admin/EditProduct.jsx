import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, resetProductUpdate } from '../../redux/admin/action/productActions'; // Import the update and reset actions
import { useParams, useNavigate } from 'react-router-dom';
import { listCategories } from '../../redux/admin/action/categoryActions'; // Import the category list action
import Loader from '../../components/loaders/Loader';
import Message from '../../components/loaders/Message';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const EditProductPage = () => {
  const { id } = useParams(); // Use useParams to get the product ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state for product update
  const productUpdate = useSelector((state) => state.admin.productUpdate);
  const { loading, error, success } = productUpdate;

  // Redux state for category list
  const categoryList = useSelector((state) => state.admin.categoryList);
  const { loading: loadingCategories, error: errorCategories, categories } = categoryList;

  // Local state for form fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Set image as a file
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');

  // Fetch the product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setName(data.name);
      setPrice(data.price);
      setCategory(data.category);
      setSubcategory(data.subcategory); // Assuming subcategory is part of product data
      setDescription(data.description);
      setBrand(data.brand);
      setStock(data.stock);
      setImage(data.image); // Image will be handled as a file upload
    };

    // Dispatch action to load categories
    dispatch(listCategories());
    fetchProduct();

    // Reset product update state when the component mounts
    dispatch(resetProductUpdate());
  }, [id, dispatch]);

  // Show success and error notifications
  useEffect(() => {
    if (success) {
      toast.success('Product updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Navigate after the toast is displayed
      setTimeout(() => {
        navigate('/admin/products');
      }, 3000);
    }

    if (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 3000,
      });
    }

    // Clean up success and error states when the component is unmounted
    return () => {
      dispatch(resetProductUpdate()); // Reset success and error state
    };
  }, [success, error, navigate, dispatch]);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subcategory', subcategory); // Add subcategory
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('stock', stock);

    console.log(category);
    
    if (image) {
      formData.append('image', image); // Append the image file to formData
    }

    // Dispatch action with FormData
    dispatch(updateProduct(id, formData));
  };

  // Filter subcategories based on selected category
  const subcategories = categories.find((cat) => cat._id === category)?.subcategories || [];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-6">Edit Product</h1>

      {error && <Message variant="danger">{error}</Message>}
      <ToastContainer /> {/* Toast container for showing notifications */}

      <form onSubmit={submitHandler} className="space-y-4" encType="multipart/form-data">
        {/* Name field */}
        <div className="form-group">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="name"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Price field */}
        <div className="form-group">
          <label htmlFor="price" className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="price"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Category dropdown */}
        <div className="form-group">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            id="category"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory(''); // Reset subcategory when category changes
            }}
            required
          >
            <option value="" disabled>
              --SELECT CATEGORY--
            </option>
            {loadingCategories ? (
              <option>Loading categories...</option>
            ) : errorCategories ? (
              <option>{errorCategories}</option>
            ) : categories.length === 0 ? (
              <option>No categories available</option>
            ) : (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Subcategory dropdown */}
        {category && (
          <div className="form-group">
            <label htmlFor="subcategory" className="block text-gray-700 font-medium mb-1">Subcategory</label>
            <select
              id="subcategory"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
            >
              <option value="" disabled>
                --SELECT SUBCATEGORY--
              </option>
              {subcategories.length === 0 ? (
                <option>No subcategories available</option>
              ) : (
                subcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                    
                  </option>
                ))
              )}
            </select>
          </div>
        )}

        {/* Description field */}
        <div className="form-group">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="description"
            rows="3"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Image field */}
        <div className="form-group">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-1">Image</label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="image"
            onChange={(e) => setImage(e.target.files[0])} // Handle file input
          />
        </div>

        {/* Brand field */}
        <div className="form-group">
          <label htmlFor="brand" className="block text-gray-700 font-medium mb-1">Brand</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="brand"
            placeholder="Enter product brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>

        {/* Stock field */}
        <div className="form-group">
          <label htmlFor="stock" className="block text-gray-700 font-medium mb-1">Stock</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="stock"
            placeholder="Enter product stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 transition duration-200"
        >
          {loading ? <Loader /> : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
