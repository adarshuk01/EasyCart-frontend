import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig'; // Import the configured axios instance
import { Check,Ellipsis } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);


  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Assuming you have an endpoint for getting stats
        const response = await axios.get('/api/admin/stats'); // Change the URL to your actual endpoint
        setStats(response.data); // Assuming the response structure matches your stats object
      
      } catch (err) {
        setError('Error fetching stats');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);


  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get('/api/order/recent');
        setRecentOrders(response.data);
        console.log('My Orders:', response.data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };

    fetchRecentOrders();
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-white  lg:w-full rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-3xl mt-2 font-bold">{stats.totalProducts}</p>
        </div>

        {/* Total Orders */}
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-3xl mt-2 font-bold">{stats.totalOrders}</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-3xl mt-2 font-bold">₹{stats.totalRevenue}</p>
        </div>

        {/* Total Users */}
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl mt-2 font-bold">{stats.totalUsers}</p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="mt-8 ">
        <h3 className="text-xl  font-semibold text-gray-800 mb-4">Recent Orders</h3>
        <div className='lg:w-full p-2 w-[300px] overflow-auto '>
        <table className="w-full overflow-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
              <th className="px-4 py-2 text-left text-gray-600">Date</th>
              <th className="px-4 py-2 text-left text-gray-600">Customer</th>
              <th className="px-4 py-2 text-left text-gray-600">Total</th>
              <th className="px-4 py-2 text-left text-gray-600">Delivery</th>
              <th className="px-4 py-2 text-left text-gray-600">Payment</th>

            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order._id}>
                <td className="px-4 py-2 border-t border-gray-300">{order._id}</td>
                <td className="px-4 py-2 border-t border-gray-300">{order.createdAt}</td>
                <td className="px-4 py-2 border-t border-gray-300">{order.user && order.user.username ? order.user.username : 'N/A'}</td>
                <td className="px-4 py-2 border-t border-gray-300">₹{order.totalPrice}</td>
                <td className="px-4 py-2 border-t border-gray-300">{order.isDelivered?<Check color='green' />:<Ellipsis color='gray' />}</td>
                <td className="px-4 py-2 border-t border-gray-300">{order.isPaid?<Check color='green' />:<Ellipsis color='gray' />}</td>

              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
