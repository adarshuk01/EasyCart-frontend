import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrders, deleteOrder } from '../../redux/admin/action/orderAction';
import Loader from '../../components/loaders/Loader';
import Message from '../../components/loaders/Message';
import { Check, Ellipsis } from 'lucide-react';

const AdminOrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold the selected order

  const dispatch = useDispatch();

  // Get orders from Redux store
  const orderList = useSelector((state) => state.admin.orderList);
  const { loading, error, orders = [] } = orderList || {}; 
console.log(orders);

  // Get the delete status
  const orderDelete = useSelector((state) => state.orderDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete||'';

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(id));
    }
  };

  // Function to handle showing order details
  const showOrderDetails = (order) => {
    setSelectedOrder(order); // Set the selected order to show its details
  };

  // Function to handle going back to the order list
  const goBackHandler = () => {
    setSelectedOrder(null); // Reset the selected order to go back to the table view
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {selectedOrder ? 'Order Details' : 'Manage Orders'}
      </h2>

      {/* {errorDelete && <Message variant="danger">{errorDelete}</Message>} */}

      {selectedOrder ? (
        <div className="p-4 bg-gray-100 rounded-lg grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Show order details here */}
          <h3 className="text-md font-semibold col-span-full px-2 border-l-4 border-red-600">
            OrderID: <span className="text-red-500">{selectedOrder?._id || 'N/A'}</span>
          </h3>
          <h3 className="text-md font-semibold col-span-full px-2 border-l-4 border-green-600">
            UserID: <span className="text-green-500 ">{selectedOrder?.user?._id || 'N/A'}</span>
          </h3>
          <p>
            <strong>User:</strong> {selectedOrder?.user?.username || 'N/A'}
          </p>
          <p>
            <strong>Email:</strong> {selectedOrder?.user?.email || 'N/A'}
          </p>
          <p>
            <strong>Date:</strong> {selectedOrder?.createdAt?.substring(0, 10) || 'N/A'}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{selectedOrder?.totalPrice || 'N/A'}
          </p>
          <p>
            <strong>Status:</strong> {selectedOrder?.status || 'N/A'}
          </p>
          <p>
            <strong>Paid:</strong> {selectedOrder?.isPaid ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Delivered:</strong> {selectedOrder?.isDelivered ? 'Yes' : 'No'}
          </p>

          <div className="col-span-full">
            <strong>Shipping Address</strong>
            <p>{selectedOrder?.shippingAddress?.address || 'N/A'}</p>
            <p>
              {selectedOrder?.shippingAddress?.city || 'N/A'} -{' '}
              {selectedOrder?.shippingAddress?.postalCode || 'N/A'}
            </p>
            <p>{selectedOrder?.shippingAddress?.country || 'N/A'}</p>
          </div>

          <p className="col-span-full">
            <strong>Ordered Items: </strong>
            {selectedOrder?.orderItems?.map((item) => item.product || 'N/A').join(', ')}
          </p>

          <button
            onClick={goBackHandler}
            className="bg-gray-500 text-white py-1 px-4 rounded-lg mt-4 hover:bg-gray-600 col-span-full"
          >
            Back to Orders
          </button>
        </div>
      ) : (
        <div className="lg:w-full p-2 w-[300px] overflow-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
                <th className="px-4 py-2 text-left text-gray-600">User</th>
                <th className="px-4 py-2 text-left text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-gray-600">Total</th>
                <th className="px-4 py-2 text-left text-gray-600">Paid</th>
                <th className="px-4 py-2 text-left text-gray-600">Delivered</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-gray-600">Actions</th>
              </tr>
            </thead>

            {loading ? (
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    <Loader />
                  </td>
                </tr>
              </tbody>
            ) : error ? (
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    <Message variant="danger">{error}</Message>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order?._id}>
                      <td className="px-4 py-2 border-t border-gray-300">{order?._id || 'N/A'}</td>
                      <td className="px-4 py-2 border-t border-gray-300">
                        {order?.user?.username || 'N/A'}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-300">
                        {order?.createdAt?.substring(0, 10) || 'N/A'}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-300">
                      ₹{order?.totalPrice || 'N/A'}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-300">
                        {order?.isPaid ? <Check color="green" /> : <Ellipsis color="gray" />}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-300">
                        {order?.isDelivered ? <Check color="green" /> : <Ellipsis color="gray" />}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-300">{order?.status || 'N/A'}</td>
                      <td className="px-4 py-2 border-t border-gray-300 flex align-middle items-center">
                        <button
                          onClick={() => showOrderDetails(order)}
                          className="bg-blue-500 text-white py-1 px-2 rounded-lg mr-2 hover:bg-blue-600"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => deleteHandler(order?._id)}
                          className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-2 border-t border-gray-300 text-center">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
