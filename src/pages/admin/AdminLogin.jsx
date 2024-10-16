// components/admin/AdminLogin.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../redux/admin/action/adminAction';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLoginState = useSelector((state) => state.admin.adminLogin);
  const { loading, error, adminInfo } = adminLoginState;

  useEffect(() => {
    if (adminInfo) {
      navigate('/admin/dashboard'); // Redirect to admin dashboard
    }
  }, [adminInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(email, password));
  };

  return (
    <div className="flex items-center justify-center h-[500px] bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Admin Login</h2>
        {error && <p className="p-2 text-center text-red-600 bg-red-100 rounded-md">{error}</p>}
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
