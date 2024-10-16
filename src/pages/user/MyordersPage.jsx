import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../redux/user/action/checkoutActions';

const MyOrdersPage = () => {
  const dispatch = useDispatch();

  // Get the myOrders state from Redux
  const myOrdersState = useSelector((state) => state.user.myOrders);
  const { loading, error, orders } = myOrdersState;

  useEffect(() => {
    dispatch(getMyOrders()); // Fetch the user's orders on component mount
  }, [dispatch]);

  return (
    <div className=" mx-auto  lg:px-10 bg-white  rounded-lg ">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center">You have no orders.</p>
      ) : (
        <div className="space-y-8  ">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg p-6 shadow-sm bg-gray-50"
            >
              <div className="flex  flex-col sm:flex-row justify-between items-left mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Order ID: <span className='text-gray-600 font-normal'>{order._id} </span> </h2>
                  <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium">Total: <span className='text-green-600'> ₹{order.totalPrice.toFixed(2)}</span></p>
                  <p className={`text-sm ${order.isDelivered ? 'text-green-600' : 'text-yellow-600'}`}>
                    Status: {order.isDelivered ? 'Delivered' : 'Processing'}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Items:</h3>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.product ? item.product._id : item._id}
                      className="flex items-center space-x-4 bg-white p-4 border rounded-lg shadow-sm"
                    >
                      {/* Check if product exists and display image */}
                      {item.product ? (
                        <>
                          <img
                            src={item.product.image.url} // Assuming image URL is available in product data
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.quantity} x ₹{item.product.price.toFixed(2)} = ₹
                              {(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-500">Product not available</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
