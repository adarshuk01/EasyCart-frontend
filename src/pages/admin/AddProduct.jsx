import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../redux/admin/action/productActions'; // Import the action creator
import Loader from '../../components/loaders/Loader'; // Loader component
import Message from '../../components/loaders/Message'; // Message component
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useNavigate } from 'react-router-dom';
import { listCategories } from '../../redux/admin/action/categoryActions';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]); // State for subcategory
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productCreate = useSelector((state) => state.admin.productCreate);
  const { loading, error, success } = productCreate || '';

  // Fetch the categories from Redux state
  const categoryList = useSelector((state) => state.admin.categoryList);
  const { loading: loadingCategories, error: errorCategories, categories } = categoryList || '';

  console.log(categoryList);


  useEffect(() => {
    dispatch(listCategories());  // Fetch categories on mount
  }, [dispatch]);

  // Assuming categories is coming from props or state
  const subcategories = Array.isArray(categories)
    ? categories.find(cat => cat._id === category)?.subcategories || []
    : []; // Default to an empty array if categories is not defined or not an array


  const submitHandler = (e) => {
    e.preventDefault();

    // Create FormData instance
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subcategory', subcategory); // Add subcategory to form data
    formData.append('description', description);
    formData.append('image', image);
    formData.append('brand', brand);
    formData.append('stock', stock);

    dispatch(createProduct(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success('Product created successfully!', {
        position: "top-right",
        autoClose: 3000,
      });
  
      // Reset the form fields after successful product creation
      setName('');
      setPrice(0);
      setCategory('');
      setSubcategory('');
      setDescription('');
      setImage(null);
      setBrand('');
      setStock(0);
  
      // Optionally, navigate to another page after a successful product addition
      // navigate('/admin/products'); // Uncomment if needed
    }
  
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [success, error]);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-6">Add Product</h1>
      {error && <Message variant="danger">{error}</Message>}
      <ToastContainer />
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div className="form-group">
          <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            className="form-control w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="name"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="block text-gray-700 font-medium">Price</label>
          <input
            type="number"
            className="form-control w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="price"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category </label>
          <select
            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory(''); // Reset subcategory when category changes
            }}
            required
          >
            <option value="" disabled>
              --SELECT--
            </option>
            {loadingCategories ? (
              <option value="">Loading categories...</option>
            ) : errorCategories ? (
              <option value="">{errorCategories}</option>
            ) : categories.length === 0 ? (
              <option value="">No categories available</option>
            ) : (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Subcategory Section */}
        {category && (
          <div className="form-group">
            <label htmlFor="subcategory">Subcategory </label>
            <select
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
            >
              <option value="" disabled>
                --SELECT--
              </option>
              {subcategories.length === 0 ? (
                <option value="">No subcategories available</option>
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

        <div className="form-group">
          <label htmlFor="description" className="block text-gray-700 font-medium">Description</label>
          <textarea
            className="form-control w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="description"
            rows="3"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image" className="block text-gray-700 font-medium">Image File</label>
          <input
            type="file"
            className="form-control w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand" className="block text-gray-700 font-medium">Brand</label>
          <input
            type="text"
            className="form-control w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="brand"
            placeholder="Enter product brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock" className="block text-gray-700 font-medium">Stock</label>
          <input
            type="number"
            className="form-control w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="stock"
            placeholder="Enter product stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 transition duration-200"
        >
          {loading ? <Loader /> : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
