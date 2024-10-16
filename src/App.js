import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from './layout/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductPage from './pages/admin/AdminProduct';
import AddProductPage from './pages/admin/AddProduct';
import EditProductPage from './pages/admin/EditProduct';
import AdminOrderPage from './pages/admin/AdminOrder';
import AdminCustomerPage from './pages/admin/AdminCustomerPage';
import AddCategoryPage from './pages/admin/AddCategoryPage';
import UserLayout from './layout/user/UserLayout';
import UserLoginPage from './pages/user/UserLoginPage';
import SignUpPage from './pages/user/UserSignUp';
import HomePage from './pages/user/HomePage';
import ProductsPage from './pages/user/ProductsPage';
import ProductList from './pages/user/ProductList';
import CartPage from './pages/user/CartPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import CheckoutPage from './pages/user/CheckoutPage';
import MyOrdersPage from './pages/user/MyordersPage';
import ProductDetailsPage from './pages/user/ProductDetailsPage';
import AdminLogin from './pages/admin/AdminLogin';
import UserProfile from './pages/user/UserProfile';
import AdminSettings from './pages/admin/AdminSettings';


function App() {
  return (
    <div className="App">
      
      <Routes>
        {/* Admin routes */}
        <Route path="admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProductPage />} />
        <Route path="product/create" element={<AddProductPage />} />
        <Route path="product/:id/edit" element={<EditProductPage />} />
        <Route path="orders" element={<AdminOrderPage />} />
        <Route path="customers" element={<AdminCustomerPage />} />
        <Route path="categories" element={<AddCategoryPage />} />
        <Route path="settings" element={<AdminSettings />} />

        </Route>

        <Route path="/" element={<UserLayout />}>
        <Route path="login" element={<UserLoginPage />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="register" element={<SignUpPage />} />
        <Route path="" element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="/products/subcategory/:id" element={<ProductList />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="myorders" element={<MyOrdersPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route path="profile" element={<UserProfile />} />

        </Route>    
      </Routes>
       
    </div>
  );
}

export default App;
