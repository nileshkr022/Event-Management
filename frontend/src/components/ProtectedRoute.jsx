import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If the user doesn't have the right role, bounce them to their respective home
    if(user.role === 'admin') return <Navigate to="/admin" replace />;
    if(user.role === 'vendor') return <Navigate to="/vendor/dashboard" replace />;
    if(user.role === 'user') return <Navigate to="/user/portal" replace />;
  }

  return children;
};

export default ProtectedRoute;
