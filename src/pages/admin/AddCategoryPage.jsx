import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories, addCategory } from '../../redux/admin/action/categoryActions';
import Loader from '../../components/loaders/Loader';
import Message from '../../components/loaders/Message';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS

const AddCategoryPage = () => {
  const [name, setName] = useState('');
  const [subcategories, setSubcategories] = useState(['']);

  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.admin.categoryList);
  const { loading, error, categories,success } = categoryList || {};

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    dispatch(addCategory({ name, subcategories: subcategories.filter(sub => sub.trim()) }));
  };

  const handleSubcategoryChange = (index, value) => {
    const newSubcategories = [...subcategories];
    newSubcategories[index] = value;
    setSubcategories(newSubcategories);
  };

  const addSubcategoryField = () => {
    setSubcategories([...subcategories, '']);
  };

  const removeSubcategoryField = (index) => {
    const newSubcategories = subcategories.filter((_, idx) => idx !== index);
    setSubcategories(newSubcategories);
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success('Category added successfully!'); // Success alert
      setName('');
      setSubcategories(['']);
    }

    if (error) {
      toast.error(error); // Error alert
    }
  }, [success, error]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Category</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subcategories</label>
            {subcategories.map((sub, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  value={sub}
                  onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                  placeholder={`Subcategory ${index + 1}`}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => removeSubcategoryField(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSubcategoryField}
              className="mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md shadow-md focus:outline-none"
            >
              Add Subcategory
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !name}
            className={`w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              loading || !name ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddCategoryPage;
