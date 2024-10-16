import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNavbar from './UserNav'; // Import your user navbar component
import Footer from './UserFooter'; // Import your Footer component
import BottomNav from './BottomNav';


const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
    {/* Top Navbar for larger screens */}
    <div className=" lg:block sticky top-0 z-50">
      <UserNavbar />
    </div>

    {/* Main content area */}
    <main className="flex-1 p-4 mb-14">
      <Outlet />
    </main>

    {/* Bottom Nav for mobile screens */}
    <div className="block lg:hidden">
      <BottomNav />
    </div>

    <div className='hidden lg:block'>
    <Footer />
    </div>
  </div>
  );
};

export default UserLayout;
