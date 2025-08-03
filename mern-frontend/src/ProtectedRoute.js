import { Navigate } from 'react-router-dom';
import { getToken } from './auth';

const ProtectedRoute = ({ children }) => {
  return getToken() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
