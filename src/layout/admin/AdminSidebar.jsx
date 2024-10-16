import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { LayoutDashboard, Package, ShoppingCart, User, Settings ,Boxes,ShoppingBag} from 'lucide-react'; // Importing the necessary icons

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation(); 

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay for the backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-30  md:hidden" 
          onClick={onClose} // Close sidebar when clicking on the overlay
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed md:static w-64 bg-primary z-50  h-screen text-white shadow-lg transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-20`}>
        <div className="p-4 flex items-center gap-2 text-2xl font-bold">
        <ShoppingBag />EasyCart
        </div>

        <nav className="mt-10">
          <Link 
            to="/admin/dashboard" 
            className={`flex items-center py-2.5 px-4 transition ${isActive('/admin/dashboard') ? 'bg-secondary text-white' : 'text-white hover:bg-secondary'}`}
          >
            <LayoutDashboard className="mr-2" /> {/* Dashboard Icon */}
            Dashboard
          </Link>
          <Link 
            to="/admin/categories" 
            className={`flex items-center py-2.5 px-4 transition ${isActive('/admin/categories') ? 'bg-secondary text-white' : 'text-white hover:bg-secondary'}`}
          >
            <Boxes className="mr-2" /> {/* Products Icon */}
            Category
          </Link>
          <Link 
            to="/admin/products" 
            className={`flex items-center py-2.5 px-4 transition ${isActive('/admin/products') ? 'bg-secondary text-white' : 'text-white hover:bg-secondary'}`}
          >
            <Package className="mr-2" /> {/* Products Icon */}
            Products
          </Link>
          
          <Link 
            to="/admin/orders" 
            className={`flex items-center py-2.5 px-4 transition ${isActive('/admin/orders') ? 'bg-secondary text-white' : 'text-white hover:bg-secondary'}`}
          >
            <ShoppingCart className="mr-2" /> {/* Orders Icon */}
            Orders
          </Link>
          <Link 
            to="/admin/customers" 
            className={`flex items-center py-2.5 px-4 transition ${isActive('/admin/customers') ? 'bg-secondary text-white' : 'text-white hover:bg-secondary'}`}
          >
            <User className="mr-2" /> {/* Customers Icon */}
            Customers
          </Link>
          <Link 
            to="/admin/settings" 
            className={`flex items-center py-2.5 px-4 transition ${isActive('/admin/settings') ? 'bg-secondary text-white' : 'text-white hover:bg-secondary'}`}
          >
            <Settings className="mr-2" /> {/* Settings Icon */}
            Settings
          </Link>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
