import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/user/action/userActions';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  const { loading, error, user } = userProfile;

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <div className="container mx-auto ">
      <div className="bg-white  rounded-lg p-2">
        {/* User Header */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user?.profilePic || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="rounded-full w-16 h-16 object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">
              {user?.firstName || 'User Name'}
            </h3>
            <p className="text-gray-600">{user?.phone || 'Phone Number'}</p>
          </div>
        </div>

        {/* Zepto Pass Banner */}
        <div className="bg-purple-500 text-white rounded-lg p-4 mb-6 relative">
          <div>
            <h4 className="font-semibold text-lg">EasyCart Pass</h4>
            <p className="text-sm">
              You would potentially save <span className="font-bold">₹400</span> per month with EasyCart Pass
            </p>
          </div>
          <button className="bg-yellow-400 text-black font-semibold rounded-md px-3 py-1 mt-4">
            Get EasyCart Pass
          </button>
          <div className="absolute top-0 right-0 p-4">
            {/* Icon for illustration */}
            <img src="https://static.vecteezy.com/system/resources/previews/013/167/047/non_2x/wallet-coin-3d-illustration-free-png.png" alt="Wallet Icon" className="w-16 h-16"/>
          </div>
        </div>

        {/* User Options */}
        <ul className="space-y-2">
        <Link to={'/myorders'}>
          <li className="flex justify-between items-center hover:bg-slate-100 p-2 cursor-pointer border-b-2 border-slate-100">
            <span className="flex  items-center gap-2 ">
              <i className="icon-class-name"></i> {/* Replace with appropriate icon */}
              Orders
            </span>          
            <span>&gt;</span>
          </li>
          </Link>
          <li className="flex justify-between items-center hover:bg-slate-100 p-2 cursor-pointer border-b-2 border-slate-100">
            <span className="flex items-center gap-2">
              <i className="icon-class-name"></i>
              Customer Support
            </span>
            <span>&gt;</span>
          </li>
          <li className="flex justify-between items-center hover:bg-slate-100 p-2 cursor-pointer border-b-2 border-slate-100">
            <span className="flex items-center gap-2">
              <i className="icon-class-name"></i>
              Manage Referrals
            </span>
            <span>&gt;</span>
          </li>
          <li className="flex justify-between items-center hover:bg-slate-100 p-2 cursor-pointer border-b-2 border-slate-100">
            <span className="flex items-center gap-2">
              <i className="icon-class-name"></i>
              Addresses
            </span>
            <span>&gt;</span>
          </li>
          <li className="flex justify-between items-center hover:bg-slate-100 p-2 cursor-pointer border-b-2 border-slate-100">
            <span className="flex items-center gap-2">
              <i className="icon-class-name"></i>
              Profile
            </span>
            <span>&gt;</span>
          </li>
          <li className="flex justify-between items-center hover:bg-slate-100 p-2 cursor-pointer border-b-2 border-slate-100">
            <span className="flex items-center gap-2">
              <i className="icon-class-name"></i>
              Wallet
            </span>
            <span>&gt;</span>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="mt-6 text-center">
          <button className="text-red-500">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
