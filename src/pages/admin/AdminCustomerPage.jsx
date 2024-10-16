// src/pages/AdminCustomerPage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCustomers, deleteCustomer } from '../../redux/admin/action/customerActions';
import Loader from '../../components/loaders/Loader';
import Message from '../../components/loaders/Message';
import { Link } from 'react-router-dom';

const AdminCustomerPage = () => {
  const dispatch = useDispatch();

  // Fetch customers from the Redux store
  const customerList = useSelector((state) => state.admin.customerList);
  const { loading, error, customers = [] } = customerList;

  const customerDelete = useSelector((state) => state.admin.customerDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = customerDelete;

  useEffect(() => {
    dispatch(listCustomers());
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      dispatch(deleteCustomer(id));
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Customers</h2>
  
    <div className="lg:w-full p-2 w-[300px] overflow-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Username</th>
            <th className="px-4 py-2 text-left text-gray-600">Email</th>
            <th className="px-4 py-2 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
  
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center p-4">
                <Loader />
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="3" className="text-center p-4">
                <Message variant="danger">{error}</Message>
              </td>
            </tr>
          ) : (
            <>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer._id}>
                    <td className="px-4 py-2 border-t border-gray-300">{customer.username}</td>
                    <td className="px-4 py-2 border-t border-gray-300">{customer.email}</td>
                    <td className="px-4 py-2 border-t border-gray-300 flex">
                      <Link
                        to={`/admin/customer/${customer._id}`}
                        className="bg-blue-500 text-white py-1 px-2 rounded-lg mr-2 hover:bg-blue-600"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => deleteHandler(customer._id)}
                        className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-2 border-t border-gray-300 text-center">
                    No customers found.
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  </div>  
  );
};

export default AdminCustomerPage;
