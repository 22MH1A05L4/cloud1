import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './ProtectedRoute';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
