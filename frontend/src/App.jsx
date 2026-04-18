import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import VendorSignup from './pages/VendorSignup';
import UserSignup from './pages/UserSignup';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';

// Vendor
import VendorDashboard from './pages/vendor/VendorDashboard';
import ProductStatus from './pages/vendor/ProductStatus';
import RequestItem from './pages/vendor/RequestItem';

// User
import UserPortal from './pages/user/UserPortal';
import VendorPage from './pages/user/VendorPage';
import Products from './pages/user/Products';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import Success from './pages/user/Success';
import OrderStatus from './pages/user/OrderStatus';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup/vendor" element={<VendorSignup />} />
          <Route path="/signup/user" element={<UserSignup />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/vendor/product-status" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <ProductStatus />
            </ProtectedRoute>
          } />
          <Route path="/vendor/request-item" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <RequestItem />
            </ProtectedRoute>
          } />

          {/* User Routes */}
          <Route path="/user/portal" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserPortal />
            </ProtectedRoute>
          } />
          <Route path="/user/vendors/:category" element={
            <ProtectedRoute allowedRoles={['user']}>
              <VendorPage />
            </ProtectedRoute>
          } />
          <Route path="/user/vendors/:vendorId/products" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Products />
            </ProtectedRoute>
          } />
          <Route path="/user/cart" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/user/checkout" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/user/success" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Success />
            </ProtectedRoute>
          } />
          <Route path="/user/order-status" element={
             <ProtectedRoute allowedRoles={['user']}>
              <OrderStatus />
            </ProtectedRoute>           
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
