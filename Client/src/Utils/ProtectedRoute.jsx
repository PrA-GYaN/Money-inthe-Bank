import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute= ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/app" />;
};

export default ProtectedRoute;
