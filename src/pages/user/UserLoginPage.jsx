import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/user/action/userActions'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Loader from '../../components/loaders/Loader'; 
import { Link, useNavigate } from 'react-router-dom';

const UserLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userLogin = useSelector((state) => state.user.userLogin);
  const { loading, error, userInfo } = userLogin || {};
console.log(userInfo);

  useEffect(() => {
    if (userInfo) {
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate('/');
    }

    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [userInfo, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password)); 
  };

  return (
    <>
     <div className='text-right bg-red-500 w-fit p-2 rounded-xl text-white  '>
        <Link  to={'/admin/login'}>
       Admin Login
       </Link>
        </div>
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md p-8 bg-white rounded-lg border shadow-md">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <ToastContainer /> 

        <form onSubmit={submitHandler} className="mt-6 space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            {loading ? <Loader /> : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-500">Sign Up</a>
        </p>
       
      
      </div>
    </div>
    </>
  );
};

export default UserLoginPage;
